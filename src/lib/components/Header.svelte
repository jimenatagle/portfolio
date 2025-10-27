<script>
	import { siteConfig } from '$lib/config';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
>
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
		<!-- Logo/Brand -->
		<a href="#hero" class="text-xl font-bold text-foreground" onclick={closeMenu}>
			{siteConfig.name}
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-8 md:flex">
			{#each siteConfig.nav as item}
				<a
					href={item.href}
					class="text-muted-foreground transition-colors hover:text-foreground"
				>
					{item.name}
				</a>
			{/each}

			<ThemeToggle />
		</div>

		<!-- Mobile Menu Button -->
		<div class="flex items-center gap-2 md:hidden">
			<ThemeToggle />
			<button
				onclick={toggleMenu}
				aria-label="Toggle menu"
				class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
			>
				{#if isMenuOpen}
					<!-- Close icon -->
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<!-- Menu icon -->
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-t border-border bg-background md:hidden">
			<div class="space-y-1 px-4 py-4">
				{#each siteConfig.nav as item}
					<a
						href={item.href}
						onclick={closeMenu}
						class="block rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted"
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>

<!-- Spacer to prevent content from going under fixed header -->
<div class="h-[73px]"></div>
