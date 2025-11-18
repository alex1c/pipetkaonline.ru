/**
 * Input Section Component
 * 
 * Provides multiple input methods for brand colors:
 * - Manual HEX/RGB/HSL input
 * - Image upload
 * - Predefined brand selection
 * 
 * @component
 */

'use client'

import { useState, useRef } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'
import type { BrandPalette } from '@/lib/brand-analysis/predefinedBrands'

interface InputSectionProps {
	/** Current colors array */
	colors: string[]
	/** Callback when colors change */
	onColorsChange: (colors: string[]) => void
	/** Callback when image is uploaded */
	onImageUpload: (file: File) => void
	/** Callback when brand is selected */
	onBrandSelect: (brandName: string) => void
	/** Predefined brands list */
	predefinedBrands: BrandPalette[]
	/** Whether image is being processed */
	isProcessing?: boolean
}

/**
 * Input Section Component
 * 
 * @param {InputSectionProps} props - Component props
 * @returns {JSX.Element} Input section component
 */
export function InputSection({
	colors,
	onColorsChange,
	onImageUpload,
	onBrandSelect,
	predefinedBrands,
	isProcessing = false,
}: InputSectionProps) {
	const [colorInput, setColorInput] = useState(colors.join(', '))
	const [inputError, setInputError] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	/**
	 * Handle manual color input
	 */
	const handleColorInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
		setColorInput(value)

		// Parse colors (comma or newline separated)
		const colorStrings = value
			.split(/[,\n]/)
			.map((s) => s.trim())
			.filter((s) => s.length > 0)

		const validColors: string[] = []
		let hasError = false

		for (const colorStr of colorStrings) {
			const rgb = parseColorToRgb(colorStr)
			if (rgb) {
				validColors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
			} else if (colorStr.length > 0) {
				hasError = true
			}
		}

		setInputError(hasError)
		if (validColors.length > 0 || colorStrings.length === 0) {
			onColorsChange(validColors.length > 0 ? validColors : [])
		}
	}

	/**
	 * Handle image file selection
	 */
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			onImageUpload(file)
		}
	}

	/**
	 * Handle brand selection
	 */
	const handleBrandSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value) {
			onBrandSelect(e.target.value)
			const brand = predefinedBrands.find((b) => b.name === e.target.value)
			if (brand) {
				setColorInput(brand.colors.join(', '))
			}
		}
	}

	return (
		<div className='space-y-6'>
			{/* Manual Input */}
			<div>
				<label htmlFor='color-input' className='block text-sm font-medium text-slate-700 mb-2'>
					Enter Colors (HEX, RGB, or HSL, comma or newline separated)
				</label>
				<textarea
					id='color-input'
					value={colorInput}
					onChange={handleColorInputChange}
					placeholder='#FF5733, rgb(255, 87, 51), hsl(9, 100%, 60%)'
					rows={4}
					className={`
						w-full px-4 py-2 border rounded-lg
						focus:ring-2 focus:ring-blue-500 focus:border-blue-500
						${inputError ? 'border-red-500 bg-red-50' : 'border-slate-300'}
					`}
				/>
				{inputError && (
					<p className='mt-1 text-sm text-red-600'>Some colors have invalid format</p>
				)}
			</div>

			{/* Image Upload */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					Upload Brand Image (Logo/Brandbook)
				</label>
				<div className='flex items-center gap-4'>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/jpeg,image/png,image/webp'
						onChange={handleFileSelect}
						className='hidden'
					/>
					<button
						onClick={() => fileInputRef.current?.click()}
						disabled={isProcessing}
						className={`
							px-4 py-2 rounded-lg text-sm font-medium transition-colors
							${
								isProcessing
									? 'bg-slate-300 text-slate-500 cursor-not-allowed'
									: 'bg-blue-600 text-white hover:bg-blue-700'
							}
						`}
					>
						{isProcessing ? 'Processing...' : 'Select Image'}
					</button>
					{isProcessing && (
						<div className='flex items-center gap-2 text-sm text-slate-600'>
							<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600' />
							<span>Extracting colors...</span>
						</div>
					)}
				</div>
			</div>

			{/* Predefined Brands */}
			<div>
				<label htmlFor='brand-select' className='block text-sm font-medium text-slate-700 mb-2'>
					Or Select a Popular Brand
				</label>
				<select
					id='brand-select'
					onChange={handleBrandSelect}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value=''>Select a brand...</option>
					{predefinedBrands.map((brand) => (
						<option key={brand.name} value={brand.name}>
							{brand.name} {brand.description ? `- ${brand.description}` : ''}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

