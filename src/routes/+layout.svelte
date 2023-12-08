<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingOverlay from '$lib/LoadingOverlay/LoadingOverlay.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import { onMount } from 'svelte';
	import { Toasts, toast } from 'svoast';
	import './app.css';

	let { supabase, session } = $page.data;
	$: ({ supabase, session } = $page.data);

	onMount(() => {
		var url = $page.url;
		if (url.searchParams.get('toast')) {
			const toastData = decodeURIComponent(url.searchParams.get('toast') as string);
			const type = (
				url.searchParams.get('type') as 'success' | 'error' | 'info' | 'warning' | undefined
			)?.replaceAll('"', '');

			switch (type) {
				case 'success':
					toast.success(toastData);
					break;
				case 'error':
					toast.error(toastData);
					break;
				case 'info':
					toast.info(toastData);
					break;
				case 'warning':
					toast.warning(toastData);
					break;
				default:
					toast.info(toastData);
					break;
			}
		}
	});
</script>

<svelte:head />

<div class="app">
	<slot />
</div>
<Toasts position="top-center" />
<Modal />
<LoadingOverlay />

<style lang="postcss">
	:root {
		--kPrimary: #19d8a8;
		--kSecondary: #1f1f1f;
		--kAccent: #3f4a84;
		--kSuccess: #52ba50;
		--kWarning: #e43a3a;
		--kEnabled: #edeffd;
		--kBackground: #12130f;

		--kMain: #000000;
		--kSecondaryText: #4e4947;
		--kOutline: #ffc970;
		--kForm: #ece7e3;
		--kGoogle: #808080;
		--kGraphRed: #ff1400;
		--svoast-text: #1f1f1f;
		--svoast-bg: white;
		--svoast-info-colour: #888;
		--svoast-attention-colour: #38bdf8;
		--svoast-success-colour: var(--kPrimary);
		--svoast-warning-colour: #fb923c;
		--svoast-error-colour: #ef4444;
		--svoast-bar-width: 0.5rem;
	}

	:global(button) {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		padding: 0.5rem 1rem;
		cursor: pointer;
		background-color: #6200ea;
		color: white;
		border-radius: 4px;
		opacity: 1;

		&:hover {
			background-color: #4b00b5;
			scale: 0.975;
			opacity: 1.5;
		}

		&:active {
			opacity: 0.7;
			scale: 0.95;
		}
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

	.app {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
