/**
 * Solid Background Generator Client Component
 * 
 * Main client component for the Solid Background Generator tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useSolidBackground } from '@/hooks/useSolidBackground'
import { ColorPicker } from '@/components/solid-background/ColorPicker'
import { PreviewGrid } from '@/components/solid-background/PreviewGrid'
import { DownloadPanel } from '@/components/solid-background/DownloadPanel'
import { PresetsPanel } from '@/components/solid-background/PresetsPanel'
import { HistoryPanel } from '@/components/solid-background/HistoryPanel'
import { TechnicalInfo } from '@/components/solid-background/TechnicalInfo'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Solid Background Generator Client Component
 * 
 * Main component that brings together all functionality:
 * - Color selection
 * - Preview in different sizes
 * - Download functionality
 * - Presets and history
 * - Technical information
 * 
 * @returns {JSX.Element} Complete solid background generator tool
 */
export function SolidBackgroundClient() {
	const t = useTranslations('tools.solidBackground')

	const {
		selectedColor,
		history,
		sizes,
		colorFormats,
		contrast,
		handleColorChange,
		copyColor,
		downloadBackground,
	} = useSolidBackground()

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

			{/* Main Preview */}
			<section
				className='w-full rounded-2xl shadow-lg min-h-[400px] flex items-center justify-center'
				style={{ backgroundColor: selectedColor }}
			>
				<div className='text-center space-y-4'>
					<div
						className='w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto'
						style={{ backgroundColor: selectedColor }}
					/>
					<code className='block text-2xl font-mono text-white drop-shadow-lg'>
						{selectedColor}
					</code>
				</div>
			</section>

			{/* Color Picker */}
			<section className='bg-white rounded-2xl shadow-md p-8'>
				<ColorPicker color={selectedColor} onColorChange={handleColorChange} />
			</section>

			{/* Main Content Grid */}
			<div className='grid lg:grid-cols-2 gap-8'>
				{/* Left Column */}
				<div className='space-y-8'>
					{/* Preview Grid */}
					<section className='bg-white rounded-2xl shadow-md p-8'>
						<PreviewGrid color={selectedColor} sizes={sizes} />
					</section>

					{/* Download Panel */}
					<section>
						<DownloadPanel
							color={selectedColor}
							sizes={sizes}
							onDownload={downloadBackground}
						/>
					</section>
				</div>

				{/* Right Column */}
				<div className='space-y-8'>
					{/* Technical Info */}
					<section>
						<TechnicalInfo
							formats={colorFormats}
							contrast={contrast}
							onCopy={copyColor}
						/>
					</section>

					{/* Presets */}
					<section>
						<PresetsPanel onPresetSelect={handleColorChange} />
					</section>

					{/* History */}
					<section>
						<HistoryPanel history={history} onHistorySelect={handleColorChange} />
					</section>
				</div>
			</div>

			{/* SEO Content */}
			{/* Similar Tools */}
			<SimilarTools currentTool='solid-background' />

			<ServiceSEO namespace='tools.solidBackground.seo' />
		</div>
	)
}

