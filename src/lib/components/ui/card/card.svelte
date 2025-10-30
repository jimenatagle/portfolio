<script>
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		"bg-primary/90 text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>