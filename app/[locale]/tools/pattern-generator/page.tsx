/**
 * Pattern Generator Page
 * 
 * Server component page for the Pattern Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/pattern-generator/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PatternGeneratorClient } from './PatternGeneratorClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Pattern Generator page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Complete metadata object
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.patternGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.patternGenerator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/pattern-generator',
		ogImage: 'og-pattern-generator.jpg',
	})
}

/**
 * Pattern Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * Includes structured data for SEO.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale
 * @returns {JSX.Element} Page component with structured data
 */
export default async function PatternGeneratorPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.patternGenerator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools/pattern-generator`,
		features: [
			'Pattern generation',
			'Multiple pattern types',
			'Customizable settings',
			'Export to PNG/JPG/WebP',
		],
	})

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<PatternGeneratorClient />
		</>
	)
}

