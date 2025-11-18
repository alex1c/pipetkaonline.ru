'use client'

import { useTranslations } from 'next-intl'
import { GradientPreview } from '@/components/gradient/GradientPreview'
import { GradientControls } from '@/components/gradient/GradientControls'
import { GradientStop } from '@/components/gradient/GradientStop'
import { GradientHistory } from '@/components/gradient/GradientHistory'
import { GradientCode } from '@/components/gradient/GradientCode'
import { useGradientGenerator } from '@/hooks/useGradientGenerator'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Client component for Gradient Generator tool
 * Handles all interactive functionality
 */
export function GradientGeneratorClient() {
	const t = useTranslations('tools.gradientGenerator')

	const {
		type,
		setType,
		direction,
		setDirection,
		shape,
		setShape,
		stops,
		addStop,
		removeStop,
		updateStop,
		generateRandom,
		smoothDistribution,
		reverseGradient,
		generateCss,
		generateFullCss,
		generateTailwind,
		saveGradient,
		savedGradients,
		loadGradient,
		deleteSavedGradient,
	} = useGradientGenerator()

	return (
		<div className='space-y-8'>
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Preview */}
			<GradientPreview css={generateCss} />

			{/* Controls */}
			<GradientControls
				type={type}
				setType={setType}
				direction={direction}
				setDirection={setDirection}
				shape={shape}
				setShape={setShape}
				onRandom={generateRandom}
				onSmooth={smoothDistribution}
				onReverse={reverseGradient}
			/>

			{/* Gradient Stops */}
			<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-slate-900'>
						{t('stops.title')}
					</h3>
					<button
						type='button'
						onClick={addStop}
						className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium text-sm'
					>
						{t('stops.add')}
					</button>
				</div>

				<div className='space-y-4'>
					{stops.map((stop) => (
						<GradientStop
							key={stop.id}
							stop={stop}
							onUpdate={updateStop}
							onRemove={removeStop}
							canRemove={stops.length > 2}
						/>
					))}
				</div>
			</div>

			{/* Generated Code */}
			<GradientCode
				css={generateCss}
				fullCss={generateFullCss}
				tailwind={generateTailwind}
			/>

			{/* Save Button */}
			<div className='flex justify-center'>
				<button
					type='button'
					onClick={saveGradient}
					className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg'
				>
					{t('save')}
				</button>
			</div>

			{/* History */}
			<GradientHistory
				gradients={savedGradients}
				onLoad={loadGradient}
				onDelete={deleteSavedGradient}
			/>

			{/* Similar Tools */}
			<SimilarTools currentTool='gradient-generator' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.gradientGenerator.seo' />
		</div>
	)
}


