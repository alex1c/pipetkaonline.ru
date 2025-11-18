'use client'

import { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface RgbInputProps {
	value: string
	onChange: (value: string) => void
	error?: string | null
}

/**
 * Input component for RGB color format
 * Supports validation and auto-formatting
 */
export function RgbInput({ value, onChange, error }: RgbInputProps) {
	const t = useTranslations('tools.colorConverter')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	const handleBlur = () => {
		// Try to format RGB string
		const match = value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
		if (match) {
			const r = Math.max(0, Math.min(255, parseInt(match[1], 10)))
			const g = Math.max(0, Math.min(255, parseInt(match[2], 10)))
			const b = Math.max(0, Math.min(255, parseInt(match[3], 10)))

			const formatted = `rgb(${r}, ${g}, ${b})`
			if (formatted !== value) {
				onChange(formatted)
			}
		}
	}

	return (
		<div className='space-y-2'>
			<label htmlFor='rgb-input' className='block text-sm font-medium text-slate-700'>
				{t('inputs.rgb.label')}
			</label>
			<input
				type='text'
				id='rgb-input'
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={t('inputs.rgb.placeholder')}
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
				<p className='text-xs text-slate-500'>{t('inputs.rgb.hint')}</p>
			)}
		</div>
	)
}


