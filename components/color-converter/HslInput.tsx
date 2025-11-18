'use client'

import { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface HslInputProps {
	value: string
	onChange: (value: string) => void
	error?: string | null
}

/**
 * Input component for HSL color format
 * Supports validation and auto-formatting
 */
export function HslInput({ value, onChange, error }: HslInputProps) {
	const t = useTranslations('tools.colorConverter')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	const handleBlur = () => {
		// Try to format HSL string
		const match = value.match(/(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/i)
		if (match) {
			const h = Math.max(0, Math.min(360, parseInt(match[1], 10)))
			const s = Math.max(0, Math.min(100, parseInt(match[2], 10)))
			const l = Math.max(0, Math.min(100, parseInt(match[3], 10)))

			const formatted = `hsl(${h}, ${s}%, ${l}%)`
			if (formatted !== value) {
				onChange(formatted)
			}
		}
	}

	return (
		<div className='space-y-2'>
			<label htmlFor='hsl-input' className='block text-sm font-medium text-slate-700'>
				{t('inputs.hsl.label')}
			</label>
			<input
				type='text'
				id='hsl-input'
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={t('inputs.hsl.placeholder')}
				className={`
					w-full px-4 py-2 border rounded-md shadow-sm
					focus:ring-blue-500 focus:border-blue-500
					${error ? 'border-red-500' : 'border-slate-300'}
					text-slate-900 placeholder-slate-400
					font-mono
				`}
			/>
			{error && <p className='text-sm text-red-600'>{error}</p>}
			{!error && (
				<p className='text-xs text-slate-500'>{t('inputs.hsl.hint')}</p>
			)}
		</div>
	)
}


