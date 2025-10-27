<script>
	import { siteConfig } from '$lib/config';
</script>

<section id="hero" class="min-h-screen/2 flex items-center justify-center px-4 py-20">
	<div class="mx-auto max-w-5xl">
		<!-- Wrapper with border and profile image -->
		<div class="relative rounded-2xl border-2 border-border bg-primary/90 p-8 md:p-12">
			<!-- Profile Image - positioned at the border -->
			<div
				class="absolute -top-16 left-1/2 -translate-x-1/2 md:top-8 md:top-12 md:-left-16 md:-left-20 md:translate-x-0"
			>
				<div
					class="h-32 w-32 overflow-hidden rounded-full border-4 border-border bg-muted md:h-40 md:w-40"
				>
					<img
						src={siteConfig.profileImage}
						alt={siteConfig.name}
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Intro Text -->
			<div class="md:ml-20 text-center md:text-left md:ml-28 mt-14 md:mt-0">
				<h1 class="text-foreground">
					<span class="text-4xl font-bold md:text-5xl lg:text-6xl">Welcome!<br /></span>
					<span class="ml-2 text-xl md:text-2xl"
						>I’m Jimena Tagle. Here is a selection of my recent projects</span
					>
				</h1>
			</div>

			<!-- Quick Facts About Me -->
			<h2 class="my-8 text-center text-2xl font-semibold text-foreground md:text-3xl">
				Quick facts about me
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Fact 1: Education -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img src="/images/profile/graduation-hat.svg" alt="Education" class="h-8 w-8" />
					</div>
					<p class="font-medium text-primary-foreground">Master student of at USI, Lugano</p>
				</div>

				<!-- Fact 2: Professional Experience -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img
							src="/images/profile/office-building.svg"
							alt="Professional experience"
							class="h-8 w-8"
						/>
					</div>
					<p class="font-medium text-primary-foreground">
						Professional experience in gaining measurable productivity gains
					</p>
				</div>

				<!-- Fact 3: Passion -->
				<div class="flex flex-col items-center gap-3 text-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
						<img src="/images/profile/talk.svg" alt="Passion" class="h-8 w-8" />
					</div>
					<p class="font-medium text-primary-foreground">
						Passionate about solving real world problems applying top techniques
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
