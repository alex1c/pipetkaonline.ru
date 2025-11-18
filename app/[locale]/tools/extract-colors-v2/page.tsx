/**
 * Extract Colors V2 Page
 * 
 * Server component page for the Extract Colors V2 tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/extract-colors-v2/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ExtractColorsV2Client } from './ExtractColorsV2Client'

/**
 * Generate metadata for Extract Colors V2 page
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
	const t = await getTranslations({ locale, namespace: 'tools.extractColorsV2' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.extractColorsV2.seo' })

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
 * Extract Colors V2 Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function ExtractColorsV2Page() {
	return <ExtractColorsV2Client />
}

