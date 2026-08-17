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
import { defaultLocale, locales } from '@/i18n'

export const SITE_URL = 'https://pipetkaonline.ru'
export const DEFAULT_OG_IMAGE = '/og-image.svg'

export function getAvailableLocales(path: string): readonly string[] {
	const segments = path.split('/').filter(Boolean)
	return segments[0] === 'learn' && segments.length >= 3 ? ['ru', 'en'] : locales
}

export function getLocalizedAlternates(locale: string, path: string) {
	const normalizedPath = path === '/' ? '' : path
	const availableLocales = getAvailableLocales(normalizedPath)
	return {
		canonical: `${SITE_URL}/${locale}${normalizedPath}`,
		languages: {
			...Object.fromEntries(availableLocales.map((supportedLocale) => [
				supportedLocale,
				`${SITE_URL}/${supportedLocale}${normalizedPath}`,
			])),
			'x-default': `${SITE_URL}/${defaultLocale}${normalizedPath}`,
		},
	}
}

export function generatePageMetadata({ title, description, locale, path, index = true }: {
	title: string
	description: string
	locale: string
	path: string
	index?: boolean
}): Metadata {
	const url = `${SITE_URL}/${locale}${path === '/' ? '' : path}`
	const shouldIndex = index && getAvailableLocales(path).includes(locale)
	return {
		title,
		description,
		robots: { index: shouldIndex, follow: shouldIndex },
		alternates: getLocalizedAlternates(locale, path),
		openGraph: { title, description, type: 'website', url, siteName: 'PipetkaOnline', images: [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE}`, width: 1200, height: 630, alt: title }] },
		twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`] },
	}
}

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
}: {
	title: string
	description: string
	keywords: string
	locale: string
	path: string
}): Metadata {
	const imagePath = DEFAULT_OG_IMAGE

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
			url: `${SITE_URL}/${locale}${path}`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${SITE_URL}${imagePath}`,
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
			images: [`${SITE_URL}${imagePath}`],
		},
		alternates: getLocalizedAlternates(locale, path),
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
 * 
 * @returns {Metadata} Complete metadata object
 */
export function generateLearnMetadata({
	title,
	description,
	keywords,
	locale,
	path,
}: {
	title: string
	description: string
	keywords: string
	locale: string
	path: string
}): Metadata {
	const imagePath = DEFAULT_OG_IMAGE

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
			url: `${SITE_URL}/${locale}${path}`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${SITE_URL}${imagePath}`,
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
			images: [`${SITE_URL}${imagePath}`],
		},
		alternates: getLocalizedAlternates(locale, path),
	}
}


