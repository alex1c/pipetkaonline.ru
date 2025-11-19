/**
 * Gradient Map Generator Page
 * 
 * Server component page for the Gradient Map Generator tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/gradient-map-generator/page
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import for heavy component with canvas and image processing
// ssr: false because it uses browser APIs (canvas, FileReader)
const GradientMapGeneratorClient = dynamic(() => import('./GradientMapGeneratorClient').then(mod => ({ default: mod.GradientMapGeneratorClient })), {
	loading: () => (
		<div className='flex items-center justify-center min-h-[400px]'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
				<p className='text-slate-600'>Loading Gradient Map Generator...</p>
			</div>
		</div>
	),
	ssr: false,
})

/**
 * Generate metadata for Gradient Map Generator page
 * 
 * Creates dynamic metadata based on translations for SEO.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Metadata object
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
	
	const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.gradientMapGenerator' })
	const tSEO = await getTranslations({ locale: resolvedParams.locale, namespace: 'tools.gradientMapGenerator.seo' })

	return {
		title: t('title'),
		description: t('subtitle'),
		keywords: tSEO('keywords'),
		openGraph: {
			title: t('title'),
			description: t('subtitle'),
		},
	}
}

/**
 * Gradient Map Generator Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<JSX.Element>} Page component
 */
export default async function GradientMapGeneratorPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	// Resolve params if it's a Promise
	const resolvedParams = await Promise.resolve(params)
	
	// Enable static rendering
	setRequestLocale(resolvedParams.locale)
	
	return <GradientMapGeneratorClient />
}

