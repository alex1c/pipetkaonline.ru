/**
 * Gradient Map Generator Page
 * 
 * Server component page for the Gradient Map Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/gradient-map-generator/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { GradientMapGeneratorClient } from './GradientMapGeneratorClient'

/**
 * Generate metadata for Gradient Map Generator page
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
	const t = await getTranslations({ locale, namespace: 'tools.gradientMapGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.gradientMapGenerator.seo' })

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
 * Gradient Map Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function GradientMapGeneratorPage() {
	return <GradientMapGeneratorClient />
}

