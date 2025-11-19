import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { AnalogousPageClient } from './analogous-client'

/**
 * Generate metadata for Analogous page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.harmony.analogous' })
	return { title: t('title'), description: t('description') }
}

/**
 * Analogous Colors page
 * Server component wrapper for client component
 */
export default async function AnalogousPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <AnalogousPageClient />
}
