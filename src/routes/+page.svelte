<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { onMount } from "svelte";
    import { UserTable } from "$lib/components";

    const apiUrl = env.PUBLIC_API_URL;

    let token = "";
    let loggedIn = false;
    let username = "";
    let password = "";

    onMount(async () => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            const res = await fetch(`${apiUrl}/authenticate/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localToken}`,
                },
            });

            if (res.ok) {
                token = localToken;
                loggedIn = true;
            } else {
                localStorage.removeItem("token");
            }
        }
    });

    async function login() {
        const res = await fetch(`${apiUrl}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);

            token = data.token;
            loggedIn = true;
        } else {
            username = "";
            password = "";
        }
    }
</script>

<svelte:head>
    <title>EcoStream</title>
</svelte:head>

{#if loggedIn}
    <UserTable {token} />
{:else}
    <div class="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
        <h1 class="text-3xl font-bold text-blue-300 mb-4 text-center">
            Please Log In
        </h1>
        <form class="mt-4 text-center">
            <input
                type="text"
                class="px-4 py-2 rounded"
                placeholder="Username"
                bind:value={username}
            />
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
