import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { RGBPageClient } from './rgb-client'

/**
 * Generate metadata for RGB page
 * This enables static rendering by calling setRequestLocale
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.formats.rgb' })
	return { title: t('title'), description: t('description') }
}

/**
 * RGB and RGBA page
 * Server component wrapper for client component
 */
export default async function RGBPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <RGBPageClient />
}
