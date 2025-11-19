/**
 * Brand Color Analyzer Page
 * 
 * Server component page for the Brand Color Analyzer tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/brand-color-analyzer/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { BrandColorAnalyzerClient } from './BrandColorAnalyzerClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Brand Color Analyzer page
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
	const t = await getTranslations({ locale, namespace: 'tools.brandColorAnalyzer' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.brandColorAnalyzer.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/brand-color-analyzer',
		ogImage: 'og-brand-analyzer.jpg',
	})
}

/**
 * Brand Color Analyzer Page
 * 
 * Server component that handles metadata and renders the client component.
 * Includes structured data for SEO.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale
 * @returns {JSX.Element} Page component with structured data
 */
export default async function BrandColorAnalyzerPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.brandColorAnalyzer' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('subtitle'),
		url: `${baseUrl}/${params.locale}/tools/brand-color-analyzer`,
		features: [
			'Brand color analysis',
			'Palette clustering',
			'Contrast checking',
			'WCAG compliance',
			'Color harmony detection',
		],
	})

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<BrandColorAnalyzerClient />
		</>
	)
}

