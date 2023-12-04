<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition"; // <-- Import fade transition
    import type { IMenuItem } from "./IMenuItem";
    import Fa from "svelte-fa";

    let menuOpen: boolean = false;
    let menuElement: HTMLElement;
    let controlElement: HTMLElement;

    export let menuItems: IMenuItem[] = [];

    onMount(() => {
        // Add Font Awesome styles
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
        document.head.appendChild(style);

        // Add event listener
        document.addEventListener("click", handleOutsideClick);

        return () => {
            // Cleanup event listener
            document.removeEventListener("click", handleOutsideClick);
        };
    });

    function handleOutsideClick(event: MouseEvent) {
        if (
            event.target != null &&
            menuElement != null &&
            controlElement != null &&
            !menuElement.contains(event.target as HTMLElement) &&
            !controlElement.contains(event.target as HTMLElement)
        ) {
            menuOpen = false;
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    bind:this={controlElement}
    class="inline-block"
    on:mouseenter={() => (menuOpen = true)}
    on:mouseleave={() => (menuOpen = false)}
>
    <slot name="control" />
</div>

{#if menuOpen}
    <!-- Check if the menu should be shown -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        transition:fade={{ duration: 150 }}
        bind:this={menuElement}
        class="menu"
        on:mouseenter={() => (menuOpen = true)}
        on:mouseleave={() => (menuOpen = false)}
    >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each menuItems as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="menu-item"
                on:click={() => {
                    menuOpen = false;
                    item.action();
                }}
            >
                <Fa icon={item.icon} />
                <span class="pl-2">{item.text}</span>
            </div>
        {/each}
    </div>
{/if}

<style>
    .menu {
        position: absolute;
        top: 100%;
        right: 25%;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 150px;
        background-color: #1f1f1f;
        z-index: 9999;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        color: inherit;
    }

    .menu-item:last-child {
        border-bottom: none;
    }

    .menu-item:hover {
        background-color: white;
        color: black;
    }
</style>
