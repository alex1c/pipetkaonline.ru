import { generatePageMetadata } from '@/lib/metadata-utils'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { RGBCMYKPageClient } from './rgb-cmyk-client'

/**
 * Generate metadata for RGB-CMYK page
 * This enables static rendering by calling setRequestLocale
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.fundamentals.rgbCmyk' })
	return {
		...generatePageMetadata({ title: t('title'), description: t('description'), locale: resolvedParams.locale, path: '/learn/fundamentals/rgb-cmyk' }), title: t('title'), description: t('description') }
}

/**
 * RGB vs CMYK page
 * Server component wrapper for client component
 */
export default async function RGBCMYKPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <RGBCMYKPageClient />
}
