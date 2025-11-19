import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

// Dynamic import for heavy component with canvas and image processing
// ssr: false because it uses browser APIs (canvas, FileReader, Image)
const ColorBlindnessSimulatorClient = dynamic(() => import('./ColorBlindnessSimulatorClient').then(mod => ({ default: mod.ColorBlindnessSimulatorClient })), {
	loading: () => (
		<div className='flex items-center justify-center min-h-[400px]'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
				<p className='text-slate-600'>Loading Color Blindness Simulator...</p>
			</div>
		</div>
	),
	ssr: false,
})

/**
 * Generate metadata for Color Blindness Simulator page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorBlindnessSimulator' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorBlindnessSimulator.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/color-blindness-simulator',
		ogImage: 'og-color-blindness.jpg',
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
	params: Promise<{ locale: string }> | { locale: string }
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
			<ColorBlindnessSimulatorClient />
		</>
	)
}


