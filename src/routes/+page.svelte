<script lang="ts">
    import { onMount } from "svelte";
    import { UserTable } from "$lib/components";

    const EXPIRED_MINUTES = 10;

    let loggedIn = false;
    let password = "";

    onMount(() => {
        const loggedInItem = localStorage.getItem("loggedIn");
        if (loggedInItem) {
            const loggedInData = JSON.parse(loggedInItem);
            const isExpired = new Date().getTime() > loggedInData.expiry;
            if (!isExpired) {
                loggedIn = true;
            } else {
                localStorage.removeItem("loggedIn");
            }
        }
    });

    async function login() {
        if (password === "password") {
            loggedIn = true;
            localStorage.setItem(
                "loggedIn",
                JSON.stringify({
                    expiry: new Date().getTime() + 1000 * 60 * EXPIRED_MINUTES,
                }),
            );
        } else {
            alert("Incorrect password");
            password = "";
        }
    }
</script>

<svelte:head>
    <title>EcoStream</title>
</svelte:head>

{#if loggedIn}
    <UserTable />
{:else}
    <div class="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
        <h1 class="text-3xl font-bold text-blue-300 mb-4 text-center">
            Please Log In
        </h1>
        <form class="mt-4 text-center">
            <input
                type="password"
                class="px-4 py-2 rounded"
                placeholder="Password"
                bind:value={password}
            />
            <button
                type="submit"
                class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={login}
            >
                Log in
            </button>
        </form>
    </div>
{/if}
