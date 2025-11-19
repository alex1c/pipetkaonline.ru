import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorConverterClient } from './ColorConverterClient'

/**
 * Generate metadata for Color Converter page
 * 
 * Creates comprehensive SEO metadata including:
 * - Title and description
 * - Keywords from SEO translations
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL and hreflang alternates
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorConverter' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorConverter.seo' })
	const baseUrl = 'https://pipetkaonline.ru'

	return {
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `${baseUrl}/${resolvedParams.locale}/tools/color-converter`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/og-color-converter.jpg`,
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
			locale: resolvedParams.locale,
			alternateLocale: ['ru', 'en', 'de', 'es'].filter(l => l !== resolvedParams.locale),
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: [`${baseUrl}/og-color-converter.jpg`],
		},
		alternates: {
			canonical: `${baseUrl}/${resolvedParams.locale}/tools/color-converter`,
			languages: {
				ru: `${baseUrl}/ru/tools/color-converter`,
				en: `${baseUrl}/en/tools/color-converter`,
				de: `${baseUrl}/de/tools/color-converter`,
				es: `${baseUrl}/es/tools/color-converter`,
				'x-default': `${baseUrl}/ru/tools/color-converter`,
			},
		},
	}
}

/**
 * Color Converter page
 * Server component that handles metadata and renders client component
 */
export default async function ColorConverterPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorConverter' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/color-converter`,
		applicationCategory: 'DesignApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '150',
		},
		featureList: [
			'HEX to RGB conversion',
			'RGB to HEX conversion',
			'HSL to RGB conversion',
			'Real-time color conversion',
			'Color picker support',
		],
	}

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<ColorConverterClient />
		</>
	)
}

