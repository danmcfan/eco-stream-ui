<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { pb, currentUser } from "$lib";

    let items: any[] = [];
    let unsubscribe: () => void;

    let name = "";

    onMount(async () => {
        const resultList = await pb.collection("items").getList(1, 50, {
            sort: "created",
            expand: "user",
        });
        items = resultList.items;

        unsubscribe = await pb
            .collection("items")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    // Fetch associated user
                    const user = await pb
                        .collection("users")
                        .getOne(record.user);
                    record.expand = { user };
                    items = [...items, record];
                }
                if (action === "delete") {
                    items = items.filter((item) => item.id !== record.id);
                }
            });
    });

    onDestroy(() => {
        unsubscribe();
    });

    async function deleteItem(id: string) {
        await pb.collection("items").delete(id);
    }

    async function createItem() {
        await pb.collection("items").create({
            name,
            user: $currentUser?.id,
        });
        name = "";
    }
</script>

<div class="bg-white shadow-md rounded-lg py-4 px-6 min-h-screen">
    <h1 class="text-blue-600 text-xl font-bold mb-4">Items</h1>

    <table class="table-auto w-full">
        <thead class="bg-blue-100">
            <tr>
                <th class="px-4 py-2 border-b-2 border-blue-200">ID</th>
                <th class="px-4 py-2 border-b-2 border-blue-200">Name</th>
                <th class="px-4 py-2 border-b-2 border-blue-200">Count</th>
                <th class="px-4 py-2 border-b-2 border-blue-200">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each items as item (item.id)}
                <tr class="even:bg-blue-50">
                    <td class="px-4 py-2 border-b border-blue-200">{item.id}</td
                    >
                    <td class="px-4 py-2 border-b border-blue-200"
                        >{item.name}</td
                    >
                    <td class="px-4 py-2 border-b border-blue-200"
                        >{item.count}</td
                    >
                    <td
                        class="px-4 py-2 border-b border-blue-200 flex justify-start space-x-2"
                    >
                        <button
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            on:click={() => deleteItem(item.id)}>Delete</button
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <form
        class="mt-4 flex flex-col space-y-2"
        on:submit|preventDefault={createItem}
    >
        <input
            class="px-4 py-2 rounded border-2 border-blue-500"
            placeholder="Enter name"
            bind:value={name}
        />
        <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Create Item</button
        >
    </form>
</div>
