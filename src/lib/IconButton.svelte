<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import { Tooltip } from "@svelteuidev/core";
    import Fa from "svelte-fa";
    import CustomTooltip from "./CustomTooltip.svelte";
    export let icon: any;
    export let onPress = () => {};
    export let tooltip = "";
    export let position = "bottom";
</script>

<CustomTooltip {position} label={tooltip}>
    <div class="tooltip-container">
        <button
            on:click={onPress}
            class="p-[0.65rem] justify-center align-middle items-center text-white"
        >
            <Fa {icon} class="fa-icon" />
        </button>
    </div>
</CustomTooltip>

<style>
    .tooltip-container {
        position: relative;
        display: inline-block;
    }
</style>
