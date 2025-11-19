/**
 * Color Name Finder Page
 * 
 * Server component page for the Color Name Finder tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/color-name-finder/page
 */

import { getTranslations } from 'next-intl/server'
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
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.colorNameFinder' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorNameFinder.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		locale,
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
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.colorNameFinder' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('subtitle'),
		url: `${baseUrl}/${params.locale}/tools/color-name-finder`,
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

