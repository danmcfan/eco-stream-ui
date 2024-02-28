<script lang="ts">
    import { goto } from "$app/navigation";
    import { pb } from "$lib";

    let username = "";
    let password = "";
    let passwordConfirm = "";
    let errorMessage = "";

    async function createAccount() {
        errorMessage = "";

        if (!username || !password || !passwordConfirm) {
            errorMessage = "Please fill out all fields.";
            return;
        }

        if (password.length < 8 || passwordConfirm.length > 72) {
            errorMessage = "Password must be between 8 and 72 characters.";
            return;
        }

        if (password !== passwordConfirm) {
            errorMessage = "Passwords do not match.";
            return;
        }

        try {
            await pb.collection("users").create({
                username,
                password,
                passwordConfirm,
            });

            goto("/");
        } catch (error) {
            errorMessage = "Failed to create account. Please try again.";
        }
    }
</script>

<div class="flex flex-col justify-center items-center bg-black">
    <h1 class="text-green-500 mb-6 text-3xl">Create Account</h1>
    <form class="w-full max-w-xs">
        <div class="mb-4">
            <input
                type="text"
                bind:value={username}
                placeholder="Username"
                class="appearance-none block w-full bg-gray-900 text-white border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-green-500"
            />
        </div>
        <div class="mb-4">
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                class="appearance-none block w-full bg-gray-900 text-white border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-green-500"
            />
        </div>
        <div class="mb-6">
            <input
                type="password"
                bind:value={passwordConfirm}
                placeholder="Confirm Password"
                class="appearance-none block w-full bg-gray-900 text-white border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-green-500"
            />
        </div>
        <div class="flex items-center justify-between">
            <button
                type="submit"
                on:click|preventDefault={createAccount}
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Register
            </button>
        </div>
        {#if errorMessage}
            <p class="text-red-500 text-xs italic mt-4">{errorMessage}</p>
        {/if}
    </form>
</div>
