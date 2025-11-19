/**
 * Sitemap Generation
 * 
 * Generates a dynamic sitemap for all pages and locales in the application.
 * This helps search engines discover and index all pages efficiently.
 * 
 * Features:
 * - Includes all locales (ru, en, de, es)
 * - All main routes (home, tools, learn)
 * - All tool pages
 * - All learn pages
 * - Proper priority and change frequency
 * - Hreflang alternates for multilingual pages
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

/**
 * Generate Sitemap
 * 
 * Creates a sitemap with all pages for all supported locales.
 * Each page includes:
 * - Full URL with locale prefix
 * - Last modified date
 * - Change frequency (weekly for most pages)
 * - Priority (1.0 for home, 0.8 for main sections, 0.6 for sub-pages)
 * - Hreflang alternates for all locales
 * 
 * @returns {MetadataRoute.Sitemap} Complete sitemap with all pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://pipetkaonline.ru'

	/**
	 * Main routes that exist for all locales
	 */
	const mainRoutes = [
		{ path: '', priority: 1.0, changeFrequency: 'daily' as const },
		{ path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
		{ path: '/learn', priority: 0.9, changeFrequency: 'weekly' as const },
		{ path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
		{ path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
		{ path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
		{ path: '/cookies', priority: 0.5, changeFrequency: 'yearly' as const },
		{ path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
	]

	/**
	 * Tool pages
	 */
	const toolRoutes = [
		'/tools/color-converter',
		'/tools/palette-generator',
		'/tools/contrast-checker',
		'/tools/color-harmony',
		'/tools/gradient-generator',
		'/tools/color-lab',
		'/tools/ui-tokens-generator',
		'/tools/extract-colors-v2',
		'/tools/color-name-finder',
		'/tools/brand-color-analyzer',
		'/tools/ui-theme-generator',
		'/tools/text-image-accessibility',
		'/tools/gradient-map-generator',
		'/tools/emotion-colors',
		'/tools/solid-background',
		'/tools/pattern-generator',
		'/tools/color-blindness-simulator',
	]

	/**
	 * Learn section routes
	 */
	const learnRoutes = [
		// Formats
		'/learn/formats',
		'/learn/formats/hex',
		'/learn/formats/rgb',
		'/learn/formats/hsl',
		'/learn/formats/css',
		// Fundamentals
		'/learn/fundamentals',
		'/learn/fundamentals/color-wheel',
		'/learn/fundamentals/rgb-cmyk',
		'/learn/fundamentals/warm-cool-colors',
		'/learn/fundamentals/saturation-brightness',
		// Harmony
		'/learn/harmony',
		'/learn/harmony/complementary',
		'/learn/harmony/analogous',
		'/learn/harmony/triadic',
		'/learn/harmony/split-complementary',
		// Psychology
		'/learn/psychology',
		'/learn/psychology/branding',
		'/learn/psychology/emotions',
		'/learn/psychology/marketing',
		'/learn/psychology/cultural',
		// Accessibility
		'/learn/accessibility',
		'/learn/accessibility/wcag',
		'/learn/accessibility/color-blindness',
		'/learn/accessibility/readability',
		'/learn/accessibility/alternatives',
	]

	/**
	 * Generate sitemap entries for all routes and locales
	 */
	const entries: MetadataRoute.Sitemap = []

	// Process all routes for all locales
	const allRoutes = [
		...mainRoutes,
		...toolRoutes.map(path => ({ path, priority: 0.8, changeFrequency: 'weekly' as const })),
		...learnRoutes.map(path => ({ path, priority: 0.7, changeFrequency: 'monthly' as const })),
	]

	locales.forEach((locale) => {
		allRoutes.forEach((route) => {
			const url = `${baseUrl}/${locale}${route.path}`

			// Create hreflang alternates
			const languages: Record<string, string> = {}
			locales.forEach((altLocale) => {
				languages[altLocale] = `${baseUrl}/${altLocale}${route.path}`
			})

			entries.push({
				url,
				lastModified: new Date(),
				changeFrequency: route.changeFrequency,
				priority: route.priority,
				alternates: {
					languages,
				},
			})
		})
	})

	return entries
}


