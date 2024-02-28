<script lang="ts">
    import { onMount } from "svelte";
    import { pb, loggedIn } from "$lib";

    type Item = {
        id: string;
        name: string;
        count: number;
    };

    let items: Item[] = [];
    let isLoading = true;

    let name = "";

    let editID: string | null = null;
    let editName = "";
    let editCount = 0;

    async function fetchItems() {
        items = await pb.collection("items").getFullList({
            sort: "-created",
        });
        isLoading = false;
    }

    async function editItem(item: Item) {
        editID = item.id;
        editName = item.name;
        editCount = item.count;
    }

    async function updateItem() {
        if (editID) {
            await pb.collection("items").update(editID, {
                name: editName,
                count: editCount,
            });
            await fetchItems();
        }

        editID = null;
        editName = "";
        editCount = 0;
    }

    async function deleteItem(id: string) {
        await pb.collection("items").delete(id);
        await fetchItems();
    }

    async function addItem() {
        if (name) {
            await pb.collection("items").create({
                name,
                user: pb.authStore.model?.id,
            });
            name = "";
            await fetchItems();
        }
    }

    onMount(async () => {
        await fetchItems();
    });
</script>

{#if $loggedIn}
    <div class="bg-black text-green-500 min-h-screen p-4">
        {#if isLoading}
            <p>Loading...</p>
        {:else}
            <h1 class="text-xl font-bold mb-4">Items</h1>
            {#if items.length === 0}
                <p>No items found</p>
            {:else}
                <table class="table-auto w-full">
                    <thead>
                        <tr class="border-b border-green-700">
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Count</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each items as item (item.id)}
                            {#if editID === item.id}
                                <tr class="border-b border-green-700">
                                    <td class="px-4 py-2">{item.id}</td>
                                    <td class="px-4 py-2">
                                        <input
                                            class="bg-black text-white"
                                            bind:value={editName}
                                        />
                                    </td>
                                    <td class="px-4 py-2">
                                        <input
                                            type="number"
                                            class="bg-black text-white"
                                            bind:value={editCount}
                                        />
                                    </td>
                                    <td class="px-4 py-2">
                                        <button
                                            class="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => updateItem()}
                                            >Save</button
                                        >
                                    </td>
                                </tr>
                            {:else}
                                <tr class="border-b border-green-700">
                                    <td class="px-4 py-2">{item.id}</td>
                                    <td class="px-4 py-2">{item.name}</td>
                                    <td class="px-4 py-2">{item.count}</td>
                                    <td class="px-4 py-2 flex space-x-2">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => editItem(item)}
                                            >Edit</button
                                        >
                                        <button
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            on:click={() => deleteItem(item.id)}
                                            >Delete</button
                                        >
                                    </td>
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            {/if}
        {/if}
        <form class="mt-4" on:submit|preventDefault={addItem}>
            <input
                class="bg-black text-white px-4 py-2 rounded"
                placeholder="Enter name"
                bind:value={name}
            />
            <button
                type="submit"
                class="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >Add Item</button
            >
        </form>
    </div>
{/if}
}
