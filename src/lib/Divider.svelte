<!-- Divider.svelte -->
<script>
    export let size = "border-t-2";
    export let color = "border-gray-300";
    export let margin = "my-4";
</script>

<div class={`${size} ${color} ${margin}`} />
