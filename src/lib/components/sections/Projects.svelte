<script>
	import { projects } from '$lib/stores/projects.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import PlaceholderCard from '$lib/components/ui/PlaceholderCard.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import * as Select from '$lib/components/ui/select';
	import { getTagColor } from '$lib/config.js';
	import * as Pagination from '$lib/components/ui/pagination';
	import { Filter, FilterX } from '@lucide/svelte/icons';
	import { onMount } from 'svelte';

	// State management
	let selectedTags = $state([]);
	let currentPage = $state(1);
	let itemsPerPage = $state(6); // Default to desktop

	// Get all unique tags from projects
	let allTags = $derived.by(() => {
		const tagSet = new Set();
		projects.forEach((project) => {
			project.tags?.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	});

	// Filter projects based on selected tags (OR logic)
	let filteredProjects = $derived.by(() => {
		if (!selectedTags || selectedTags.length === 0) {
			return projects;
		}
		return projects.filter((project) => project.tags?.some((tag) => selectedTags.includes(tag)));
	});

	// Calculate total pages
	let totalPages = $derived(Math.ceil(filteredProjects.length / itemsPerPage));

	// Get projects for current page
	let paginatedProjects = $derived.by(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredProjects.slice(startIndex, endIndex);
	});

	// Calculate placeholders needed to fill 2 rows
	let placeholdersNeeded = $derived.by(() => {
		const currentItems = paginatedProjects.length;
		if (currentItems === 0) return 0;
		if (currentItems >= itemsPerPage) return 0;
		return itemsPerPage - currentItems;
	});

	// Update items per page based on screen size
	function updateItemsPerPage() {
		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			if (width >= 1024) {
				// lg breakpoint
				itemsPerPage = 6; // 3 columns × 2 rows
			} else if (width >= 768) {
				// md breakpoint
				itemsPerPage = 4; // 2 columns × 2 rows
			} else {
				itemsPerPage = 2; // 1 column × 2 rows
			}
		}
	}

	// Reset to page 1 when filters change
	$effect(() => {
		selectedTags;
		currentPage = 1;
	});

	onMount(() => {
		updateItemsPerPage();
		window.addEventListener('resize', updateItemsPerPage);
		return () => {
			window.removeEventListener('resize', updateItemsPerPage);
		};
	});

	function clearFilters() {
		selectedTags = [];
	}
</script>

<section id="projects" class="px-4 py-20">
	<div class="mx-auto max-w-7xl md:px-18">
		<div class="mb-12 text-center">
			<SectionHeading title="Projects" />
		</div>

		{#if projects.length > 0}
			<!-- Filter Section -->
			<div class="mb-8 flex flex-row gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div
					class="flex flex-1 flex-row-reverse items-center justify-end gap-3 md:ml-auto md:flex-0"
				>
					{#if selectedTags.length > 0}
						<button
							onclick={clearFilters}
							class="cursor-pointer text-destructive/40 transition-colors hover:text-destructive min-h-5 min-w-5"
							title="Clear all filters"
						>
							<FilterX class="h-5 w-5" />
						</button>
					{:else}
						<Filter class="h-5 w-5 min-h-5 min-w-5 text-muted-foreground" />
					{/if}
					<Select.Root type="multiple" bind:value={selectedTags}>
						<Select.Trigger
							class="h-input rounded-9px border-border-input data-placeholder:text-foreground-alt/50 inline-flex w-full flex-grow touch-none items-center border bg-background px-[11px] text-sm transition-all duration-200 hover:border-ring  hover:shadow-md hover:scale-[1.01] select-none sm:w-64 md:w-72 lg:w-80 xl:w-96"
							aria-label="Select a tag to filter projects"
						>
							{#if selectedTags.length > 0}
								<div class="flex items-center gap-1.5 overflow-hidden">
									{#each selectedTags.slice(0, 2) as tag}
										<span class="rounded-full px-2.5 py-0.5 text-xs font-medium {getTagColor(tag)}">
											{tag}
										</span>
									{/each}
									{#if selectedTags.length > 2}
										<span class="text-xs text-muted-foreground"
											>+{selectedTags.length - 2} more</span
										>
									{/if}
								</div>
							{:else}
								<span class="text-muted-foreground">Filter by tags...</span>
							{/if}
						</Select.Trigger>
						<Select.Content>
							{#each allTags as tag}
								<Select.Item value={tag}>
									{tag}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<!-- Projects Grid -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each paginatedProjects as project (project.title)}
					<ProjectCard {project} />
				{/each}
				{#each Array(placeholdersNeeded) as _}
					<PlaceholderCard />
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="mt-12 flex justify-center">
					<Pagination.Root
						count={filteredProjects.length}
						perPage={itemsPerPage}
						bind:page={currentPage}
					>
						{#snippet children({ pages, currentPage })}
							<Pagination.Content>
								<Pagination.Item>
									<Pagination.PrevButton />
								</Pagination.Item>
								{#each pages as page (page.key)}
									{#if page.type === 'ellipsis'}
										<Pagination.Item>
											<Pagination.Ellipsis />
										</Pagination.Item>
									{:else}
										<Pagination.Item>
											<Pagination.Link {page} isActive={currentPage === page.value}>
												{page.value}
											</Pagination.Link>
										</Pagination.Item>
									{/if}
								{/each}
								<Pagination.Item>
									<Pagination.NextButton />
								</Pagination.Item>
							</Pagination.Content>
						{/snippet}
					</Pagination.Root>
				</div>
			{/if}
		{:else}
			<div class="rounded-lg border-2 border-dashed border-border p-12 text-center">
				<p class="text-muted-foreground">
					No projects yet. Add your projects in <code class="rounded px-2 py-1 text-sm"
						>src/lib/stores/projects.svelte.js</code
					>
				</p>
			</div>
		{/if}
	</div>
</section>
