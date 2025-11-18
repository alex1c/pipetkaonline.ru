import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { GradientGeneratorClient } from './GradientGeneratorClient'

/**
 * Generate metadata for Gradient Generator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.gradientGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.gradientGenerator.seo' })

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
 * Gradient Generator page
 * Server component that handles metadata and renders client component
 */
export default function GradientGeneratorPage() {
	return <GradientGeneratorClient />
}


