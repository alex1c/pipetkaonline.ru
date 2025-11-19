'use client'

import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { parseColorToRgb } from '@/lib/color-utils'

interface ColorInputProps {
	label: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	onValidChange?: (rgb: { r: number; g: number; b: number } | null) => void
}

/**
 * Color input component with validation
 * Supports HEX, RGB, HSL formats
 */
export function ColorInput({
	label,
	placeholder,
	value,
	onChange,
	onValidChange,
}: ColorInputProps) {
	const [error, setError] = useState<string | null>(null)

	/**
	 * Validate color value
	 */
	const validateColor = useCallback(
		(colorValue: string) => {
			if (colorValue.trim() === '') {
				setError(null)
				onValidChange?.(null)
				return
			}

			const rgb = parseColorToRgb(colorValue)
			if (rgb) {
				setError(null)
				onValidChange?.(rgb)
			} else {
				setError('Invalid color format')
				onValidChange?.(null)
			}
		},
		[onValidChange]
	)

	/**
	 * Handle input change
	 */
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value

		// Auto-add # for HEX if user types without it
		if (
			!inputValue.startsWith('#') &&
			!inputValue.toLowerCase().startsWith('rgb') &&
			!inputValue.toLowerCase().startsWith('hsl') &&
			/^[0-9a-f]{1,6}$/i.test(inputValue)
		) {
			inputValue = '#' + inputValue
		}

		onChange(inputValue)
		validateColor(inputValue)
	}

	/**
	 * Validate on value change (for external updates)
	 */
	useEffect(() => {
		validateColor(value)
	}, [value, validateColor])

	return (
		<div className='space-y-2'>
			<label className='block text-sm font-medium text-slate-700'>{label}</label>
			<input
				type='text'
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className={`
					w-full px-4 py-3 rounded-lg border-2 transition-colors
					${
						error
							? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
							: 'border-slate-300 bg-white focus:border-blue-500 focus:ring-blue-200'
					}
					focus:outline-none focus:ring-2
					text-slate-900 placeholder-slate-400
				`}
			/>
			{error && (
				<p className='text-sm text-red-600 flex items-center gap-1'>
					<span>⚠️</span>
					<span>{error}</span>
				</p>
			)}
		</div>
	)
}



