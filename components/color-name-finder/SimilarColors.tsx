/**
 * Similar Colors Component
 * 
 * Displays similar colors with distance values and allows selection.
 * 
 * @component
 */

'use client'

import type { SimilarColor } from '@/hooks/useColorNameFinder'
import { ColorSwatch } from '@/components/extract-v2/ColorSwatch'

interface SimilarColorsProps {
	/** Array of similar colors */
	similarColors: SimilarColor[]
	/** Current color hex */
	currentColor: string
	/** Callback when a similar color is selected */
	onSelectColor: (hex: string) => void
}

/**
 * Similar Colors Component
 * 
 * @param {SimilarColorsProps} props - Component props
 * @returns {JSX.Element} Similar colors component
 */
export function SimilarColors({
	similarColors,
	currentColor,
	onSelectColor,
}: SimilarColorsProps) {
	if (similarColors.length === 0) return null

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>Similar Colors</h3>
			<p className='text-sm text-slate-600'>
				Closest color matches by perceptual distance (ΔE CIEDE2000)
			</p>

			{/* Horizontal Scroll */}
			<div className='overflow-x-auto pb-4'>
				<div className='flex gap-4 min-w-max'>
					{similarColors.map((color, index) => (
						<div
							key={index}
							className={`
								flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all
								${
									color.hex === currentColor
										? 'border-blue-500 bg-blue-50'
										: 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md cursor-pointer'
								}
							`}
							onClick={() => onSelectColor(color.hex)}
						>
							<ColorSwatch color={color.hex} size='md' />
							<div className='text-center min-w-[120px]'>
								<p className='text-sm font-medium text-slate-700 capitalize mb-1'>
									{color.name}
								</p>
								<p className='text-xs font-mono text-slate-600 mb-1'>{color.hex}</p>
								<p className='text-xs text-slate-500'>ΔE: {color.distance}</p>
							</div>
							{color.hex === currentColor && (
								<span className='text-xs font-medium text-blue-600'>Current</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

