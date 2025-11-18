/**
 * Color Name Finder Client Component
 * 
 * Main client component for the Color Name Finder tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useColorNameFinder } from '@/hooks/useColorNameFinder'
import { ColorInput } from '@/components/color-name-finder/ColorInput'
import { ColorNameGenerator } from '@/components/color-name-finder/ColorNameGenerator'
import { SimilarColors } from '@/components/color-name-finder/SimilarColors'
import { Descriptions } from '@/components/color-name-finder/Descriptions'
import { TechnicalDataComponent } from '@/components/color-name-finder/TechnicalData'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'

/**
 * Color Name Finder Client Component
 * 
 * Main component that brings together all functionality:
 * - Color input (picker + manual)
 * - Color name generation
 * - Similar color matching
 * - Description generation
 * - Technical data display
 * 
 * @returns {JSX.Element} Complete color name finder tool
 */
export function ColorNameFinderClient() {
	const t = useTranslations('tools.colorNameFinder')

	const {
		colorInput,
		parsedColor,
		colorNames,
		similarColors,
		technicalData,
		descriptions,
		customDescription,
		descriptionTone,
		handleColorChange,
		handleSelectSimilarColor,
		setCustomDescription,
		setDescriptionTone,
		generateDescriptions,
	} = useColorNameFinder()

	if (!parsedColor || !colorNames || !technicalData) {
		return <div>Loading...</div>
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

			{/* Color Input Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.pickColor')}
				</h2>
				<ColorInput value={colorInput} onChange={handleColorChange} />
			</section>

			{/* Color Name Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.colorName')}
				</h2>
				<ColorNameGenerator colorNames={colorNames} currentColor={parsedColor.hex} />
			</section>

			{/* Similar Colors Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<SimilarColors
					similarColors={similarColors}
					currentColor={parsedColor.hex}
					onSelectColor={handleSelectSimilarColor}
				/>
			</section>

			{/* Descriptions Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<Descriptions
					descriptions={descriptions}
					customDescription={customDescription}
					descriptionTone={descriptionTone}
					onCustomDescriptionChange={setCustomDescription}
					onToneChange={setDescriptionTone}
					onRegenerate={generateDescriptions}
				/>
			</section>

			{/* Technical Data Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.technicalData')}
				</h2>
				<TechnicalDataComponent data={technicalData} />
			</section>

			{/* SEO Content */}
			<ServiceSEO namespace='tools.colorNameFinder.seo' />
		</div>
	)
}

