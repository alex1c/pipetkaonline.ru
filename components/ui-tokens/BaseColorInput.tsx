/**
 * Base Color Input Component
 * 
 * Input component for selecting the base color for UI tokens generation.
 * Includes color picker, HEX input, and color preview.
 * 
 * @component
 */

'use client'

interface BaseColorInputProps {
	/** Current color value in HEX format */
	value: string
	/** Callback when color changes */
	onChange: (color: string) => void
	/** Whether the current color is valid */
	isValid?: boolean
}

/**
 * Base Color Input Component
 * 
 * Provides multiple ways to input a base color:
 * - Native color picker
 * - HEX text input
 * - Visual color preview
 * 
 * @param {BaseColorInputProps} props - Component props
 * @returns {JSX.Element} Color input component
 */
export function BaseColorInput({
	value,
	onChange,
	isValid = true,
}: BaseColorInputProps) {
	return (
		<div className='space-y-4'>
			{/* Color Picker and Preview */}
			<div className='flex items-center gap-4'>
				{/* Native Color Picker */}
				<input
					type='color'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className='w-20 h-20 rounded-lg border-2 border-slate-300 cursor-pointer'
					aria-label='Base color picker'
				/>

				{/* Color Preview */}
				<div className='flex-1'>
					<div
						className='w-full h-20 rounded-lg border-2 border-slate-300 shadow-sm'
						style={{ backgroundColor: value }}
						aria-label='Color preview'
					/>
				</div>
			</div>

			{/* HEX Input */}
			<div>
				<label
					htmlFor='hex-input'
					className='block text-sm font-medium text-slate-700 mb-2'
				>
					HEX Color
				</label>
				<input
					id='hex-input'
					type='text'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder='#3B82F6'
					className={`
						w-full px-4 py-2 rounded-lg border-2
						font-mono text-lg
						transition-colors duration-200
						${
							isValid
								? 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
								: 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
						}
					`}
					aria-label='HEX color input'
					aria-invalid={!isValid}
				/>
				{!isValid && (
					<p className='mt-1 text-sm text-red-600'>
						Invalid HEX color format. Use #RRGGBB or #RGB
					</p>
				)}
			</div>
		</div>
	)
}

