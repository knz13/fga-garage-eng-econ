<script lang="ts">
	import { modalStore, hideModal } from './ModalStore';

	let state: import('./ModalStore').ModalState = {
		shouldShow: false,
		text: '',
		onConfirm: () => {},
		shouldShowCancelButton: false
	};

	modalStore.subscribe((value) => {
		state = value;
	});

	function handleConfirm() {
		state.onConfirm();
		hideModal();
	}
</script>

{#if state.shouldShow}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal" on:click={hideModal}>
		<div class="modal-content" on:click|stopPropagation>
			<p>{state.text}</p>
			<div class="buttons">
				<button on:click={handleConfirm} class="confirm-button">Confirm</button>
				{#if state.shouldShowCancelButton}
					<button on:click={hideModal} class="cancel-button">Cancel</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.4); /* Slight transparency for the blur effect */
		backdrop-filter: blur(1px); /* This will blur the background content */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal-content {
		background-color: white;
		color: black;
		padding: 20px;
		border: solid white;

		border-radius: 8px;
		width: 300px;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		margin-left: 2rem;
		margin-right: 2rem;
	}
	button {
		box-shadow: rgba(0, 0, 0, 0.25) 2px 5px 10px;
		border: none;
		cursor: pointer;
	}

	.confirm-button {
		background-color: var(--kPrimary);
	}
	.confirm-button:hover {
		scale: 1.1;
	}
	.cancel-button {
		background-color: var(--kWarning);
	}
	.cancel-button:hover {
		scale: 1.1;
	}
</style>
