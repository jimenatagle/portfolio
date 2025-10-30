<script>
	import { siteConfig } from '$lib/config';
	import { base } from '$app/paths';
</script>

<section id="hero" class="min-h-screen/2 flex items-center justify-center px-4 py-20">
	<div class="w-full max-w-7xl md:px-18">
		<!-- Wrapper with border and profile image -->
		<div class="relative rounded-2xl bg-primary/90 dark:bg-secondary p-8 md:p-12">
			<!-- Profile Image - positioned at the border -->
			<div
				class="absolute -top-16 left-1/2 -translate-x-1/2 md:top-8 md:top-12 md:-left-16 md:-left-20 md:translate-x-0"
			>
				<div
					class="h-32 w-32 overflow-hidden rounded-full border-6 border-background bg-muted md:h-48 md:w-48"
				>
					<img
						src={siteConfig.profileImage}
						alt={siteConfig.name}
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Intro Text -->
			<div class="mt-14 text-center md:mt-0 w-full">
				<h1 class="text-foreground">
					<span class="text-4xl font-bold md:text-5xl lg:text-6xl text-(--popover-foreground)">Welcome!<br /></span>
					<span class="mx-auto text-xl md:text-2xl text-primary-foreground"
						>I’m Jimena Tagle. Here is a selection of my recent projects, but first:</span
					>
				</h1>
			</div>

			<!-- Quick Facts About Me -->
			<h2 class="my-8 text-center text-2xl font-semibold text-primary-foreground md:text-3xl">
				Quick facts about me
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Fact 1: Education -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img src="{base}/images/profile/graduation-hat.svg" alt="Education" class="h-12 w-12" />
					</div>
					<p class="font-medium text-primary-foreground">Master student of at USI, Lugano</p>
				</div>

				<!-- Fact 2: Professional Experience -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img
							src="{base}/images/profile/office-building.svg"
							alt="Professional experience"
							class="h-12 w-12"
						/>
					</div>
					<p class="font-medium text-primary-foreground">
						Professional experience in gaining measurable productivity gains
					</p>
				</div>

				<!-- Fact 3: Passion -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img src="{base}/images/profile/talk.svg" alt="Passion" class="h-12 w-12" />
					</div>
					<p class="font-medium text-primary-foreground">
						Passionate about solving real world problems applying top techniques
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
