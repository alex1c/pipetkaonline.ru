/**
 * Extended Palette Component
 * 
 * Displays extended color palette (10 additional colors).
 * 
 * @component
 */

'use client'

import type { ColorWithMeta } from '@/hooks/useExtractColorsV2'
import { ColorSwatch } from './ColorSwatch'

interface ExtendedPaletteProps {
	/** Array of extended colors */
	colors: ColorWithMeta[]
}

/**
 * Extended Palette Component
 * 
 * Displays extended colors in a grid layout.
 * 
 * @param {ExtendedPaletteProps} props - Component props
 * @returns {JSX.Element} Extended palette component
 */
export function ExtendedPalette({ colors }: ExtendedPaletteProps) {
	if (colors.length === 0) return null

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>Extended Palette</h3>
			<div className='grid grid-cols-5 md:grid-cols-10 gap-4'>
				{colors.map((color, index) => (
					<ColorSwatch
						key={`${color.hex}-${index}`}
						color={color.hex}
						percentage={color.percentage}
						label={`Extended ${index + 1}`}
						size='md'
					/>
				))}
			</div>
		</div>
	)
}

