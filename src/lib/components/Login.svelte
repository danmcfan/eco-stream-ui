<script lang="ts">
    import { goto } from "$app/navigation";
    import { pb, loggedIn } from "$lib";

    let username = "";
    let password = "";
    let errorMessage = "";

    async function login() {
        errorMessage = "";

        try {
            await pb.collection("users").authWithPassword(username, password);
            $loggedIn = true;
            goto("/");
        } catch (error) {
            errorMessage = "Failed to log in. Please try again.";
        }
    }
</script>

<div class="flex flex-col items-center justify-center bg-black">
    <h1 class="text-3xl font-bold text-green-500 mb-4">Please Log In</h1>
    <form class="flex flex-col space-y-3" on:submit|preventDefault={login}>
        <input
            type="text"
            placeholder="Username"
            bind:value={username}
            class="text-black p-2 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            bind:value={password}
            class="text-black p-2 rounded"
        />
        <button
            type="submit"
            class="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >Log in</button
        >
    </form>
    {#if errorMessage}
        <p class="text-red-500 mt-4">{errorMessage}</p>
    {/if}
</div>
