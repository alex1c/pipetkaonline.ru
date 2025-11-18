import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorConverterClient } from './ColorConverterClient'

/**
 * Generate metadata for Color Converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.colorConverter' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorConverter.seo' })

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
 * Color Converter page
 * Server component that handles metadata and renders client component
 */
export default function ColorConverterPage() {
	return <ColorConverterClient />
}

