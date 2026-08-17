import { generatePageMetadata } from '@/lib/metadata-utils'
/**
 * Gradient Map Generator Page
 * 
 * Server component page for the Gradient Map Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/gradient-map-generator/page
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { GradientMapGeneratorDynamic } from './GradientMapGeneratorDynamic'
import { ToolServerIntro } from '@/components/tool-server-intro'
import type { Locale } from '@/i18n'

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
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.gradientMapGenerator' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.gradientMapGenerator.seo' })

	return {
		...generatePageMetadata({ title: t('title'), description: t('subtitle'), locale: resolvedParams.locale, path: '/tools/gradient-map-generator' }),
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
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<JSX.Element>} Page component
 */
export default async function GradientMapGeneratorPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.gradientMapGenerator' })
	return <div className='space-y-12'><ToolServerIntro title={t('title')} description={t('subtitle')} locale={resolvedParams.locale as Locale} /><GradientMapGeneratorDynamic /></div>
}

