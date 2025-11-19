/**
 * Text-on-Image Accessibility Checker Page
 * 
 * Server component page for the Text-on-Image Accessibility Checker tool.
 * Handles metadata generation and renders the client component.
 * 
 * @module app/[locale]/tools/text-image-accessibility/page
 */

import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import for heavy component with canvas and image processing
// ssr: false because it uses browser APIs (canvas, FileReader, Image)
const TextImageAccessibilityClient = dynamic(() => import('./TextImageAccessibilityClient').then(mod => ({ default: mod.TextImageAccessibilityClient })), {
	loading: () => (
		<div className='flex items-center justify-center min-h-[400px]'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
				<p className='text-slate-600'>Loading Accessibility Checker...</p>
			</div>
		</div>
	),
	ssr: false,
})

/**
 * Generate metadata for Text-on-Image Accessibility Checker page
 * 
 * Creates dynamic metadata based on translations for SEO.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Metadata object
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools.textImageAccessibility' })
	const tSEO = await getTranslations({ locale, namespace: 'tools.textImageAccessibility.seo' })

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
 * Text-on-Image Accessibility Checker Page
 * 
 * Server component that handles metadata and renders the client component.
 * 
 * @returns {JSX.Element} Page component
 */
export default function TextImageAccessibilityPage() {
	return <TextImageAccessibilityClient />
}

