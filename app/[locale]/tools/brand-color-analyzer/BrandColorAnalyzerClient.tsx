/**
 * Brand Color Analyzer Client Component
 * 
 * Main client component for the Brand Color Analyzer tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useBrandColorAnalyzer } from '@/hooks/useBrandColorAnalyzer'
import { InputSection } from '@/components/brand-analyzer/InputSection'
import { PaletteMap } from '@/components/brand-analyzer/PaletteMap'
import { PaletteProperties } from '@/components/brand-analyzer/PaletteProperties'
import { ContrastTable } from '@/components/brand-analyzer/ContrastTable'
import { DescriptionsComponent } from '@/components/brand-analyzer/Descriptions'
import { ExportPanel } from '@/components/brand-analyzer/ExportPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'

/**
 * Brand Color Analyzer Client Component
 * 
 * Main component that brings together all functionality:
 * - Color input (manual, image, predefined brands)
 * - Palette clustering and mapping
 * - Characteristics and harmony analysis
 * - Contrast and accessibility checking
 * - Description generation
 * - Export functionality
 * 
 * @returns {JSX.Element} Complete brand color analyzer tool
 */
export function BrandColorAnalyzerClient() {
	const t = useTranslations('tools.brandColorAnalyzer')

	const {
		colors,
		clusteredColors,
		characteristics,
		harmony,
		contrastAnalysis,
		descriptions,
		isProcessing,
		handleColorsChange,
		handleImageUpload,
		handleBrandSelect,
		regenerateDescriptions,
		exportJSON,
		exportCSS,
		predefinedBrands,
	} = useBrandColorAnalyzer()

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

			{/* Input Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.input.title')}
				</h2>
				<InputSection
					colors={colors}
					onColorsChange={handleColorsChange}
					onImageUpload={handleImageUpload}
					onBrandSelect={handleBrandSelect}
					predefinedBrands={predefinedBrands}
					isProcessing={isProcessing}
				/>
			</section>

			{/* Palette Map */}
			{clusteredColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.palette.title')}
					</h2>
					<PaletteMap colors={clusteredColors} />
				</section>
			)}

			{/* Palette Properties */}
			{clusteredColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.properties.title')}
					</h2>
					<PaletteProperties characteristics={characteristics} harmony={harmony} />
				</section>
			)}

			{/* Contrast Table */}
			{contrastAnalysis.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.contrast.title')}
					</h2>
					<ContrastTable contrastAnalysis={contrastAnalysis} />
				</section>
			)}

			{/* Descriptions */}
			{clusteredColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.descriptions.title')}
					</h2>
					<DescriptionsComponent
						descriptions={descriptions}
						onRegenerate={regenerateDescriptions}
					/>
				</section>
			)}

			{/* Export */}
			{clusteredColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.export.title')}
					</h2>
					<ExportPanel exportJSON={exportJSON} exportCSS={exportCSS} />
				</section>
			)}

			{/* SEO Content */}
			<ServiceSEO namespace='tools.brandColorAnalyzer.seo' />
		</div>
	)
}

