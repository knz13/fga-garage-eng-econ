<script lang="ts">
    import { onMount } from "svelte";


    export let functionToExecute: () => void = () => {};

    onMount(() => {
        functionToExecute();
    });
</script>

