'use client'

import { useTranslations } from 'next-intl'

interface GradientPreviewProps {
	css: string
}

/**
 * Component for displaying gradient preview
 * Shows a large block with the current gradient
 */
export function GradientPreview({ css }: GradientPreviewProps) {
	const t = useTranslations('tools.gradientGenerator')

	return (
		<div className='bg-white rounded-xl shadow-md p-6'>
			<h3 className='text-lg font-semibold text-slate-900 mb-4'>
				{t('preview.title')}
			</h3>
			<div
				className='w-full h-64 md:h-80 rounded-lg border-2 border-slate-200 shadow-inner'
				style={{ background: css }}
			/>
		</div>
	)
}


