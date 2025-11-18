import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorHarmonyClient } from './ColorHarmonyClient'

/**
 * Generate metadata for Color Harmony Finder page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.colorHarmony' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorHarmony.seo' })

	return {
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
		},
	}
}

/**
 * Color Harmony Finder page
 * Server component that handles metadata and renders client component
 */
export default function ColorHarmonyPage() {
	return <ColorHarmonyClient />
}


