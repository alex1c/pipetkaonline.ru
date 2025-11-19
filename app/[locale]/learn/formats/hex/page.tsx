import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { HEXPageClient } from './hex-client'

/**
 * Generate metadata for HEX page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.formats.hex' })
	return { title: t('title'), description: t('description') }
}

/**
 * HEX Color Codes page
 * Server component wrapper for client component
 */
export default async function HEXPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <HEXPageClient />
}
