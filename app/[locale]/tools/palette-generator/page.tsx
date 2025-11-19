import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PaletteGeneratorClient } from './PaletteGeneratorClient'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

/**
 * Generate metadata for Palette Generator page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.paletteGenerator' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.paletteGenerator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale,
		path: '/tools/palette-generator',
		ogImage: 'og-palette-generator.jpg',
	})
}

/**
 * Palette Generator page
 * Server component that handles metadata and renders client component
 * Includes structured data for SEO
 */
export default async function PaletteGeneratorPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools.paletteGenerator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools/palette-generator`,
		features: [
			'Color palette generation',
			'Multiple harmony modes',
			'Export palettes',
			'Color format conversion',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<PaletteGeneratorClient />
		</>
	)
}


