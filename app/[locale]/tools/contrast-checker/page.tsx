import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ContrastCheckerClient } from './ContrastCheckerClient'

/**
 * Generate metadata for Contrast Checker page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.contrastChecker' })
	const tSEO = await getTranslations({
		locale,
		namespace: 'tools.contrastChecker.seo',
	})

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
 * Contrast Checker page component
 * Server component that wraps the client component
 */
export default function ContrastCheckerPage() {
	return <ContrastCheckerClient />
}


