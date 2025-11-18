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

/**
 * Generate metadata for Brand Color Analyzer page
 * 
 * Creates dynamic metadata based on translations for SEO.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Metadata object
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.brandColorAnalyzer' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.brandColorAnalyzer.seo' })

	return {
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		openGraph: {
			title: t('title'),
			description: t('subtitle'),
		},
	}
}

/**
 * Brand Color Analyzer Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function BrandColorAnalyzerPage() {
	return <BrandColorAnalyzerClient />
}

