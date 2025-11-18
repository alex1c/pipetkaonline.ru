/**
 * Options Panel Component
 * 
 * Provides additional options for palette generation.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { GenerationOptions } from '@/hooks/useEmotionColors'

interface OptionsPanelProps {
	/** Current options */
	options: GenerationOptions
	/** Callback when options change */
	onOptionsChange: (options: GenerationOptions) => void
}

/**
 * Options Panel Component
 * 
 * @param {OptionsPanelProps} props - Component props
 * @returns {JSX.Element} Options panel component
 */
export function OptionsPanel({ options, onOptionsChange }: OptionsPanelProps) {
	const t = useTranslations('tools.emotionColors')

	/**
	 * Toggle option
	 */
	const toggleOption = (key: keyof GenerationOptions) => {
		onOptionsChange({
			...options,
			[key]: !options[key],
		})
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900 mb-4'>
				{t('additionalOptions')}
			</h3>

			<div className='space-y-3'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={options.warm || false}
						onChange={() => toggleOption('warm')}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						{t('options.warm')}
					</span>
				</label>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={options.bright || false}
						onChange={() => toggleOption('bright')}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						{t('options.bright')}
					</span>
				</label>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={options.natural || false}
						onChange={() => toggleOption('natural')}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						{t('options.natural')}
					</span>
				</label>
			</div>
		</div>
	)
}

