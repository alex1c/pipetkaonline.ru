/**
 * Color Picker Component
 * 
 * Provides color selection via color picker and manual input (HEX, RGB, HSL).
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'

interface ColorPickerProps {
	/** Selected color */
	color: string
	/** Callback when color changes */
	onColorChange: (color: string) => void
}

/**
 * Color Picker Component
 * 
 * @param {ColorPickerProps} props - Component props
 * @returns {JSX.Element} Color picker component
 */
export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
	const t = useTranslations('tools.solidBackground')
	const [hexInput, setHexInput] = useState(color)
	const [rgbInput, setRgbInput] = useState('')
	const [hslInput, setHslInput] = useState('')

	/**
	 * Handle color picker change
	 */
	const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value
		setHexInput(newColor)
		onColorChange(newColor)
	}

	/**
	 * Handle HEX input
	 */
	const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setHexInput(value)

		if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
			onColorChange(value)
		}
	}

	/**
	 * Handle RGB input
	 */
	const handleRgbInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setRgbInput(value)

		// Parse RGB format: rgb(255, 255, 255) or 255, 255, 255
		const match = value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
		if (match) {
			const r = parseInt(match[1])
			const g = parseInt(match[2])
			const b = parseInt(match[3])

			if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
				const hex = rgbToHex(r, g, b)
				setHexInput(hex)
				onColorChange(hex)
			}
		}
	}

	/**
	 * Handle HSL input
	 */
	const handleHslInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setHslInput(value)

		// Parse HSL format: hsl(360, 100%, 50%) or 360, 100%, 50%
		const match = value.match(/(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/)
		if (match) {
			const h = parseInt(match[1])
			const s = parseInt(match[2])
			const l = parseInt(match[3])

			if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
				const rgb = parseColorToRgb(`hsl(${h}, ${s}%, ${l}%)`)
				if (rgb) {
					const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
					setHexInput(hex)
					onColorChange(hex)
				}
			}
		}
	}

	// Update inputs when color prop changes
	if (color !== hexInput && /^#[0-9A-Fa-f]{6}$/.test(color)) {
		setHexInput(color)
	}

	return (
		<div className='space-y-4'>
			<label className='block text-sm font-medium text-slate-700'>
				{t('pickColor')}
			</label>

			<div className='flex items-center gap-4'>
				{/* Color Picker */}
				<input
					type='color'
					value={color}
					onChange={handlePickerChange}
					className='w-20 h-20 rounded-lg border-2 border-slate-300 cursor-pointer'
				/>

				{/* HEX Input */}
				<div className='flex-1'>
					<label className='block text-xs text-slate-600 mb-1'>HEX</label>
					<input
						type='text'
						value={hexInput}
						onChange={handleHexInput}
						placeholder='#000000'
						className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono'
					/>
				</div>

				{/* RGB Input */}
				<div className='flex-1'>
					<label className='block text-xs text-slate-600 mb-1'>RGB</label>
					<input
						type='text'
						value={rgbInput}
						onChange={handleRgbInput}
						placeholder='255, 255, 255'
						className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono'
					/>
				</div>

				{/* HSL Input */}
				<div className='flex-1'>
					<label className='block text-xs text-slate-600 mb-1'>HSL</label>
					<input
						type='text'
						value={hslInput}
						onChange={handleHslInput}
						placeholder='360, 100%, 50%'
						className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono'
					/>
				</div>
			</div>
		</div>
	)
}

