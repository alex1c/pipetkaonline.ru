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
import dynamic from 'next/dynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

// Dynamic import for heavy component with image processing and K-means clustering
// ssr: false because it uses browser APIs (canvas, FileReader, Image)
const ExtractColorsV2Client = dynamic(() => import('./ExtractColorsV2Client').then(mod => ({ default: mod.ExtractColorsV2Client })), {
	loading: () => (
		<div className='flex items-center justify-center min-h-[400px]'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
				<p className='text-slate-600'>Loading Color Extractor...</p>
			</div>
		</div>
	),
	ssr: false,
})

/**
 * Generate metadata for Extract Colors V2 page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.extractColorsV2' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.extractColorsV2.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/extract-colors-v2',
		ogImage: 'og-extract-colors.jpg',
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
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.extractColorsV2' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools/extract-colors-v2`,
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
			<ExtractColorsV2Client />
		</>
	)
}

