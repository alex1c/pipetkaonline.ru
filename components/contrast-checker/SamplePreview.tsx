'use client'

import { useTranslations } from 'next-intl'
import type { ContrastResult } from '@/hooks/useContrastChecker'

interface SamplePreviewProps {
	result: ContrastResult | null
}

/**
 * Text preview component
 * Shows sample text with selected colors
 */
export function SamplePreview({ result }: SamplePreviewProps) {
	const t = useTranslations('tools.contrastChecker')

	if (!result || !result.foregroundHex || !result.backgroundHex) {
		return (
			<div className='bg-white rounded-xl shadow-md p-6'>
				<h3 className='text-lg font-semibold text-slate-900 mb-4'>
					{t('preview.title')}
				</h3>
				<div className='text-center text-slate-500 py-8'>
					Enter colors to see preview
				</div>
			</div>
		)
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('preview.title')}</h3>

			<div
				className='rounded-lg p-6 space-y-4'
				style={{ backgroundColor: result.backgroundHex }}
			>
				{/* Heading */}
				<h2
					className='text-2xl font-bold'
					style={{ color: result.foregroundHex }}
				>
					{t('preview.heading')}
				</h2>

				{/* Normal text */}
				<p
					className='text-base leading-relaxed'
					style={{ color: result.foregroundHex }}
				>
					{t('preview.normal')}
				</p>

				{/* Bold text */}
				<p
					className='text-base font-bold leading-relaxed'
					style={{ color: result.foregroundHex }}
				>
					{t('preview.bold')}
				</p>
			</div>
		</div>
	)
}



