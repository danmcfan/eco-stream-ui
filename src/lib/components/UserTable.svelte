<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { onMount } from "svelte";

    const apiUrl = env.PUBLIC_API_URL;

    type Item = {
        id: string;
        name: string;
        count: number;
    };

    export let token = "";

    let items: Item[] = [];
    let isLoading = true;

    let name = "";

    let editID: string | null = null;
    let editName = "";
    let editCount = 0;

    async function fetchItems() {
        const res = await fetch(`${apiUrl}/items/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        items = await res.json();
        isLoading = false;
    }

    async function editItem(item: Item) {
        editID = item.id;
        editName = item.name;
        editCount = item.count;
    }

    async function updateItem() {
        if (editID) {
            const res = await fetch(`${apiUrl}/items/${editID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: editName,
                    count: editCount,
                }),
            });

            if (res.ok) {
                await fetchItems();
            } else {
                alert("Failed to update item");
            }
        }

        editID = null;
        editName = "";
        editCount = 0;
    }

    async function deleteItem(id: string) {
        const res = await fetch(`${apiUrl}/items/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            await fetchItems();
        } else {
            alert("Failed to delete item");
        }
    }

    async function addItem(event: SubmitEvent) {
        event.preventDefault();

        const res = await fetch(`${apiUrl}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            name = "";
            await fetchItems();
        } else {
            alert("Failed to add item");
        }
    }

    onMount(async () => {
        await fetchItems();
    });
</script>

<div class="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
    {#if isLoading}
        <p class="text-3xl font-bold text-blue-300 mb-4 text-center">
            Loading...
        </p>
    {:else}
        <h1 class="text-3xl font-bold text-blue-300 mb-4 text-center">Items</h1>
        {#if items.length === 0}
            <p class="text-gray-400 text-center">No items found</p>
        {:else}
            <div class="overflow-x-auto">
                <table class="w-full text-left text-gray-200">
                    <thead class="text-gray-400 bg-gray-700">
                        <tr>
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Count</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each items as item (item.id)}
                            {#if editID === item.id}
                                <tr class="border-b border-gray-700">
                                    <td class="px-4 py-2 font-bold"
                                        >{item.id}</td
                                    >
                                    <td class="px-4 py-2">
                                        <input
                                            class="px-4 py-2 rounded text-black"
                                            bind:value={editName}
                                        />
                                    </td>
                                    <td class="px-4 py-2">
                                        <input
                                            type="number"
                                            class="px-4 py-2 rounded text-black"
                                            bind:value={editCount}
                                        />
                                    </td>
                                    <td class="px-4 py-2">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => updateItem()}
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            {:else}
                                <tr class="border-b border-gray-700">
                                    <td class="px-4 py-2 font-bold"
                                        >{item.id}</td
                                    >
                                    <td class="px-4 py-2">{item.name}</td>
                                    <td class="px-4 py-2">{item.count}</td>
                                    <td class="px-4 py-2">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => editItem(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    {/if}
    <form class="mt-4 text-center" on:submit={addItem}>
        <input
            class="px-4 py-2 rounded"
            placeholder="Enter name"
            bind:value={name}
        />
        <button
            class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">Add Item</button
        >
    </form>
</div>
