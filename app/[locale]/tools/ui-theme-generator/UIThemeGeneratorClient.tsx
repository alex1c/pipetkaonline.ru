/**
 * UI Theme Generator Client Component
 * 
 * Main client component for the UI Theme Generator tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useUIThemeGenerator } from '@/hooks/useUIThemeGenerator'
import { ColorInput } from '@/components/ui-theme-generator/ColorInput'
import { ThemePreview } from '@/components/ui-theme-generator/ThemePreview'
import { TokenGrid } from '@/components/ui-theme-generator/TokenGrid'
import { ContrastPanel } from '@/components/ui-theme-generator/ContrastPanel'
import { ExportPanel } from '@/components/ui-theme-generator/ExportPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * UI Theme Generator Client Component
 * 
 * Main component that brings together all functionality:
 * - Color input (picker, manual, presets, image)
 * - Theme token generation
 * - Theme preview
 * - Contrast analysis
 * - Export functionality
 * 
 * @returns {JSX.Element} Complete UI theme generator tool
 */
export function UIThemeGeneratorClient() {
	const t = useTranslations('tools.uiThemeGenerator')

	const {
		baseColor,
		parsedBaseColor,
		mode,
		actualMode,
		tokens,
		contrastChecks,
		selectedPreset,
		isProcessing,
		themePresets,
		handleBaseColorChange,
		handlePresetSelect,
		handleImageUpload,
		setMode,
		exportCSS,
		exportTailwind,
		exportJSON,
		exportFigma,
	} = useUIThemeGenerator()

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

			{/* Color Input Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.input.title')}
				</h2>
				<ColorInput
					baseColor={parsedBaseColor}
					mode={mode}
					selectedPreset={selectedPreset}
					presets={themePresets}
					onColorChange={handleBaseColorChange}
					onModeChange={setMode}
					onPresetSelect={handlePresetSelect}
					onImageUpload={handleImageUpload}
					isProcessing={isProcessing}
				/>
			</section>

			{/* Theme Preview */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.preview.title')}
				</h2>
				<ThemePreview tokens={tokens} />
			</section>

			{/* Token Grid */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.tokens.title')}
				</h2>
				<TokenGrid tokens={tokens} />
			</section>

			{/* Contrast Panel */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.contrast.title')}
				</h2>
				<ContrastPanel contrastChecks={contrastChecks} />
			</section>

			{/* Export */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.export.title')}
				</h2>
				<ExportPanel
					exportCSS={exportCSS}
					exportTailwind={exportTailwind}
					exportJSON={exportJSON}
					exportFigma={exportFigma}
				/>
			</section>

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='ui-theme-generator' />

			<ServiceSEO namespace='tools.uiThemeGenerator.seo' />
		</div>
	)
}

