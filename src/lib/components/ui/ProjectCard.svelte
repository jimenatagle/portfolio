<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import { ThumbsUp } from '@lucide/svelte/icons';
	import { likesStore } from '$lib/stores/likes.svelte.js';
	import { getTagColor } from '$lib/config.js';
	import { onMount } from 'svelte';

	let { project } = $props();
	let open = $state(false);

	// Generate a unique ID for the project (using title as key)
	const projectId = project.title.toLowerCase().replace(/\s+/g, '-');

	// Check if user has already liked this project
	let hasLiked = $state(false);

	onMount(() => {
		// Fetch current like count
		likesStore.fetchLikes(projectId);
		// Check if user has already liked
		hasLiked = likesStore.hasUserLiked(projectId);
	});

	async function handleLike(event) {
		event.stopPropagation(); // Prevent opening the dialog
		if (hasLiked) return; // Prevent multiple likes

		try {
			await likesStore.incrementLikes(projectId);
			likesStore.markAsLiked(projectId);
			hasLiked = true;
		} catch (error) {
			console.error('Failed to like project:', error);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<article
			class="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-[400px] flex flex-col"
		>
			{#if project.image}
				<div class="aspect-video w-full overflow-hidden bg-muted">
					<img
						src={project.image}
						alt={project.title}
						class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			{/if}

			<div class="relative p-6 pb-16">
				<h3 class="mb-4 text-2xl font-bold leading-tight text-card-foreground">
					{project.title}
				</h3>

				{#if project.tags && project.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each project.tags as tag}
							<span
								class="rounded-full px-3 py-1.5 text-xs font-medium {getTagColor(tag)} transition-colors"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}

				<!-- Thumbs Up Button -->
				<button
					onclick={handleLike}
					disabled={hasLiked}
					class="absolute bottom-5 right-5 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 {hasLiked
						? 'bg-primary/15 text-primary cursor-not-allowed'
						: 'bg-background border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 text-muted-foreground'}"
					title={hasLiked ? 'Already liked' : 'Like this project'}
				>
					<ThumbsUp class="h-4 w-4" fill={hasLiked ? 'currentColor' : 'none'} />
					<span class="font-semibold">{likesStore.getLikes(projectId)}</span>
				</button>
			</div>
		</article>
	</Dialog.Trigger>

	<Dialog.Content class="flex max-h-[90vh] min-w-[75vw] flex-col overflow-hidden p-0 gap-0">
		<Dialog.Header
			class="border-b border-border/50 bg-background px-8 pb-5 pt-6"
		>
			<Dialog.Title class="text-3xl font-bold">{project.title}</Dialog.Title>
		</Dialog.Header>

		<div class="max-h-full flex-1 overflow-y-auto px-6 py-6">
			<div class="space-y-6">
			<!-- Image and Goal Row -->
			<div class="flex flex-col gap-6 md:flex-row md:gap-8">
				{#if project.image}
					<div class="w-full shrink-0 md:w-5/12">
						<div class="aspect-video w-full overflow-hidden rounded-xl border border-border/20">
							<img src={project.image} alt={project.title} class="h-full w-full object-contain" />
						</div>
					</div>
				{/if}

				{#if project.details?.goal}
					<div class="flex-1">
						<h4 class="mb-3 text-lg font-semibold text-foreground/90">Goal</h4>
						<p class="text-lg leading-relaxed text-muted-foreground">{project.details.goal}</p>
					</div>
				{/if}
			</div>

			{#if project.details?.challenges && project.details.challenges.length > 0}
				<div class="border-l-2 border-primary/30 pl-6 py-4">
					<h4 class="mb-4 text-lg font-semibold text-foreground/90">Challenges</h4>
					<ul class="space-y-3 pl-5 text-muted-foreground">
						{#each project.details.challenges as challenge}
							<li class="relative pl-2 before:absolute before:left-[-1rem] before:content-['•'] before:text-primary before:font-bold">
								{challenge}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if project.details?.approach && project.details.approach.length > 0}
				<div class="border-l-2 border-primary/30 pl-6 py-4">
					<h4 class="mb-4 text-lg font-semibold text-foreground/90">Approach</h4>
					<ul class="space-y-3 pl-5 text-muted-foreground">
						{#each project.details.approach as item}
							<li class="relative pl-2 before:absolute before:left-[-1rem] before:content-['•'] before:text-primary before:font-bold">
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if project.details?.results && project.details.results.length > 0}
				<div class="border-l-2 border-primary/30 pl-6 py-4">
					<h4 class="mb-4 text-lg font-semibold text-foreground/90">Results</h4>
					<ul class="space-y-3 pl-5 text-muted-foreground">
						{#each project.details.results as result}
							<li class="relative pl-2 before:absolute before:left-[-1rem] before:content-['•'] before:text-primary before:font-bold">
								{result}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			</div>
		</div>

		<Dialog.Footer class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border/50 bg-background/95 backdrop-blur-sm px-6 py-5">
			<!-- Technology Tags - Left on desktop, top on mobile -->
			{#if project.tags && project.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each project.tags as tag}
						<span
							class="rounded-full px-3 py-1.5 text-xs font-medium {getTagColor(tag)} transition-colors"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Action Buttons + Like - Right on desktop, bottom on mobile -->
			<div class="flex flex-col sm:flex-row gap-3 sm:items-center">
				{#if project.link}
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
						onclick={(e) => e.stopPropagation()}
					>
						View Project
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				{/if}

				{#if project.github}
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:border-foreground/20"
						onclick={(e) => e.stopPropagation()}
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
						GitHub
					</a>
				{/if}

				<!-- Thumbs Up Button -->
				<button
					onclick={handleLike}
					disabled={hasLiked}
					class="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 {hasLiked
						? 'bg-primary/15 text-primary cursor-not-allowed'
						: 'bg-background border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 text-muted-foreground'}"
					title={hasLiked ? 'Already liked' : 'Like this project'}
				>
					<ThumbsUp class="h-4 w-4" fill={hasLiked ? 'currentColor' : 'none'} />
					<span class="font-semibold">{likesStore.getLikes(projectId)}</span>
				</button>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
