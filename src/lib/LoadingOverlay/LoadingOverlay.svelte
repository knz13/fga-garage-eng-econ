<script>
    import { fade } from "svelte/transition";
    import { loadingStore } from "./LoadingOverlayStore";
    import RaceByLoader from "../RaceByLoader.svelte";

    let state = { isLoading: false, message: "Loading..." };

    loadingStore.subscribe((value) => {
        state = value;
    });
</script>

{#if state.isLoading}
    <div class="loading-overlay" transition:fade={{ duration: 100 }}>
        <div class="loading-content">
            <p class="pb-4">{state.message}</p>
            <RaceByLoader color={"var(--kPrimary)"} size={"10rem"} />
        </div>
    </div>
{/if}

<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000; /* Ensure it's on top of other content */
    }
    .loading-content {
        text-align: center;
        color: white;
    }
</style>
