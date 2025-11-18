/**
 * Palette Properties Component
 * 
 * Displays palette characteristics: temperature, brightness, saturation, style, harmony, tags.
 * 
 * @component
 */

'use client'

import type { PaletteCharacteristics, HarmonyAnalysis } from '@/lib/brand-analysis/paletteAnalysis'

interface PalettePropertiesProps {
	/** Palette characteristics */
	characteristics: PaletteCharacteristics
	/** Harmony analysis */
	harmony: HarmonyAnalysis
}

/**
 * Palette Properties Component
 * 
 * @param {PalettePropertiesProps} props - Component props
 * @returns {JSX.Element} Palette properties component
 */
export function PaletteProperties({ characteristics, harmony }: PalettePropertiesProps) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Palette Properties</h3>

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{/* Temperature */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Temperature</h4>
					<p className='text-2xl font-bold text-slate-900 capitalize'>{characteristics.temperature}</p>
					<div className='mt-2 flex items-center gap-2'>
						<div
							className={`w-4 h-4 rounded-full ${
								characteristics.temperature === 'warm'
									? 'bg-orange-500'
									: characteristics.temperature === 'cold'
									? 'bg-blue-500'
									: 'bg-gray-500'
							}`}
						/>
						<span className='text-sm text-slate-600'>
							{characteristics.temperature === 'warm'
								? 'Warm tones'
								: characteristics.temperature === 'cold'
								? 'Cool tones'
								: 'Neutral balance'}
						</span>
					</div>
				</div>

				{/* Brightness */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Brightness</h4>
					<p className='text-2xl font-bold text-slate-900 capitalize'>{characteristics.brightness}</p>
					<div className='mt-2 w-full bg-slate-200 rounded-full h-2'>
						<div
							className={`h-2 rounded-full ${
								characteristics.brightness === 'bright'
									? 'bg-yellow-400 w-3/4'
									: characteristics.brightness === 'dark'
									? 'bg-slate-800 w-1/4'
									: 'bg-slate-500 w-1/2'
							}`}
						/>
					</div>
				</div>

				{/* Saturation */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Saturation</h4>
					<p className='text-2xl font-bold text-slate-900 capitalize'>{characteristics.saturation}</p>
					<div className='mt-2 w-full bg-slate-200 rounded-full h-2'>
						<div
							className={`h-2 rounded-full ${
								characteristics.saturation === 'vibrant'
									? 'bg-pink-500 w-full'
									: characteristics.saturation === 'muted'
									? 'bg-slate-400 w-1/3'
									: 'bg-purple-400 w-2/3'
							}`}
						/>
					</div>
				</div>

				{/* Style */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Style</h4>
					<p className='text-2xl font-bold text-slate-900 capitalize'>{characteristics.style}</p>
					<p className='text-sm text-slate-600 mt-2'>
						{characteristics.style === 'energetic'
							? 'Dynamic and bold'
							: characteristics.style === 'muted'
							? 'Subtle and refined'
							: characteristics.style === 'minimalistic'
							? 'Clean and simple'
							: characteristics.style === 'playful'
							? 'Fun and creative'
							: 'Professional and trustworthy'}
					</p>
				</div>

				{/* Harmony */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Harmony</h4>
					<p className='text-2xl font-bold text-slate-900 capitalize'>
						{harmony.type !== 'none' ? harmony.type : 'Custom'}
					</p>
					{harmony.hasConflict && (
						<p className='text-sm text-red-600 mt-2'>⚠ Color conflicts detected</p>
					)}
					<p className='text-sm text-slate-600 mt-2'>
						Contrast: <span className='font-medium capitalize'>{harmony.contrastLevel}</span>
					</p>
				</div>

				{/* Tags */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Tags</h4>
					{characteristics.tags.length > 0 ? (
						<div className='flex flex-wrap gap-2'>
							{characteristics.tags.map((tag, index) => (
								<span
									key={index}
									className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize'
								>
									{tag}
								</span>
							))}
						</div>
					) : (
						<p className='text-sm text-slate-500'>No tags</p>
					)}
				</div>
			</div>
		</div>
	)
}

