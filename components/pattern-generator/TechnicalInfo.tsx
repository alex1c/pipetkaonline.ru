/**
 * Technical Info Component
 * 
 * Displays technical information about the pattern.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { PatternSettings } from '@/lib/pattern-renderers/types'

interface TechnicalInfoProps {
	/** Pattern settings */
	settings: PatternSettings
	/** File size estimate in KB */
	fileSize: number
}

/**
 * Technical Info Component
 * 
 * @param {TechnicalInfoProps} props - Component props
 * @returns {JSX.Element} Technical info component
 */
export function TechnicalInfo({ settings, fileSize }: TechnicalInfoProps) {
	const t = useTranslations('tools.patternGenerator')

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-3'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('technicalInfo')}</h3>

			<div className='space-y-2 text-sm'>
				<div className='flex justify-between'>
					<span className='text-slate-600'>{t('backgroundColor')}:</span>
					<code className='font-mono text-slate-900'>{settings.backgroundColor}</code>
				</div>
				<div className='flex justify-between'>
					<span className='text-slate-600'>{t('elementColor')}:</span>
					<code className='font-mono text-slate-900'>{settings.elementColor}</code>
				</div>
				<div className='flex justify-between'>
					<span className='text-slate-600'>{t('tileSize')}:</span>
					<span className='text-slate-900'>{settings.tileSize}px</span>
				</div>
				<div className='flex justify-between'>
					<span className='text-slate-600'>{t('fileSize')}:</span>
					<span className='text-slate-900'>~{fileSize} KB</span>
				</div>
			</div>
		</div>
	)
}

