<script>
    export let percentage = 0; // Percentage of fill, between 0 and 100
    export let height = "2rem"; // Default height
    export let bgColor = "lightgray"; // Background color of the pill
    export let fillColor = "var(--kPrimary)"; // Color of the fill
</script>

<div class="pill" style="--pill-height: {height};  --bg-color: {bgColor}">
    <div
        class="fill"
        style="--fill-percentage: {percentage}; --fill-color: {fillColor}"
    />
</div>

<style>
    .pill {
        background-color: var(--bg-color);
        border-radius: calc(var(--pill-height) / 4);
        overflow: hidden;
        position: relative;
        width: calc(var(--pill-height) / 2);
        height: var(--pill-height);
    }

    .fill {
        width: 100%;
        height: calc(var(--pill-height) * var(--fill-percentage) / 100);
        background-color: var(--fill-color);
        position: absolute;
        bottom: 0;
        transition: height 0.2s ease-in-out;
    }
</style>
