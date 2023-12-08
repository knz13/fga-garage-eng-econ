<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { addDays, addWeeks, addMonths, addYears, format } from 'date-fns';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Finance } from 'financejs';

	let chart: Chart;
	let chartData: number[] = [];
	let chartLabels: string[] = [];
	let interval = 'monthly';
	let initialDate = Date.now();
	let newValue = '0';
	let selectedBar: any = null;
	let atOption = 'individual';
	let numeroDeParcelasParaAdicionar = 1;
	let parcelaValor = 0;
	let showingResults = false;
	let taxa = 1;
	let vpl = 0;
	let vplNaSelic = 0;
	let tir: number | null = 0;
	const finance = new Finance();

	function clickOutside(element: HTMLElement, callbackFunction: Function) {
		function onClick(event: any) {
			if (!element.contains(event.target)) {
				callbackFunction();
			}
		}

		document.body.addEventListener('click', onClick);

		return {
			update(newCallbackFunction: Function) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	}

	const intervalOptions: { [id: string]: Function } = {
		daily: addDays,
		weekly: addWeeks,
		monthly: addMonths,
		yearly: addYears
	};

	function calculateNPV(discountRate: number, cashFlows: number[]): number {
		let npv = 0;

		for (let i = 0; i < cashFlows.length; i++) {
			npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
		}

		return npv;
	}
	function calculateIRR(
		cashFlows: number[],
		initialGuess: number = 0.1,
		maxIterations: number = 1000,
		tolerance: number = 0.00001
	): number | null {
		let x0 = initialGuess;
		let x1 = 0.0;
		let npv = 0.0;
		let derivativeNpv = 0.0;

		for (let i = 0; i < maxIterations; i++) {
			npv = 0.0;
			derivativeNpv = 0.0;

			for (let j = 0; j < cashFlows.length; j++) {
				const factor = Math.pow(1 + x0, j);
				npv += cashFlows[j] / factor;
				derivativeNpv += (-j * cashFlows[j]) / Math.pow(factor, 2);
			}

			if (Math.abs(npv) < tolerance) {
				return x0;
			}

			x1 = x0 - npv / derivativeNpv;

			if (Math.abs(x1 - x0) < tolerance) {
				return x1;
			}

			x0 = x1;
		}

		return null; // Return null if no solution is found
	}

	function getNextLabel(): string {
		const lastIndex = chartLabels.length - 1;
		const lastDate = lastIndex >= 0 ? new Date(chartLabels[lastIndex]) : initialDate;
		return format(intervalOptions[interval](lastDate, 1), 'yyyy-MM-dd');
	}

	function updateBarColors() {
		const backgroundColors = chartData.map((_, index) =>
			index === selectedBar ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'
		);
		chart.data.datasets[0].backgroundColor = backgroundColors;
	}

	function addDataPoint() {
		const nextLabel = getNextLabel();
		console.log(nextLabel);
		chartLabels.push(nextLabel);
		chartData.push(parseFloat(newValue));
		chart.update();
		newValue = '0';
	}

	function updateDataPoint() {
		if (selectedBar !== null) {
			chartData[selectedBar] = parseFloat(newValue);
			chart.update();
		}
	}

	onMount(() => {
		const ctx = (document.getElementById('cashFlowChart') as HTMLCanvasElement).getContext('2d')!;
		chart = new Chart(ctx, {
			type: 'bar',

			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Cash Flow',
						data: chartData,
						backgroundColor: ['rgba(54, 162, 235, 0.6)'],
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				onClick: (event) => {
					atOption = 'individual';
					const points = chart.getElementsAtEventForMode(
						event as any,
						'nearest',
						{ intersect: true },
						true
					);
					if (points.length) {
						const firstPoint = points[0];
						selectedBar = firstPoint.index;
						newValue = chartData[selectedBar].toString();
						updateBarColors();
						chart.update();
					}
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
		updateBarColors();
	});
</script>

<div class="bg-white w-full p-[2rem] text-black">
	<div class="text-left text-[red] text-[2rem]">Seu Fluxo de Caixa</div>
	<p class="text-left">
		Para te ajudarmos a fazer seus planos, precisamos saber como é o seu fluxo de caixa.
	</p>
	<p class="text-left w-[50%] mt-[1rem]">
		Ex. Se você quer comprar um carro por $70.000,00 com uma entrada de $10.000,00 e parcelas de
		$600,00, você deve colocar -10000 na primeira coluna (no tempo de hoje) e -600 em todos os meses
		que você deverá pagar as parcelas. Se quiser, você também poderá colocar a taxa que o vendedor
		te ofereceu. Assim, podemos calcular a TIR e o VPL do seu investimento, ou seja, se vale a pena
		ou não comprar o carro e o quanto você vai pagar no total.
	</p>
	<div class="centered-row">
		<div class=" w-[70vw]">
			<div class="flex mt-[1rem]">
				<button
					class="mr-[1rem]"
					on:click={() => {
						while (chartLabels.length > 0) chartLabels.pop();
						while (chartData.length > 0) chartData.pop();
						chart.update();
					}}>Limpar</button
				>
				<button
					on:click={() => {
						if (selectedBar != null) {
							selectedBar = null;
							updateBarColors();
							chart.update();
						}
					}}
					class="bg-red {selectedBar == null ? 'bg-transparent pointer-events-none' : ''}"
					>De-selecionar</button
				>
			</div>
			<canvas id="cashFlowChart" />
		</div>
		<div class="grid pl-[1rem] w-[30vw] h-full align-top">
			<div class="h-full grid">
				<h2 class="text-center">Regime de cobrança</h2>
				<select
					bind:value={interval}
					on:change={(a) => {
						while (chartLabels.length > 0) chartLabels.pop();
						while (chartData.length > 0) chartData.pop();
						chart.update();
					}}
				>
					<option value="daily">Diário</option>
					<option value="weekly">Semanal</option>
					<option value="monthly">Mensal</option>
					<option value="yearly">Anual</option>
				</select>
			</div>
			<div class="flex-1" />
			<div class="flex justify-center text-black">
				<button
					on:click={() => {
						atOption = 'individual';
					}}
					class=" rounded-r-none {atOption == 'individual' ? 'bg-black' : ''}">Individual</button
				>
				<button
					on:click={() => {
						atOption = 'parcelas';
						selectedBar = null;
						updateBarColors();
						chart.update();
					}}
					class=" rounded-l-none rounded-r-none !border-l-black border-r-black {atOption ==
					'parcelas'
						? 'bg-black'
						: ''}">Parcelas</button
				>
				<button
					on:click={() => {
						atOption = 'taxa';
						selectedBar = null;
						updateBarColors();
						chart.update();
					}}
					class=" rounded-l-none !border-l-black {atOption == 'taxa' ? 'bg-black' : ''}"
				>
					Taxa
				</button>
			</div>

			{#if atOption === 'individual'}
				<h3>Valor Para Adicionar</h3>
				<input type="number" step="0.01" bind:value={newValue} placeholder="Enter value" />
				<button on:click={selectedBar == null ? addDataPoint : updateDataPoint}
					>{selectedBar == null ? 'Adicionar Valor' : 'Atualizar Valor'}</button
				>
			{/if}
			{#if atOption === 'parcelas'}
				<h3>Número de Parcelas</h3>
				<input
					type="number"
					min="1"
					bind:value={numeroDeParcelasParaAdicionar}
					placeholder="Parcelas"
				/>
				<h3>Valor da Parcela</h3>
				<input type="number" step="0.01" bind:value={parcelaValor} placeholder="Valor" />
				<button
					on:click={() => {
						for (let i = 0; i < numeroDeParcelasParaAdicionar; i++) {
							const nextLabel = getNextLabel();
							chartLabels.push(nextLabel);
							chartData.push(parcelaValor);
							chart.update();
						}
					}}>Adicionar Parcelas</button
				>
			{/if}
			{#if atOption == 'taxa'}
				<h3>Taxa em porcentagem</h3>
				<input type="number" step="0.01" bind:value={taxa} placeholder="Taxa" />
			{/if}
			{#if chartData.length > 0}
				<button
					class="ml-[50%] w-[50%] mt-[4rem]"
					on:click={() => {
						showingResults = true;
						vpl = calculateNPV(taxa / 100, chartData);
						tir = calculateIRR(chartData);
						vplNaSelic = calculateNPV(0.0775 / 100, chartData);
						setTimeout(() => {
							document.getElementById('bottom-results')?.scrollIntoView();
						}, 100);
					}}>Continuar</button
				>
			{/if}
		</div>
	</div>
	{#if showingResults}
		<div id="bottom-results" class="h-[100vh]">
			<h2 class="text-left text-red text-[2rem]">Resultados</h2>

			<h3>VPL: R${vpl.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
			{#if tir != null}
				<h3>TIR: {tir}%</h3>
			{/if}
			<h3>
				VPL se fosse aplicada a taxa selic: R${vplNaSelic.toLocaleString('pt-br', {
					minimumFractionDigits: 2
				})}
			</h3>
		</div>
	{/if}
</div>

<style>
	.centered-row {
		display: flex;
		align-items: center;
	}

	select,
	input {
		color: white;
		margin: 10px;
		padding: 5px;
	}
</style>