/**
 * Dominant Colors Component
 * 
 * Displays the dominant colors extracted from the image.
 * 
 * @component
 */

'use client'

import type { ColorWithMeta } from '@/hooks/useExtractColorsV2'
import { ColorSwatch } from './ColorSwatch'

interface DominantColorsProps {
	/** Array of dominant colors */
	colors: ColorWithMeta[]
	/** Title for the section */
	title?: string
}

/**
 * Dominant Colors Component
 * 
 * Displays dominant colors in a grid layout with swatches.
 * 
 * @param {DominantColorsProps} props - Component props
 * @returns {JSX.Element} Dominant colors component
 */
export function DominantColors({ colors, title = 'Dominant Colors' }: DominantColorsProps) {
	if (colors.length === 0) return null

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>{title}</h3>
			<div className='grid grid-cols-5 md:grid-cols-10 gap-4'>
				{colors.map((color, index) => (
					<ColorSwatch
						key={`${color.hex}-${index}`}
						color={color.hex}
						percentage={color.percentage}
						label={`Color ${index + 1}`}
						size='md'
					/>
				))}
			</div>
		</div>
	)
}

