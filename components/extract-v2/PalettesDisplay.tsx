/**
 * Palettes Display Component
 * 
 * Displays generated palettes: Brand, UI, and Creative.
 * 
 * @component
 */

'use client'

import type { GeneratedPalettes } from '@/hooks/useExtractColorsV2'
import { ColorSwatch } from './ColorSwatch'

interface PalettesDisplayProps {
	/** Generated palettes */
	palettes: GeneratedPalettes
}

/**
 * Palettes Display Component
 * 
 * Shows three types of palettes: Brand, UI, and Creative.
 * 
 * @param {PalettesDisplayProps} props - Component props
 * @returns {JSX.Element} Palettes display component
 */
export function PalettesDisplay({ palettes }: PalettesDisplayProps) {
	return (
		<div className='space-y-8'>
			<h3 className='text-xl font-semibold text-slate-900'>Generated Palettes</h3>

			{/* Brand Palette */}
			<div className='space-y-4'>
				<h4 className='text-lg font-medium text-slate-700'>Brand Palette</h4>
				<p className='text-sm text-slate-600'>
					10 shades for each dominant color (lighten + darken)
				</p>
				<div className='grid grid-cols-5 md:grid-cols-10 gap-3'>
					{palettes.brand.slice(0, 50).map((color, index) => (
						<ColorSwatch key={`brand-${color}-${index}`} color={color} size='sm' />
					))}
				</div>
			</div>

			{/* UI Palette */}
			<div className='space-y-4'>
				<h4 className='text-lg font-medium text-slate-700'>UI Palette</h4>
				<p className='text-sm text-slate-600'>
					Optimized for interfaces: Primary, Surface, Accent, Neutral
				</p>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Primary</p>
						<ColorSwatch color={palettes.ui.primary} size='lg' />
					</div>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Surface</p>
						<ColorSwatch color={palettes.ui.surface} size='lg' />
					</div>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Accent</p>
						<ColorSwatch color={palettes.ui.accent} size='lg' />
					</div>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Neutral</p>
						<div className='grid grid-cols-3 gap-2'>
							{palettes.ui.neutral.map((color, index) => (
								<ColorSwatch key={`neutral-${color}-${index}`} color={color} size='sm' />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Creative Palette */}
			<div className='space-y-4'>
				<h4 className='text-lg font-medium text-slate-700'>Creative Palette</h4>
				<p className='text-sm text-slate-600'>
					Contrasting and complementary color pairs
				</p>
				<div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
					{palettes.creative.map((color, index) => (
						<ColorSwatch key={`creative-${color}-${index}`} color={color} size='md' />
					))}
				</div>
			</div>
		</div>
	)
}

