import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { CulturalPageClient } from './cultural-client'

/**
 * Generate metadata for Cultural page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.psychology.cultural' })
	return { title: t('title'), description: t('description') }
}

/**
 * Cultural Color Meanings page
 * Server component wrapper for client component
 */
export default async function CulturalPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <CulturalPageClient />
}
