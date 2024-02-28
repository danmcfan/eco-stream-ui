<script lang="ts">
    import { onMount } from "svelte";
    import { pb, loggedIn } from "$lib";

    import "../app.css";

    onMount(async () => {
        $loggedIn = pb.authStore.isValid;
    });

    function logout() {
        pb.authStore.clear();
        $loggedIn = false;
    }
</script>

<svelte:head>
    <title>EcoStream</title>
</svelte:head>

<nav
    class="bg-black text-green-400 p-4 flex justify-between items-center matrix-font"
>
    <h1 class="text-2xl font-bold">EcoStream</h1>
    {#if $loggedIn}
        <div class="flex items-center space-x-4">
            <p class="font-bold">{pb.authStore.model?.username}</p>
            <button
                class="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                on:click={logout}>Log Out</button
            >
        </div>
    {/if}
</nav>

<slot />
