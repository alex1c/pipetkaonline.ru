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

/**
 * Generate metadata for Color Name Finder page
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
	const t = await getTranslations({ locale, namespace: 'tools.colorNameFinder' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorNameFinder.seo' })

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
 * Color Name Finder Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function ColorNameFinderPage() {
	return <ColorNameFinderClient />
}

