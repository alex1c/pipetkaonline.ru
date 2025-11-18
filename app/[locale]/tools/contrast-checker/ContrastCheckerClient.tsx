'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ColorInput } from '@/components/contrast-checker/ColorInput'
import { ResultCard } from '@/components/contrast-checker/ResultCard'
import { SamplePreview } from '@/components/contrast-checker/SamplePreview'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { useContrastChecker } from '@/hooks/useContrastChecker'

/**
 * Contrast Checker client component
 * Main page for WCAG contrast checking
 */
export function ContrastCheckerClient() {
	const t = useTranslations('tools.contrastChecker')
	const [foreground, setForeground] = useState('#000000')
	const [background, setBackground] = useState('#ffffff')

	const result = useContrastChecker(foreground, background)

	return (
		<div className='space-y-8'>
			{/* Page header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Color inputs */}
			<div className='grid md:grid-cols-2 gap-6'>
				<ColorInput
					label={t('foreground.label')}
					placeholder={t('foreground.placeholder')}
					value={foreground}
					onChange={setForeground}
				/>
				<ColorInput
					label={t('background.label')}
					placeholder={t('background.placeholder')}
					value={background}
					onChange={setBackground}
				/>
			</div>

			{/* Results and Preview */}
			<div className='grid lg:grid-cols-2 gap-6'>
				{/* WCAG Results */}
				{result && <ResultCard result={result} />}

				{/* Text Preview */}
				<SamplePreview result={result} />
			</div>

			{/* SEO Content */}
			<ServiceSEO namespace='tools.contrastChecker.seo' />
		</div>
	)
}


