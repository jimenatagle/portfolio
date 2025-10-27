<script>
	import { siteConfig } from '$lib/config';

	let {
		title = siteConfig.title,
		description = siteConfig.description,
		url = siteConfig.url,
		ogImage = siteConfig.ogImage,
		type = 'website'
	} = $props();

	// Construct full URLs
	const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
	const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullOgImage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={fullUrl} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={fullOgImage} />

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />
</svelte:head>
