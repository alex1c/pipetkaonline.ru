import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorLabClient } from './ColorLabClient'

/**
 * Generate metadata for Color Lab page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.colorLab' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.colorLab.seo' })

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
 * Color Lab page component
 * Server component that wraps the client component
 */
export default function ColorLabPage() {
	return <ColorLabClient />
}

