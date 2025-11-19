/**
 * Color Name Finder Page
 * 
 * Server component page for the Color Name Finder tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/color-name-finder/page
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorNameFinderClient } from './ColorNameFinderClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Color Name Finder page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorNameFinder' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorNameFinder.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/color-name-finder',
		ogImage: 'og-color-name.jpg',
	})
}

/**
 * Color Name Finder Page
 * 
 * Server component that handles metadata and renders the client component.
 * Includes structured data for SEO.
 */
export default async function ColorNameFinderPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorNameFinder' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('subtitle'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/color-name-finder`,
		features: [
			'Color name detection',
			'Multiple naming systems',
			'Similar color matching',
			'Color descriptions',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<ColorNameFinderClient />
		</>
	)
}

