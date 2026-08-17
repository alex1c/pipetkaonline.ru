import { generatePageMetadata } from '@/lib/metadata-utils'
/**
 * Text-on-Image Accessibility Checker Page
 * 
 * Server component page for the Text-on-Image Accessibility Checker tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/text-image-accessibility/page
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { TextImageAccessibilityDynamic } from './TextImageAccessibilityDynamic'
import { ToolServerIntro } from '@/components/tool-server-intro'
import type { Locale } from '@/i18n'

/**
 * Generate metadata for Text-on-Image Accessibility Checker page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.textImageAccessibility' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.textImageAccessibility.seo' })

	return {
		...generatePageMetadata({ title: t('title'), description: t('subtitle'), locale: resolvedParams.locale, path: '/tools/text-image-accessibility' }),
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
 * Text-on-Image Accessibility Checker Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default async function TextImageAccessibilityPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.textImageAccessibility' })
	return <div className='space-y-12'><ToolServerIntro title={t('title')} description={t('subtitle')} locale={resolvedParams.locale as Locale} /><TextImageAccessibilityDynamic /></div>
}

