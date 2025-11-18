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

/**
 * Generate metadata for Pattern Generator page
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
	const t = await getTranslations({ locale, namespace: 'tools.patternGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.patternGenerator.seo' })

	return {
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
		},
	}
}

/**
 * Pattern Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function PatternGeneratorPage() {
	return <PatternGeneratorClient />
}

