import * as store from 'svelte/store';

export interface ModalState {
    shouldShow: boolean;
    text: string;
    shouldShowCancelButton: boolean;
    onConfirm: () => void;
}

const initialState: ModalState = {
    shouldShow: false,
    text: '',
    shouldShowCancelButton: false,
    onConfirm: () => {}
};

const modalStore: store.Writable<ModalState> = store.writable(initialState);

function showModal(options: Partial<ModalState> = {}) {
    modalStore.set({
        ...initialState,
        ...options,
        shouldShow: true
    });
}

function hideModal() {
    modalStore.set(initialState);
}

export { modalStore, showModal, hideModal };
