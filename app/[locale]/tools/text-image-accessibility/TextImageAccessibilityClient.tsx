/**
 * Text-on-Image Accessibility Checker Client Component
 * 
 * Main client component for the Text-on-Image Accessibility Checker tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useTextImageAccessibility } from '@/hooks/useTextImageAccessibility'
import { ImageUploader } from '@/components/text-image-accessibility/ImageUploader'
import { TextOverlayCanvas } from '@/components/text-image-accessibility/TextOverlayCanvas'
import { ControlsPanel } from '@/components/text-image-accessibility/ControlsPanel'
import { ResultsPanel } from '@/components/text-image-accessibility/ResultsPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Text-on-Image Accessibility Checker Client Component
 * 
 * Main component that brings together all functionality:
 * - Image upload
 * - Text overlay configuration
 * - Real-time contrast analysis
 * - Heatmap visualization
 * - WCAG compliance checking
 * 
 * @returns {JSX.Element} Complete text-on-image accessibility checker tool
 */
export function TextImageAccessibilityClient() {
	const t = useTranslations('tools.textImageAccessibility')

	const {
		imageUrl,
		imageData,
		textSettings,
		showHeatmap,
		canvasRef,
		analysisResult,
		handleImageUpload,
		updateTextSettings,
		setShowHeatmap,
		getTextPosition,
	} = useTextImageAccessibility()

	return (
		<div className='space-y-12'>
			{/* Header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl md:text-5xl font-bold text-slate-900'>
					{t('title')}
				</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('subtitle')}
				</p>
			</header>

			{/* Image Upload */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<ImageUploader onImageUpload={handleImageUpload} imageUrl={imageUrl} />
			</section>

			{/* Main Content Grid */}
			{imageUrl && (
				<div className='grid lg:grid-cols-2 gap-8'>
					{/* Left Column: Canvas Preview */}
					<div className='space-y-6'>
						<section className='bg-white rounded-xl shadow-md p-8'>
							<h2 className='text-xl font-semibold text-slate-900 mb-4'>Preview</h2>
							<TextOverlayCanvas
								canvasRef={canvasRef}
								imageUrl={imageUrl}
								imageData={imageData}
								textSettings={textSettings}
								showHeatmap={showHeatmap}
								getTextPosition={getTextPosition}
							/>
						</section>

						{/* Results */}
						<section>
							<ResultsPanel result={analysisResult} />
						</section>
					</div>

					{/* Right Column: Controls */}
					<div>
						<section className='bg-white rounded-xl shadow-md p-8'>
							<ControlsPanel
								textSettings={textSettings}
								onSettingsChange={updateTextSettings}
								showHeatmap={showHeatmap}
								onHeatmapToggle={setShowHeatmap}
							/>
						</section>
					</div>
				</div>
			)}

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='text-image-accessibility' />

			<ServiceSEO namespace='tools.textImageAccessibility.seo' />
		</div>
	)
}

