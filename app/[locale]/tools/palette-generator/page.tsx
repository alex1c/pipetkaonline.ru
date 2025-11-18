import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PaletteGeneratorClient } from './PaletteGeneratorClient'

/**
 * Generate metadata for Palette Generator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.paletteGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.paletteGenerator.seo' })

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
 * Palette Generator page
 * Server component that handles metadata and renders client component
 */
export default function PaletteGeneratorPage() {
	return <PaletteGeneratorClient />
}


