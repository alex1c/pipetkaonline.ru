/**
 * UI Tokens Generator Page
 * 
 * Server component page for the UI Tokens Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/ui-tokens-generator/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { UITokensGeneratorClient } from './UITokensGeneratorClient'

/**
 * Generate metadata for UI Tokens Generator page
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
	const t = await getTranslations({ locale, namespace: 'tools.uiTokensGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.uiTokensGenerator.seo' })

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
 * UI Tokens Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function UITokensGeneratorPage() {
	return <UITokensGeneratorClient />
}

