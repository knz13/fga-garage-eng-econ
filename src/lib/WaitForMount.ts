
export const prerender = false;

export type OnMountedCallback = (element: WaitForMountElement) => void;

export class WaitForMountElement extends HTMLElement {
    // Define a property for the callback
    public onMounted?: OnMountedCallback;

    constructor() {
        super();
    }

    connectedCallback() {
        this.onMounted?.(this);
    }
}