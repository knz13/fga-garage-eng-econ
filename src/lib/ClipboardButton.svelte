<script>
    import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
    import IconButton from "./IconButton.svelte";
    export let textToCopy = "This is the text to be copied to the clipboard!";
    let copied = false;
    export let position = "bottom";
    export let onPressed = () => {};

    async function copyToClipboard() {
        onPressed();
        try {
            await navigator.clipboard.writeText(textToCopy);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }
</script>

<IconButton
    {position}
    tooltip={"Copy Dashboard Token to Clipboard"}
    icon={copied ? faCheck : faClipboard}
    onPress={copyToClipboard}
/>

<style>
    /* Any necessary styles for ClipboardButton can go here */
</style>
