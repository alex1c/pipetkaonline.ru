/**
 * UI Theme Generator Page
 * 
 * Server component page for the UI Theme Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/ui-theme-generator/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { UIThemeGeneratorClient } from './UIThemeGeneratorClient'

/**
 * Generate metadata for UI Theme Generator page
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
	const t = await getTranslations({ locale, namespace: 'tools.uiThemeGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.uiThemeGenerator.seo' })

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
 * UI Theme Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function UIThemeGeneratorPage() {
	return <UIThemeGeneratorClient />
}

