/**
 * Extract Colors V2 Page
 * 
 * Server component page for the Extract Colors V2 tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/extract-colors-v2/page
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ExtractColorsV2Dynamic } from './ExtractColorsV2Dynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'
import { ToolServerIntro } from '@/components/tool-server-intro'
import type { Locale } from '@/i18n'

/**
 * Generate metadata for Extract Colors V2 page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.extractColorsV2' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.extractColorsV2.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/extract-colors-v2',
	})
}

/**
 * Extract Colors V2 Page
 * 
 * Server component that handles metadata and renders the client component.
 * Includes structured data for SEO.
 */
export default async function ExtractColorsV2Page({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.extractColorsV2' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/extract-colors-v2`,
		features: [
			'Color extraction from images',
			'K-means clustering',
			'Palette generation',
			'Color grouping',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<div className='space-y-12'>
				<ToolServerIntro title={t('title')} description={t('description')} locale={resolvedParams.locale as Locale} />
				<ExtractColorsV2Dynamic />
			</div>
		</>
	)
}
