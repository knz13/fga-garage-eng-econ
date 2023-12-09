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
		}, 1500);
	});
</script>

<div class="centered-container">
	<h1 class="absolute text-[red] left-[2rem] top-[2rem] text-[3rem]">Nossa Missão</h1>
	<img
		alt="red car"
		src="https://media-public.canva.com/Nwyj8/MADyQ-Nwyj8/1/s.jpg"
		class="absolute left-[2rem] bottom-[2rem] w-[30rem]"
		height="auto"
	/>
	<img
		src="https://media-public.canva.com/MADGxmZ8TCo/4/screen.jpg"
		alt="car interior"
		class="absolute right-[2rem] top-[2rem] h-[15rem]"
	/>
	<h2 class="text-black absolute right-[2rem] bottom-[7.5rem] w-[50vw] text-center text-[2rem]">
		Fazer os cálculos da TIR, VPL e análises para que você possa ter o seu carro dos sonhos sem ter
		que pagar por ele duas vezes ou mais.
	</h2>
	<a href="/dashboard">
		<button
			class="absolute bottom-[2rem] right-[2rem] transition-all ease-in-out duration-[2s] delay-[0.5s] opacity-0 {opacityDone
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
</style>
