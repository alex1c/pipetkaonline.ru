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
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for UI Theme Generator page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.uiThemeGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.uiThemeGenerator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/ui-theme-generator',
		ogImage: 'og-ui-theme.jpg',
	})
}

/**
 * UI Theme Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * Includes structured data for SEO.
 */
export default async function UIThemeGeneratorPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.uiThemeGenerator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('subtitle'),
		url: `${baseUrl}/${params.locale}/tools/ui-theme-generator`,
		features: [
			'Complete UI theme generation',
			'Primary and secondary colors',
			'Status colors',
			'Export to multiple formats',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<UIThemeGeneratorClient />
		</>
	)
}

