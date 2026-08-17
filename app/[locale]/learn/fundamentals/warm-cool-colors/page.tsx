import { generatePageMetadata } from '@/lib/metadata-utils'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { WarmCoolColorsPageClient } from './warm-cool-colors-client'

/**
 * Generate metadata for Warm-Cool Colors page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'learn.fundamentals.warmCool' })
	return {
		...generatePageMetadata({ title: t('title'), description: t('description'), locale: resolvedParams.locale, path: '/learn/fundamentals/warm-cool-colors' }), title: t('title'), description: t('description') }
}

/**
 * Warm and Cool Colors page
 * Server component wrapper for client component
 */
export default async function WarmCoolColorsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <WarmCoolColorsPageClient />
}
