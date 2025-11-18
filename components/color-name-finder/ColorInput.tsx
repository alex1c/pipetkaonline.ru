/**
 * Color Input Component
 * 
 * Provides color selection via color picker and manual input (HEX/RGB/HSL).
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'

interface ColorInputProps {
	/** Current color value */
	value: string
	/** Callback when color changes */
	onChange: (color: string) => void
}

/**
 * Color Input Component
 * 
 * @param {ColorInputProps} props - Component props
 * @returns {JSX.Element} Color input component
 */
export function ColorInput({ value, onChange }: ColorInputProps) {
	const [inputValue, setInputValue] = useState(value)
	const [inputError, setInputError] = useState(false)

	/**
	 * Handle color picker change
	 */
	const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value
		setInputValue(newColor)
		onChange(newColor)
		setInputError(false)
	}

	/**
	 * Handle manual input change
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setInputValue(newValue)

		// Try to parse the color
		const rgb = parseColorToRgb(newValue)
		if (rgb) {
			const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
			onChange(hex)
			setInputError(false)
		} else if (newValue.length > 0) {
			setInputError(true)
		} else {
			setInputError(false)
		}
	}

	return (
		<div className='space-y-4'>
			{/* Color Picker */}
			<div className='flex items-center gap-4'>
				<input
					type='color'
					value={value}
					onChange={handlePickerChange}
					className='w-24 h-24 rounded-lg border-2 border-slate-300 cursor-pointer'
					title='Color picker'
				/>

				{/* Manual Input */}
				<div className='flex-1'>
					<label htmlFor='color-input' className='block text-sm font-medium text-slate-700 mb-2'>
						Enter color (HEX, RGB, or HSL)
					</label>
					<input
						id='color-input'
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						placeholder='#FF5733, rgb(255, 87, 51), or hsl(9, 100%, 60%)'
						className={`
							w-full px-4 py-2 border rounded-lg
							focus:ring-2 focus:ring-blue-500 focus:border-blue-500
							${inputError ? 'border-red-500 bg-red-50' : 'border-slate-300'}
						`}
					/>
					{inputError && (
						<p className='mt-1 text-sm text-red-600'>Invalid color format</p>
					)}
				</div>
			</div>

			{/* Current Color Display */}
			<div className='flex items-center gap-3'>
				<div
					className='w-16 h-16 rounded-lg border-2 border-slate-300 shadow-sm'
					style={{ backgroundColor: value }}
				/>
				<div>
					<p className='text-sm font-medium text-slate-700'>Current Color</p>
					<p className='text-lg font-mono text-slate-900'>{value}</p>
				</div>
			</div>
		</div>
	)
}

