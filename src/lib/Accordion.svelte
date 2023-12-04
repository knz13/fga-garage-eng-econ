<script>
    export let isOpen = false; // Prop to control open/close state
    export let title = "My Dashboards"; // Prop for accordion title
    export let onPress = () => {}; // Prop for action on accordion button press
    import Divider from "./Divider.svelte";
    import Fa from "svelte-fa";
    import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
</script>

<!-- Accordion Button -->
<button
    on:click={() => {isOpen = !isOpen;onPress();}}
    class="w-full h-10 m-0 bg-[#1F1F1F] grid grid-cols-10"
>
    <div class="col-span-9">{title}</div>
    <div
        class=" my-[0.1em] transition-all ease-out duration-[0.3s] {isOpen
            ? 'rotate-[90deg]'
            : 'rotate-[180deg]'}"
    >
        <Fa translateX={0.3} translateY={0} icon={faChevronRight} />
    </div>
</button>

<Divider />

<!-- Accordion Content -->
<div
    class="transition-all ease-out duration-[0.3s] m-2 {isOpen
        ? 'max-h-[30vh] overflow-y-auto'
        : 'max-h-0 overflow-hidden'}"
>
    <slot />
    <!-- This allows insertion of custom content -->
</div>

<style>
   
</style>
