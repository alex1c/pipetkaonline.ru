/**
 * Solid Background Generator Page
 * 
 * Server component page for the Solid Background Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/solid-background/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SolidBackgroundClient } from './SolidBackgroundClient'

/**
 * Generate metadata for Solid Background Generator page
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
	const t = await getTranslations({ locale, namespace: 'tools.solidBackground' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.solidBackground.seo' })

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
 * Solid Background Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function SolidBackgroundPage() {
	return <SolidBackgroundClient />
}

