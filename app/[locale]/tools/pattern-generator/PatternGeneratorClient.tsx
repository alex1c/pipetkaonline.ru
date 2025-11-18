/**
 * Pattern Generator Client Component
 * 
 * Main client component for the Pattern Generator tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { usePatternGenerator } from '@/hooks/usePatternGenerator'
import { PatternTypeSelector } from '@/components/pattern-generator/PatternTypeSelector'
import { PatternSettings } from '@/components/pattern-generator/PatternSettings'
import { PatternPreview } from '@/components/pattern-generator/PatternPreview'
import { ExportPanel } from '@/components/pattern-generator/ExportPanel'
import { PresetsPanel } from '@/components/pattern-generator/PresetsPanel'
import { HistoryPanel } from '@/components/pattern-generator/HistoryPanel'
import { TechnicalInfo } from '@/components/pattern-generator/TechnicalInfo'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Pattern Generator Client Component
 * 
 * Main component that brings together all functionality:
 * - Pattern type selection
 * - Settings configuration
 * - Large preview
 * - Export functionality
 * - Presets and history
 * - Technical information
 * 
 * @returns {JSX.Element} Complete pattern generator tool
 */
export function PatternGeneratorClient() {
	const t = useTranslations('tools.patternGenerator')

	const {
		canvasRef,
		settings,
		history,
		presets,
		fileSize,
		updateSettings,
		applyPreset,
		loadFromHistory,
		saveToHistory,
		downloadPattern,
		reset,
	} = usePatternGenerator()

	return (
		<div className='space-y-12'>
			{/* Header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl md:text-5xl font-bold text-slate-900'>
					{t('title')}
				</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Pattern Type Selector */}
			<section className='bg-white rounded-2xl shadow-md p-8'>
				<PatternTypeSelector
					selectedType={settings.type}
					onTypeChange={(type) => updateSettings({ type })}
				/>
			</section>

			{/* Main Content Grid */}
			<div className='grid lg:grid-cols-2 gap-8'>
				{/* Left Column - Settings */}
				<div className='space-y-6'>
					<PatternSettings settings={settings} onSettingsChange={updateSettings} />

					<div className='flex gap-3'>
						<button
							onClick={saveToHistory}
							className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
						>
							{t('save')}
						</button>
						<button
							onClick={reset}
							className='flex-1 px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium'
						>
							{t('reset')}
						</button>
					</div>

					<ExportPanel onDownload={downloadPattern} fileSize={fileSize} />

					<TechnicalInfo settings={settings} fileSize={fileSize} />
				</div>

				{/* Right Column - Preview */}
				<div className='space-y-6'>
					<PatternPreview settings={settings} canvasRef={canvasRef} />

					<PresetsPanel presets={presets} onPresetSelect={applyPreset} />

					<HistoryPanel history={history} onHistorySelect={loadFromHistory} />
				</div>
			</div>

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='pattern-generator' />

			<ServiceSEO namespace='tools.patternGenerator.seo' />
		</div>
	)
}

