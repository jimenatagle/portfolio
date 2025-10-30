import { base } from '$app/paths';

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
	ogImage: `${base}/og-image.png`,
	profileImage: `${base}/images/profile/pic.png`, // Path to profile image

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
		{ name: 'Projects', href: '#projects' }
	],

	// Tag color mappings (background and text colors for light/dark mode)
	tagColors: {
		// Current project tags
		'stochastic-methods': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
		'genetic-algorithm': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
		'evolutionary-computation': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
		'optimization': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
		'NoSQL': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
		'graph-database': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
		'neo4j': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
		'data-modeling': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
		'cypher': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
		'e-commerce': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',

		// Default fallback
		'default': 'bg-muted text-muted-foreground'
	}
};

/**
 * Get color classes for a tag
 * @param {string} tagName - The tag name
 * @returns {string} Tailwind color classes
 */
export function getTagColor(tagName) {
	return siteConfig.tagColors[tagName] || siteConfig.tagColors.default;
}
