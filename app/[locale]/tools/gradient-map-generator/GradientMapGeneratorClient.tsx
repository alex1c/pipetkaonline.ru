/**
 * Gradient Map Generator Client Component
 * 
 * Main client component for the Gradient Map Generator tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useGradientMapGenerator } from '@/hooks/useGradientMapGenerator'
import { ImageUploader } from '@/components/gradient-map-generator/ImageUploader'
import { PreviewPane } from '@/components/gradient-map-generator/PreviewPane'
import { GradientEditor } from '@/components/gradient-map-generator/GradientEditor'
import { ControlsPanel } from '@/components/gradient-map-generator/ControlsPanel'
import { ExportPanel } from '@/components/gradient-map-generator/ExportPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Gradient Map Generator Client Component
 * 
 * Main component that brings together all functionality:
 * - Image upload
 * - Gradient editor
 * - Real-time preview
 * - Export functionality
 * 
 * @returns {JSX.Element} Complete gradient map generator tool
 */
export function GradientMapGeneratorClient() {
	const t = useTranslations('tools.gradientMapGenerator')

	const {
		imageUrl,
		imageData,
		processedImageData,
		previewMode,
		splitPosition,
		gradientStops,
		intensity,
		blendMode,
		useLAB,
		inputCanvasRef,
		outputCanvasRef,
		handleImageUpload,
		setPreviewMode,
		setSplitPosition,
		addGradientStop,
		removeGradientStop,
		updateGradientStop,
		setIntensity,
		setBlendMode,
		setUseLAB,
		applyPreset,
		exportImage,
		exportPreset,
		copyCSSGradient,
	} = useGradientMapGenerator()

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
					{/* Left Column: Preview */}
					<div className='space-y-6'>
						<section className='bg-white rounded-xl shadow-md p-8'>
							<h2 className='text-xl font-semibold text-slate-900 mb-4'>Preview</h2>
							<PreviewPane
								inputCanvasRef={inputCanvasRef}
								outputCanvasRef={outputCanvasRef}
								imageUrl={imageUrl}
								imageData={imageData}
								processedImageData={processedImageData}
								previewMode={previewMode}
								splitPosition={splitPosition}
								onPreviewModeChange={setPreviewMode}
								onSplitPositionChange={setSplitPosition}
							/>
						</section>
					</div>

					{/* Right Column: Controls */}
					<div className='space-y-6'>
						{/* Gradient Editor */}
						<section className='bg-white rounded-xl shadow-md p-8'>
							<h2 className='text-xl font-semibold text-slate-900 mb-4'>
								{t('gradientEditor.title')}
							</h2>
							<GradientEditor
								stops={gradientStops}
								onAddStop={addGradientStop}
								onRemoveStop={removeGradientStop}
								onUpdateStop={updateGradientStop}
								onApplyPreset={applyPreset}
							/>
						</section>

						{/* Controls */}
						<section>
							<ControlsPanel
								intensity={intensity}
								blendMode={blendMode}
								useLAB={useLAB}
								onIntensityChange={setIntensity}
								onBlendModeChange={setBlendMode}
								onUseLABChange={setUseLAB}
							/>
						</section>

						{/* Export */}
						{processedImageData && (
							<section>
								<ExportPanel
									onExportImage={exportImage}
									onExportPreset={exportPreset}
									onCopyCSS={copyCSSGradient}
								/>
							</section>
						)}
					</div>
				</div>
			)}

			{/* Preview Mode Toggle (outside preview pane for better UX) */}
			{imageUrl && (
				<div className='flex justify-center gap-2'>
					{(['before', 'after', 'split'] as const).map((mode) => (
						<button
							key={mode}
							onClick={() => setPreviewMode(mode)}
							className={`
								px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
								${
									previewMode === mode
										? 'bg-blue-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{mode === 'split' ? t('preview.splitView') : t(`preview.${mode}`)}
						</button>
					))}
				</div>
			)}

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='gradient-map-generator' />

			<ServiceSEO namespace='tools.gradientMapGenerator.seo' />
		</div>
	)
}

