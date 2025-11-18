'use client'

import { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface BaseColorInputProps {
	value: string
	onChange: (value: string) => void
	onRandomClick: () => void
	error?: string | null
}

/**
 * Input component for base color selection
 * Supports HEX, RGB, HSL formats with validation and auto-formatting
 */
export function BaseColorInput({
	value,
	onChange,
	onRandomClick,
	error,
}: BaseColorInputProps) {
	const t = useTranslations('tools.paletteGenerator')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	const handleBlur = () => {
		// Auto-format HEX
		if (value.startsWith('#') || /^[0-9a-fA-F]{6}$/.test(value)) {
			let hex = value.replace(/^#/, '')
			if (hex.length === 3) {
				hex = hex
					.split('')
					.map((char) => char + char)
					.join('')
			}
			if (hex.length === 6 && !value.startsWith('#')) {
				onChange('#' + hex)
			}
		}
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<label htmlFor='base-color' className='block text-sm font-medium text-slate-700'>
					{t('baseColor.label')}
				</label>
				<button
					type='button'
					onClick={onRandomClick}
					className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium'
				>
					{t('baseColor.random')}
				</button>
			</div>

			<input
				type='text'
				id='base-color'
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={t('baseColor.placeholder')}
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
				<p className='text-xs text-slate-500'>{t('baseColor.hint')}</p>
			)}
		</div>
	)
}


