import { generatePageMetadata } from '@/lib/metadata-utils'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { AlternativesPageClient } from './alternatives-client'

/**
 * Generate metadata for Alternatives page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.accessibility.alternatives' })

	return {
		...generatePageMetadata({ title: t('title'), description: t('description'), locale: resolvedParams.locale, path: '/learn/accessibility/alternatives' }),
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Alternative Color Indicators page
 * Server component wrapper for client component
 */
export default async function AlternativesPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <AlternativesPageClient />
}
