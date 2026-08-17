import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorBlindnessSimulatorDynamic } from './ColorBlindnessSimulatorDynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'
import { ToolServerIntro } from '@/components/tool-server-intro'
import type { Locale } from '@/i18n'

/**
 * Generate metadata for Color Blindness Simulator page
 * 
 * Creates comprehensive SEO metadata including Open Graph, Twitter Cards,
 * canonical URLs, and hreflang alternates.
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorBlindnessSimulator' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorBlindnessSimulator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/color-blindness-simulator',
	})
}

/**
 * Color Blindness Simulator page
 * Server component that handles metadata and renders client component
 * Includes structured data for SEO
 */
export default async function ColorBlindnessSimulatorPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorBlindnessSimulator' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/color-blindness-simulator`,
		features: [
			'Color blindness simulation',
			'Multiple color vision types',
			'Image processing',
			'Accessibility testing',
		],
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<div className='space-y-8'>
				<ToolServerIntro title={t('title')} description={t('description')} locale={resolvedParams.locale as Locale} />
				<ColorBlindnessSimulatorDynamic />
			</div>
		</>
	)
}
