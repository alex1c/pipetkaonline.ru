/**
 * Extract Colors V2 Client Component
 * 
 * Main client component for the Extract Colors V2 tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useExtractColorsV2 } from '@/hooks/useExtractColorsV2'
import { ImageUploader } from '@/components/extract-v2/ImageUploader'
import { DominantColors } from '@/components/extract-v2/DominantColors'
import { ExtendedPalette } from '@/components/extract-v2/ExtendedPalette'
import { ColorGroupsComponent } from '@/components/extract-v2/ColorGroups'
import { AnalyticsBox } from '@/components/extract-v2/AnalyticsBox'
import { PalettesDisplay } from '@/components/extract-v2/PalettesDisplay'
import { ExportPanel } from '@/components/extract-v2/ExportPanel'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Extract Colors V2 Client Component
 * 
 * Main component that brings together all functionality:
 * - Image upload
 * - Color extraction and clustering
 * - Color grouping and classification
 * - Palette generation
 * - Analytics
 * - Export
 * 
 * @returns {JSX.Element} Complete extract colors v2 tool
 */
export function ExtractColorsV2Client() {
	const t = useTranslations('tools.extractColorsV2')

	const {
		imagePreview,
		isProcessing,
		handleImageSelect,
		dominantColors,
		extendedColors,
		colorGroups,
		analytics,
		palettes,
		clusterCount,
		setClusterCount,
		exportCSS,
		exportTailwind,
		exportJSON,
	} = useExtractColorsV2()

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

			{/* Upload Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.upload.title')}
				</h2>
				<ImageUploader
					onImageSelect={handleImageSelect}
					preview={imagePreview}
					isProcessing={isProcessing}
				/>
			</section>

			{/* Cluster Count Selector */}
			{imagePreview && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<div className='flex items-center gap-4'>
						<label htmlFor='cluster-count' className='text-sm font-medium text-slate-700'>
							{t('sections.clusters.label')}:
						</label>
						<select
							id='cluster-count'
							value={clusterCount}
							onChange={(e) => setClusterCount(Number(e.target.value))}
							className='px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
						>
							<option value={3}>3</option>
							<option value={5}>5</option>
							<option value={8}>8</option>
							<option value={10}>10</option>
							<option value={12}>12</option>
						</select>
					</div>
				</section>
			)}

			{/* Dominant Colors */}
			{dominantColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<DominantColors colors={dominantColors} />
				</section>
			)}

			{/* Extended Palette */}
			{extendedColors.length > 0 && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<ExtendedPalette colors={extendedColors} />
				</section>
			)}

			{/* Analytics */}
			{analytics && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<AnalyticsBox analytics={analytics} />
				</section>
			)}

			{/* Palettes */}
			{palettes && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<PalettesDisplay palettes={palettes} />
				</section>
			)}

			{/* Color Groups */}
			{Object.values(colorGroups).some((group) => group.length > 0) && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<ColorGroupsComponent groups={colorGroups} />
				</section>
			)}

			{/* Export */}
			{palettes && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<ExportPanel
						dominantColors={dominantColors}
						extendedColors={extendedColors}
						palettes={palettes}
						exportCSS={exportCSS}
						exportTailwind={exportTailwind}
						exportJSON={exportJSON}
					/>
				</section>
			)}

			{/* Similar Tools */}
			<SimilarTools currentTool='extract-colors-v2' />

			{/* SEO Content */}
			<ServiceSEO namespace='tools.extractColorsV2.seo' />
		</div>
	)
}

