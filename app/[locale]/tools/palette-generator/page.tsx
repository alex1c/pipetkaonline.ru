import { getTranslations, setRequestLocale } from 'next-intl/server'
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
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.paletteGenerator' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.paletteGenerator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
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
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.paletteGenerator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/palette-generator`,
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


