<script lang="ts">
    import { currentUser } from "$lib";
    import { Items, Login } from "$lib/components";
</script>

<Login />

{#if $currentUser}
    <Items />
{/if}
