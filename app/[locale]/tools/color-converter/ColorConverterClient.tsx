'use client'

import { useTranslations } from 'next-intl'
import { HexInput } from '@/components/color-converter/HexInput'
import { RgbInput } from '@/components/color-converter/RgbInput'
import { HslInput } from '@/components/color-converter/HslInput'
import { ResultPreview } from '@/components/color-converter/ResultPreview'
import { useColorConverter } from '@/hooks/useColorConverter'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Client component for Color Converter tool
 * Handles all interactive functionality
 */
export function ColorConverterClient() {
	const t = useTranslations('tools.colorConverter')

	const {
		hexInput,
		rgbInput,
		hslInput,
		handleHexChange,
		handleRgbChange,
		handleHslChange,
		currentHex,
		currentRgb,
		currentHsl,
		getTextColor,
	} = useColorConverter('#000000')

	const textColor = getTextColor(currentRgb)

	return (
		<div className='space-y-8'>
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Input Section */}
			<div className='bg-white rounded-xl shadow-md p-6 space-y-6'>
				<h2 className='text-xl font-semibold text-slate-900'>{t('inputs.title')}</h2>
				<p className='text-sm text-slate-600'>{t('inputs.description')}</p>

				<div className='grid md:grid-cols-3 gap-6'>
					<HexInput
						value={hexInput}
						onChange={handleHexChange}
						error={null}
					/>
					<RgbInput
						value={rgbInput}
						onChange={handleRgbChange}
						error={null}
					/>
					<HslInput
						value={hslInput}
						onChange={handleHslChange}
						error={null}
					/>
				</div>
			</div>

			{/* Preview Section */}
			{currentRgb && (
				<ResultPreview
					hex={currentHex}
					rgb={currentRgb}
					hsl={currentHsl}
					textColor={textColor}
				/>
			)}

			{/* Similar Tools */}
			<SimilarTools currentTool='color-converter' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.colorConverter.seo' />
		</div>
	)
}

