<script lang="ts">
    import { loggedIn } from "$lib";
    import { Items, Login, Register } from "$lib/components";

    let register = false;
</script>

<div class="min-h-screen bg-black text-green-400 matrix-font">
    {#if $loggedIn === null}
        <div></div>
    {:else if $loggedIn}
        <Items />
    {:else if register}
        <div class="flex flex-col items-center justify-center">
            <Register />
            <button
                class="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                on:click={() => (register = false)}>Login</button
            >
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center">
            <Login />
            <button
                class="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                on:click={() => (register = true)}>Register</button
            >
        </div>
    {/if}
</div>
