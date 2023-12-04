import { writable } from 'svelte/store';

interface LoadingState {
    isLoading: boolean;
    message: string;
}

const initialState: LoadingState = {
    isLoading: false,
    message: 'Loading...'
};

const loadingStore = writable<LoadingState>(initialState);

async function showLoading(message: string = 'Loading...', customResolver?: () => Promise<any>): Promise<void> {
    loadingStore.set({ isLoading: true, message });

    if (customResolver) {
        await customResolver();
    }

    loadingStore.set({ isLoading: false, message: 'Loading...' });
}

export { loadingStore, showLoading };
