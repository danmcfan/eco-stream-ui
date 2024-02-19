<script lang="ts">
    import { onMount } from "svelte";

    const apiUrl = import.meta.env.VITE_API_URL;

    type User = {
        id: string;
        username: string;
    };

    let users: User[] = [];
    let isLoading = true;
    let username = "";

    async function fetchUsers() {
        const res = await fetch(`${apiUrl}/users/`);
        users = await res.json();
        isLoading = false;
    }

    async function addUser(event: SubmitEvent) {
        event.preventDefault();

        if (username.trim() === "") {
            alert("Username is required");
            return;
        }

        const res = await fetch(`${apiUrl}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });

        if (res.ok) {
            username = "";
            await fetchUsers();
        } else {
            alert("Failed to add user");
        }
    }

    async function deleteUser(id: string) {
        const res = await fetch(`${apiUrl}/users/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            await fetchUsers();
        } else {
            alert("Failed to delete user");
        }
    }

    onMount(async () => {
        await fetchUsers();
    });
</script>

<svelte:head>
    <title>EcoStream</title>
</svelte:head>

<div class="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
    {#if isLoading}
        <p class="text-3xl font-bold text-blue-300 mb-4 text-center">
            Loading...
        </p>
    {:else}
        <h1 class="text-3xl font-bold text-blue-300 mb-4 text-center">Users</h1>
        {#if users.length === 0}
            <p class="text-gray-400 text-center">No users found</p>
        {:else}
            <div class="overflow-x-auto">
                <table class="w-full text-left text-gray-200">
                    <thead class="text-gray-400 bg-gray-700">
                        <tr>
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Username</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users as user (user.id)}
                            <tr class="border-b border-gray-700">
                                <td class="px-4 py-2 font-bold">{user.id}</td>
                                <td class="px-4 py-2">{user.username}</td>
                                <td class="px-4 py-2">
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                        on:click={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        <form class="mt-4 text-center" on:submit={addUser}>
            <input
                class="px-4 py-2 rounded"
                placeholder="Enter username"
                bind:value={username}
            />
            <button
                class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit">Add User</button
            >
        </form>
    {/if}
</div>
