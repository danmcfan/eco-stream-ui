<script lang="ts">
	import { onMount } from 'svelte';
	import { users } from '../stores/users';

	onMount(async () => {
		const res = await fetch('http://localhost:8080/users/');
		const data = await res.json();
		users.set(data);
	});
</script>

<head>
	<title>EcoStream</title>
</head>

<div class="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
	<h1 class="text-3xl font-bold text-blue-300 mb-4 text-center">Users</h1>
	{#if $users.length === 0}
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
					{#each $users as user}
						<tr class="border-b border-gray-700">
							<td class="px-4 py-2 font-bold">{user.id}</td>
							<td class="px-4 py-2">{user.username}</td>
							<td class="px-4 py-2">
								<button
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
								>
									Edit
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
