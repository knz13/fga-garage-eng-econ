<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { showLoading } from '$lib/LoadingOverlay/LoadingOverlayStore';
	import { toast } from 'svoast';

	let positionOffset = true;
	let opacityDone = false;
	let started = false;
	onMount(() => {
		let started = true;
		setTimeout(() => {
			opacityDone = true;
			positionOffset = false;
		}, 2000);
	});
</script>

<div class="centered-container">
	<h1
		class="absolute top-[2rem] left-[2rem] transition-opacity ease-in duration-[1s] opacity-0 {started
			? 'started'
			: ''}"
	>
		FGA'S GARAGE
	</h1>
	<h2
		class="transition-opacity ease-in duration-[1s] delay-300 opacity-0 {started ? 'started' : ''}"
	>
		Desferrando as pessoas desde 2023
	</h2>
	<a href="/explanation">
		<button
			disabled={positionOffset == false}
			class="transition-all ease-in-out duration-[2s] delay-[2s] opacity-0 {opacityDone
				? 'started'
				: ''} {positionOffset ? 'translate-y-[20rem]' : 'translate-y-0'}">Continuar</button
		>
	</a>
</div>

<style>
	.centered-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		justify-content: center;
		color: red;
		height: 100vh; /* take up full viewport height */
	}

	.started {
		opacity: 1;
	}

	button {
		margin-top: 20px;
		padding: 10px 15px;
		cursor: pointer;
		border: none;
		background-color: #6200ea;
		color: white;
		border-radius: 5px;
		font-size: 16px;
		transition: background-color 0.3s ease;
		transition: all 0.5s ease;

		/* optional styling for button hover */
		&:hover {
			background-color: #4b00b5;
		}
	}
</style>
