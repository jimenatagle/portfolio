<script>
	import { projects } from '$lib/stores/projects.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
</script>

<section id="projects" class="px-4 py-20">
	<div class="mx-auto max-w-7xl md:px-18">
		<div class="mb-12 text-center">
			<SectionHeading title="Projects" />
		</div>

		{#if projects.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<div class="rounded-lg border-2 border-dashed border-border p-12 text-center">
				<p class="text-muted-foreground">
					No projects yet. Add your projects in <code class="rounded px-2 py-1 text-sm">src/lib/stores/projects.svelte.js</code>
				</p>
			</div>
		{/if}
	</div>
</section>
