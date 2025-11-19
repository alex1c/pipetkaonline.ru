import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generateToolMetadata } from '@/lib/metadata-utils'
import { generateSoftwareApplicationSchema } from '@/lib/seo-utils'

// Dynamic import for heavy component with canvas and image processing
// ssr: false because it uses browser APIs (canvas, FileReader)
const ColorLabClient = dynamic(() => import('./ColorLabClient').then(mod => ({ default: mod.ColorLabClient })), {
	loading: () => (
		<div className='flex items-center justify-center min-h-[400px]'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
				<p className='text-slate-600'>Loading Color Lab...</p>
			</div>
		</div>
	),
	ssr: false,
})

/**
 * Generate metadata for Color Lab page
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorLab' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.colorLab.seo' })

	return generateToolMetadata({
		title: t('title'),
		description: t('description'),
		keywords: tSEO('keywords'),
		locale: resolvedParams.locale,
		path: '/tools/color-lab',
		ogImage: 'og-color-lab.jpg',
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
	params: Promise<{ locale: string }> | { locale: string }
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
			<ColorLabClient />
		</>
	)
}

