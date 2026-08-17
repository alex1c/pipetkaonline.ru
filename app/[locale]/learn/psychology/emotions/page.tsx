import { generatePageMetadata } from '@/lib/metadata-utils'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { EmotionsPageClient } from './emotions-client'

/**
 * Generate metadata for Emotions page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.psychology.emotions' })
	return {
		...generatePageMetadata({ title: t('title'), description: t('description'), locale: resolvedParams.locale, path: '/learn/psychology/emotions' }), title: t('title'), description: t('description') }
}

/**
 * Emotional Associations page
 * Server component wrapper for client component
 */
export default async function EmotionsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <EmotionsPageClient />
}
