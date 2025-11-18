'use client'

import { useTranslations } from 'next-intl'
import { ImageUpload } from '@/components/color-blindness/ImageUpload'
import { SimulatorControls } from '@/components/color-blindness/SimulatorControls'
import { CanvasRenderer } from '@/components/color-blindness/CanvasRenderer'
import { useColorBlindness } from '@/hooks/useColorBlindness'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Client component for Color Blindness Simulator tool
 * Handles all interactive functionality
 */
export function ColorBlindnessSimulatorClient() {
	const t = useTranslations('tools.colorBlindnessSimulator')

	const {
		imageUrl,
		type,
		setType,
		splitView,
		setSplitView,
		compareMode,
		setCompareMode,
		loadImage,
		reset,
		applySimulation,
		downloadResult,
		canvasRef,
		originalCanvasRef,
	} = useColorBlindness()

	return (
		<div className='space-y-8'>
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Image Upload */}
			<ImageUpload onImageLoad={loadImage} imageUrl={imageUrl} />

			{/* Controls */}
			{imageUrl && (
				<SimulatorControls
					type={type}
					setType={setType}
					splitView={splitView}
					setSplitView={setSplitView}
					compareMode={compareMode}
					setCompareMode={setCompareMode}
				/>
			)}

			{/* Canvas Renderer */}
			{imageUrl && (
				<CanvasRenderer
					imageUrl={imageUrl}
					type={type}
					splitView={splitView}
					compareMode={compareMode}
					onSimulationApply={applySimulation}
					canvasRef={canvasRef}
					originalCanvasRef={originalCanvasRef}
				/>
			)}

			{/* Action Buttons */}
			{imageUrl && (
				<div className='flex flex-wrap gap-4 justify-center'>
					<button
						type='button'
						onClick={downloadResult}
						disabled={type === 'none'}
						className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-slate-300 disabled:cursor-not-allowed'
					>
						{t('actions.download')}
					</button>
					<button
						type='button'
						onClick={reset}
						className='px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium'
					>
						{t('actions.reset')}
					</button>
				</div>
			)}

			{/* Similar Tools */}
			<SimilarTools currentTool='color-blindness-simulator' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.colorBlindnessSimulator.seo' />
		</div>
	)
}


