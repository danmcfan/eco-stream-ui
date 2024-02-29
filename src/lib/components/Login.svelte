<script lang="ts">
    import { pb, currentUser } from "$lib";

    let username = "";
    let password = "";

    async function login() {
        await pb.collection("users").authWithPassword(username, password);

        username = "";
        password = "";
    }

    async function signUp() {
        try {
            await pb
                .collection("users")
                .create({ username, password, passwordConfirm: password });
            await login();
        } catch (error) {
            console.error(error);
        }
    }

    function logout() {
        pb.authStore.clear();
    }
</script>

<div class="bg-white shadow-md rounded-lg py-4 px-6">
    {#if $currentUser}
        <div class="flex justify-between items-center">
            <p class="text-blue-600">
                Signed in as <span class="font-bold"
                    >{$currentUser.username}</span
                >
            </p>
            <button
                class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                on:click={logout}>Logout</button
            >
        </div>
    {:else}
        <form class="flex space-x-4 items-center" on:submit|preventDefault>
            <input
                class="rounded-lg border-2 border-blue-500 py-2 px-4"
                placeholder="Username"
                type="text"
                bind:value={username}
            />
            <input
                class="rounded-lg border-2 border-blue-500 py-2 px-4"
                placeholder="Password"
                type="password"
                bind:value={password}
            />
            <button
                class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                on:click={login}>Login</button
            >
            <button
                class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                on:click={signUp}>Sign Up</button
            >
        </form>
    {/if}
</div>
