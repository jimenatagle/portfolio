/**
 * Site-wide configuration and constants
 */

export const siteConfig = {
	// Site metadata
	name: 'Jimena Tagle',
	title: 'Jimena - Portfolio',
	description:
		'Portfolio showcasing my projects over my studies at USI.',
	url: 'https://jimena.github.com',
	ogImage: '/og-image.png',
	profileImage: '/images/profile/pic.png', // Path to profile image

	// Personal/Social links
	links: {
		email: 'jimenatagle@outlook.com',
		github: 'https://github.com/jimenatagle',
		linkedin: 'https://www.linkedin.com/in/jtaglem/',
		// More social links go here
	},

	// Navigation items
	nav: [
		{ name: 'Home', href: '#hero' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Contact', href: '#contact' }
	]
};
