<script>
    import { Tooltip } from "@svelteuidev/core";
    export let label = "";
    export let position = "bottom";
    export let width = "";
    export let multiline = false;
    export let labelCondition = true;
</script>

{#if (label != "" || $$slots.label) && labelCondition}
    <Tooltip
        wrapLines={multiline}
        {width}
        {position}
        gutter={15}
        withArrow
        color="var(--kPrimary)"
    >
        <span slot="label">
            <slot name="label">
                {label}
            </slot>
        </span>
        <slot />
    </Tooltip>
{:else}
    <slot />
{/if}
