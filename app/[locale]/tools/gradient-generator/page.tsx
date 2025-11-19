import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { GradientGeneratorClient } from './GradientGeneratorClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Gradient Generator page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.gradientGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.gradientGenerator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/gradient-generator',
		ogImage: 'og-gradient-generator.jpg',
	})
}

/**
 * Gradient Generator page
 * Server component that handles metadata and renders client component
 * Includes structured data for SEO
 */
export default async function GradientGeneratorPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.gradientGenerator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools/gradient-generator`,
		features: [
			'CSS gradient generation',
			'Multiple gradient types',
			'Color stop editor',
			'Export to CSS',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<GradientGeneratorClient />
		</>
	)
}


