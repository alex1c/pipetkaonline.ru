import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ContrastCheckerClient } from './ContrastCheckerClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Contrast Checker page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
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

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/contrast-checker',
		ogImage: 'og-contrast-checker.jpg',
	})
}

/**
 * Contrast Checker page component
 * Server component that wraps the client component
 * Includes structured data for SEO
 */
export default async function ContrastCheckerPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.contrastChecker' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools/contrast-checker`,
		features: [
			'WCAG contrast checking',
			'AA/AAA compliance',
			'Real-time preview',
			'Accessibility recommendations',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<ContrastCheckerClient />
		</>
	)
}


