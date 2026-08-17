import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ColorLabDynamic } from './ColorLabDynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'
import { ToolServerIntro } from '@/components/tool-server-intro'
import type { Locale } from '@/i18n'

/**
 * Generate metadata for Color Lab page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorLab' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorLab.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/color-lab',
	})
}

/**
 * Color Lab page component
 * Server component that wraps the client component
 * Includes structured data for SEO
 */
export default async function ColorLabPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorLab' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = generateSoftwareApplicationSchema({
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${resolvedParams.locale}/tools/color-lab`,
		features: [
			'Color picker',
			'Image color extraction',
			'Dominant color detection',
			'Palette generation',
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
				<ColorLabDynamic />
			</div>
		</>
	)
}
