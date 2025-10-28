<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="mb-8 flex items-center justify-center gap-3 sm:gap-6 text-center">
	<!-- Left Wave -->
	<svg
		width="60"
		height="24"
		viewBox="0 0 60 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="text-foreground opacity-60"
		aria-hidden="true"
	>
		<path
			d="M3 12C3 12 12 4 21 12C30 20 39 12 48 12C57 12 57 12 57 12"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	<!-- Title -->
	<h2 class="text-4xl font-bold text-foreground">
		{title}
	</h2>

	<!-- Right Wave -->
	<svg
		width="60"
		height="24"
		viewBox="0 0 60 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="text-foreground opacity-60"
		aria-hidden="true"
	>
		<path
			d="M3 12C3 12 12 4 21 12C30 20 39 12 48 12C57 12 57 12 57 12"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>
