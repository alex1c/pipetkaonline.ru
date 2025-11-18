'use client'

import { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface HexInputProps {
	value: string
	onChange: (value: string) => void
	error?: string | null
}

/**
 * Input component for HEX color format
 * Supports validation and auto-formatting
 */
export function HexInput({ value, onChange, error }: HexInputProps) {
	const t = useTranslations('tools.colorConverter')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		// Remove # if present for processing
		const withoutHash = inputValue.replace(/^#/, '')

		// Allow only hex characters
		if (/^[0-9a-fA-F]*$/.test(withoutHash)) {
			// Limit to 6 characters
			if (withoutHash.length <= 6) {
				onChange(inputValue)
			}
		}
	}

	const handleBlur = () => {
		// Auto-format on blur
		let formatted = value.replace(/^#/, '')

		// Pad to 6 characters if needed (repeat last character)
		if (formatted.length === 3) {
			formatted = formatted
				.split('')
				.map((char) => char + char)
				.join('')
		} else if (formatted.length > 0 && formatted.length < 6) {
			// Pad with last character
			const lastChar = formatted[formatted.length - 1]
			formatted = formatted.padEnd(6, lastChar)
		}

		// Add # if missing
		if (formatted.length > 0 && !value.startsWith('#')) {
			formatted = '#' + formatted
		}

		if (formatted !== value && formatted.length === 7) {
			onChange(formatted)
		}
	}

	return (
		<div className='space-y-2'>
			<label htmlFor='hex-input' className='block text-sm font-medium text-slate-700'>
				{t('inputs.hex.label')}
			</label>
			<div className='relative'>
				<span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>#</span>
				<input
					type='text'
					id='hex-input'
					value={value.replace(/^#/, '')}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={t('inputs.hex.placeholder')}
					className={`
						w-full pl-8 pr-4 py-2 border rounded-md shadow-sm
						focus:ring-blue-500 focus:border-blue-500
						${error ? 'border-red-500' : 'border-slate-300'}
						text-slate-900 placeholder-slate-400
						font-mono
					`}
					maxLength={6}
				/>
			</div>
			{error && <p className='text-sm text-red-600'>{error}</p>}
			{!error && (
				<p className='text-xs text-slate-500'>{t('inputs.hex.hint')}</p>
			)}
		</div>
	)
}


