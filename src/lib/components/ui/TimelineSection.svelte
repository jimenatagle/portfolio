<script>
	let { title, items, icon: Icon, isLast = false } = $props();
</script>

<div class="relative">
	<!-- Timeline connector line (if not last section) -->
	{#if !isLast}
		<div
			class="absolute left-3 top-12 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-primary/20 to-transparent"
		></div>
	{/if}

	<!-- Section content -->
	<div class="relative flex gap-6">
		<!-- Timeline node with icon -->
		<div
			class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-sm"
		>
			<Icon class="h-3.5 w-3.5 text-primary-foreground" />
		</div>

		<!-- Content area -->
		<div class="flex-1 pb-8">
			<h4 class="mb-4 text-base font-semibold text-foreground">{title}</h4>
			<ul class="space-y-2.5">
				{#each items as item}
					<li class="text-sm leading-relaxed text-muted-foreground">
						{item}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
