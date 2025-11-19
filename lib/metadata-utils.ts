/**
 * Metadata Utilities
 * 
 * Helper functions for generating comprehensive SEO metadata for pages.
 * Provides consistent metadata structure across all pages with Open Graph,
 * Twitter Cards, canonical URLs, and hreflang alternates.
 * 
 * @module lib/metadata-utils
 */

import type { Metadata } from 'next'

/**
 * Generate comprehensive metadata for tool pages
 * 
 * Creates complete SEO metadata including:
 * - Title and description
 * - Keywords
 * - Open Graph tags (full set)
 * - Twitter Card tags
 * - Canonical URL
 * - Hreflang alternates for all locales
 * 
 * @param {Object} params - Metadata parameters
 * @param {string} params.title - Page title
 * @param {string} params.description - Page description
 * @param {string} params.keywords - SEO keywords (comma-separated)
 * @param {string} params.locale - Current locale
 * @param {string} params.path - Page path (without locale, e.g., '/tools/color-converter')
 * @param {string} [params.ogImage] - Open Graph image path (default: og-tools.jpg)
 * 
 * @returns {Metadata} Complete metadata object
 * 
 * @example
 * generateToolMetadata({
 *   title: 'Color Converter',
 *   description: 'Convert colors between formats',
 *   keywords: 'color converter, hex, rgb, hsl',
 *   locale: 'ru',
 *   path: '/tools/color-converter',
 * })
 */
export function generateToolMetadata({
	title,
	description,
	keywords,
	locale,
	path,
	ogImage,
}: {
	title: string
	description: string
	keywords: string
	locale: string
	path: string
	ogImage?: string
}): Metadata {
	const baseUrl = 'https://pipetkaonline.ru'
	const locales = ['ru', 'en', 'de', 'es']
	const imagePath = ogImage || `og-${path.split('/').pop() || 'tools'}.jpg`

	return {
		title,
		description,
		keywords,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			title,
			description,
			type: 'website',
			url: `${baseUrl}/${locale}${path}`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/${imagePath}`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: locale,
			alternateLocale: locales.filter(l => l !== locale),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${baseUrl}/${imagePath}`],
		},
		alternates: {
			canonical: `${baseUrl}/${locale}${path}`,
			languages: {
				...Object.fromEntries(
					locales.map(l => [l, `${baseUrl}/${l}${path}`])
				),
				'x-default': `${baseUrl}/ru${path}`,
			},
		},
	}
}

/**
 * Generate comprehensive metadata for learn/article pages
 * 
 * Similar to generateToolMetadata but optimized for educational content.
 * 
 * @param {Object} params - Metadata parameters
 * @param {string} params.title - Page title
 * @param {string} params.description - Page description
 * @param {string} params.keywords - SEO keywords
 * @param {string} params.locale - Current locale
 * @param {string} params.path - Page path
 * @param {string} [params.ogImage] - Open Graph image path
 * 
 * @returns {Metadata} Complete metadata object
 */
export function generateLearnMetadata({
	title,
	description,
	keywords,
	locale,
	path,
	ogImage,
}: {
	title: string
	description: string
	keywords: string
	locale: string
	path: string
	ogImage?: string
}): Metadata {
	const baseUrl = 'https://pipetkaonline.ru'
	const locales = ['ru', 'en', 'de', 'es']
	const imagePath = ogImage || 'og-learn.jpg'

	return {
		title,
		description,
		keywords,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			title,
			description,
			type: 'article',
			url: `${baseUrl}/${locale}${path}`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/${imagePath}`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: locale,
			alternateLocale: locales.filter(l => l !== locale),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${baseUrl}/${imagePath}`],
		},
		alternates: {
			canonical: `${baseUrl}/${locale}${path}`,
			languages: {
				...Object.fromEntries(
					locales.map(l => [l, `${baseUrl}/${l}${path}`])
				),
				'x-default': `${baseUrl}/ru${path}`,
			},
		},
	}
}


