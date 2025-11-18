/**
 * Emotion Colors Page
 * 
 * Server component page for the Emotion Colors tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/emotion-colors/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { EmotionColorsClient } from './EmotionColorsClient'

/**
 * Generate metadata for Emotion Colors page
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
	const t = await getTranslations({ locale, namespace: 'tools.emotionColors' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.emotionColors.seo' })

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
 * Emotion Colors Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function EmotionColorsPage() {
	return <EmotionColorsClient />
}

