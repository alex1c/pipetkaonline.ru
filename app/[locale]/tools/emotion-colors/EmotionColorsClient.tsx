/**
 * Emotion Colors Client Component
 * 
 * Main client component for the Emotion Colors tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useEmotionColors } from '@/hooks/useEmotionColors'
import { EmotionPicker } from '@/components/emotion-picker/EmotionPicker'
import { PaletteCard } from '@/components/emotion-picker/PaletteCard'
import { OptionsPanel } from '@/components/emotion-picker/OptionsPanel'
import { ExportPanel } from '@/components/emotion-picker/ExportPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Emotion Colors Client Component
 * 
 * Main component that brings together all functionality:
 * - Emotion selection
 * - Palette generation
 * - Color display
 * - Export functionality
 * 
 * @returns {JSX.Element} Complete emotion colors tool
 */
export function EmotionColorsClient() {
	const t = useTranslations('tools.emotionColors')

	const {
		selectedEmotion,
		customEmotion,
		options,
		currentPalette,
		handleEmotionSelect,
		handleCustomEmotion,
		setOptions,
		generatePalette,
		generateVariation,
		getColorFormats,
		copyColor,
		exportJSON,
		exportCSS,
		saveToCollection,
	} = useEmotionColors()

	/**
	 * Handle generate button click
	 */
	const handleGenerate = () => {
		if (selectedEmotion || customEmotion.trim()) {
			generatePalette()
		}
	}

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

			{/* Emotion Picker */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<EmotionPicker
					selectedEmotion={selectedEmotion}
					customEmotion={customEmotion}
					onEmotionSelect={handleEmotionSelect}
					onCustomEmotionChange={handleCustomEmotion}
				/>
			</section>

			{/* Options Panel */}
			<section>
				<OptionsPanel options={options} onOptionsChange={setOptions} />
			</section>

			{/* Generate Button */}
			{(selectedEmotion || customEmotion.trim()) && (
				<div className='flex justify-center'>
					<button
						onClick={handleGenerate}
						className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-md'
					>
						{t('generatePalette')}
					</button>
				</div>
			)}

			{/* Palette Display */}
			{currentPalette && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='space-y-8'
				>
					{/* Key Colors */}
					<section>
						<h2 className='text-2xl font-semibold text-slate-900 mb-4'>
							{t('palette.keyColors')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							{currentPalette.keyColors.map((color, index) => (
								<motion.div
									key={`key-${index}`}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.1 }}
								>
									<PaletteCard
										color={getColorFormats(color)}
										label={t('palette.keyColor', { number: index + 1 })}
										onCopy={copyColor}
									/>
								</motion.div>
							))}
						</div>
					</section>

					{/* Secondary Colors */}
					<section>
						<h2 className='text-2xl font-semibold text-slate-900 mb-4'>
							{t('palette.secondary')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{currentPalette.secondary.map((color, index) => (
								<motion.div
									key={`secondary-${index}`}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: (currentPalette.keyColors.length + index) * 0.1 }}
								>
									<PaletteCard
										color={getColorFormats(color)}
										label={t('palette.secondaryColor', { number: index + 1 })}
										onCopy={copyColor}
									/>
								</motion.div>
							))}
						</div>
					</section>

					{/* Soft Colors */}
					<section>
						<h2 className='text-2xl font-semibold text-slate-900 mb-4'>
							{t('palette.softColors')}
						</h2>
						<div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
							{currentPalette.softColors.map((color, index) => (
								<motion.div
									key={`soft-${index}`}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										delay: (currentPalette.keyColors.length + currentPalette.secondary.length + index) * 0.05,
									}}
								>
									<PaletteCard
										color={getColorFormats(color)}
										label={t('palette.softColor', { number: index + 1 })}
										onCopy={copyColor}
									/>
								</motion.div>
							))}
						</div>
					</section>

					{/* Explanation */}
					<section className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('explanation.title')}
						</h3>
						<p className='text-blue-800'>{currentPalette.explanation}</p>
						<div className='mt-4 pt-4 border-t border-blue-200'>
							<p className='text-sm text-blue-700'>
								<strong>{t('explanation.textStyle')}:</strong> {currentPalette.textStyle}
							</p>
						</div>
					</section>

					{/* Actions */}
					<div className='flex flex-col md:flex-row gap-4'>
						<button
							onClick={generateVariation}
							className='flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium'
						>
							{t('generateVariation')}
						</button>
						<div className='flex-1'>
							<ExportPanel
								onExportJSON={exportJSON}
								onExportCSS={exportCSS}
								onSaveToCollection={saveToCollection}
							/>
						</div>
					</div>
				</motion.div>
			)}

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='emotion-colors' />

			<ServiceSEO namespace='tools.emotionColors.seo' />
		</div>
	)
}

