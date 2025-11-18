/**
 * Color Input Component
 * 
 * Provides color selection via color picker, manual input, presets, and image upload.
 * 
 * @component
 */

'use client'

import { useState, useRef } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'
import type { ThemePreset } from '@/lib/theme-generator/themePresets'

interface ColorInputProps {
	/** Current base color */
	baseColor: string
	/** Current mode */
	mode: 'light' | 'dark' | 'auto'
	/** Selected preset */
	selectedPreset: string | null
	/** Theme presets */
	presets: ThemePreset[]
	/** Callback when color changes */
	onColorChange: (color: string) => void
	/** Callback when mode changes */
	onModeChange: (mode: 'light' | 'dark' | 'auto') => void
	/** Callback when preset is selected */
	onPresetSelect: (presetName: string) => void
	/** Callback when image is uploaded */
	onImageUpload: (file: File) => void
	/** Whether image is being processed */
	isProcessing?: boolean
}

/**
 * Color Input Component
 * 
 * @param {ColorInputProps} props - Component props
 * @returns {JSX.Element} Color input component
 */
export function ColorInput({
	baseColor,
	mode,
	selectedPreset,
	presets,
	onColorChange,
	onModeChange,
	onPresetSelect,
	onImageUpload,
	isProcessing = false,
}: ColorInputProps) {
	const [inputValue, setInputValue] = useState(baseColor)
	const [inputError, setInputError] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	/**
	 * Handle color picker change
	 */
	const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value
		setInputValue(newColor)
		onColorChange(newColor)
		setInputError(false)
	}

	/**
	 * Handle manual input change
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)

		const rgb = parseColorToRgb(value)
		if (rgb) {
			const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
			onColorChange(hex)
			setInputError(false)
		} else if (value.length > 0) {
			setInputError(true)
		} else {
			setInputError(false)
		}
	}

	/**
	 * Handle file selection
	 */
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			onImageUpload(file)
		}
	}

	return (
		<div className='space-y-6'>
			{/* Color Picker and Manual Input */}
			<div className='flex items-center gap-4'>
				<input
					type='color'
					value={baseColor}
					onChange={handlePickerChange}
					className='w-24 h-24 rounded-lg border-2 border-slate-300 cursor-pointer'
					title='Color picker'
				/>

				<div className='flex-1'>
					<label htmlFor='color-input' className='block text-sm font-medium text-slate-700 mb-2'>
						Base Color (HEX, RGB, or HSL)
					</label>
					<input
						id='color-input'
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						placeholder='#3B82F6, rgb(59, 130, 246), or hsl(217, 91%, 60%)'
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

			{/* Mode Selector */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>Theme Mode</label>
				<div className='flex gap-2'>
					{(['light', 'dark', 'auto'] as const).map((m) => (
						<button
							key={m}
							onClick={() => onModeChange(m)}
							className={`
								px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
								${
									mode === m
										? 'bg-blue-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{m}
						</button>
					))}
				</div>
			</div>

			{/* Presets */}
			<div>
				<label htmlFor='preset-select' className='block text-sm font-medium text-slate-700 mb-2'>
					Theme Presets
				</label>
				<select
					id='preset-select'
					value={selectedPreset || ''}
					onChange={(e) => {
						if (e.target.value) {
							onPresetSelect(e.target.value)
						}
					}}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value=''>Select a preset...</option>
					{presets.map((preset) => (
						<option key={preset.name} value={preset.name}>
							{preset.name} - {preset.description}
						</option>
					))}
				</select>
			</div>

			{/* Image Upload */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					Extract Color from Image (Optional)
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
						{isProcessing ? 'Processing...' : 'Upload Image'}
					</button>
					{isProcessing && (
						<div className='flex items-center gap-2 text-sm text-slate-600'>
							<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600' />
							<span>Extracting color...</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

