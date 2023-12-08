<!-- Home.svelte -->

<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { showLoading } from '$lib/LoadingOverlay/LoadingOverlayStore';
	import { toast } from 'svoast';

	let positionOffset = true;
	let opacityDone = false;
	let started = false;
	onMount(() => {
		setTimeout(() => {
			started = true;
		}, 300);
		setTimeout(() => {
			opacityDone = true;
			positionOffset = false;
		}, 2000);
	});
</script>

<div class="centered-container">
	<h1 class="transition-opacity ease-in duration-[1s] opacity-0 {started ? 'started' : ''}">
		FGA'S GARAGE
	</h1>
	<h2
		class="transition-opacity ease-in duration-[1s] delay-300 opacity-0 {started ? 'started' : ''}"
	>
		Desferrando as pessoas desde 2023
	</h2>

	<button
		on:click={() => {
			goto('/explanation');
		}}
		class="transition-all ease-in-out duration-[2s] delay-[2s] opacity-0 {opacityDone
			? 'started'
			: ''} {positionOffset ? 'translate-y-[20rem]' : 'translate-y-0'}">Continuar</button
	>
</div>

<style>
	.centered-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://media-public.canva.com/i0WvU/MAEAMCi0WvU/1/s2.jpg');
		justify-content: center;
		height: 100vh; /* take up full viewport height */
	}

	.started {
		opacity: 1;
	}
</style>
