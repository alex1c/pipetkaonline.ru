import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorBlindnessSimulatorClient } from './ColorBlindnessSimulatorClient'

/**
 * Generate metadata for Color Blindness Simulator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.colorBlindnessSimulator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorBlindnessSimulator.seo' })

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
 * Color Blindness Simulator page
 * Server component that handles metadata and renders client component
 */
export default function ColorBlindnessSimulatorPage() {
	return <ColorBlindnessSimulatorClient />
}


