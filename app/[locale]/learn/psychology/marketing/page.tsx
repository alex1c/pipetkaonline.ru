import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { MarketingPageClient } from './marketing-client'

/**
 * Generate metadata for Marketing page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.psychology.marketing' })
	return { title: t('title'), description: t('description') }
}

/**
 * Color in Marketing page
 * Server component wrapper for client component
 */
export default async function MarketingPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <MarketingPageClient />
}
