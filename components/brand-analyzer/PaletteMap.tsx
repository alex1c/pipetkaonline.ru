/**
 * Palette Map Component
 * 
 * Displays clustered brand colors in a structured map:
 * Primary, Secondary, Accent, Neutral
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { ClusteredColor } from '@/lib/brand-analysis/colorClustering'
import { ColorSwatch } from '@/components/extract-v2/ColorSwatch'

interface PaletteMapProps {
	/** Clustered colors */
	colors: ClusteredColor[]
}

/**
 * Palette Map Component
 * 
 * @param {PaletteMapProps} props - Component props
 * @returns {JSX.Element} Palette map component
 */
export function PaletteMap({ colors }: PaletteMapProps) {
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy color to clipboard
	 */
	const handleCopy = async (hex: string, id: string) => {
		try {
			await navigator.clipboard.writeText(hex)
			setCopied(id)
			setTimeout(() => setCopied(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	/**
	 * Group colors by cluster
	 */
	const byCluster = {
		primary: colors.filter((c) => c.cluster === 'primary'),
		secondary: colors.filter((c) => c.cluster === 'secondary'),
		accent: colors.filter((c) => c.cluster === 'accent'),
		neutral: colors.filter((c) => c.cluster === 'neutral'),
	}

	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Palette Map</h3>

			<div className='grid md:grid-cols-2 gap-6'>
				{/* Primary */}
				{byCluster.primary.length > 0 && (
					<div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200'>
						<h4 className='text-lg font-semibold text-slate-900 mb-4'>Primary Colors</h4>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{byCluster.primary.map((color, index) => (
								<div key={index} className='flex flex-col items-center gap-2'>
									<ColorSwatch color={color.hex} size='md' />
									<p className='text-xs font-mono text-slate-700'>{color.hex}</p>
									<button
										onClick={() => handleCopy(color.hex, `primary-${index}`)}
										className={`
											px-2 py-1 rounded text-xs font-medium transition-colors
											${
												copied === `primary-${index}`
													? 'bg-green-600 text-white'
													: 'bg-white text-slate-700 hover:bg-slate-50'
											}
										`}
									>
										{copied === `primary-${index}` ? '✓' : 'Copy'}
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Secondary */}
				{byCluster.secondary.length > 0 && (
					<div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200'>
						<h4 className='text-lg font-semibold text-slate-900 mb-4'>Secondary Colors</h4>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{byCluster.secondary.map((color, index) => (
								<div key={index} className='flex flex-col items-center gap-2'>
									<ColorSwatch color={color.hex} size='md' />
									<p className='text-xs font-mono text-slate-700'>{color.hex}</p>
									<button
										onClick={() => handleCopy(color.hex, `secondary-${index}`)}
										className={`
											px-2 py-1 rounded text-xs font-medium transition-colors
											${
												copied === `secondary-${index}`
													? 'bg-green-600 text-white'
													: 'bg-white text-slate-700 hover:bg-slate-50'
											}
										`}
									>
										{copied === `secondary-${index}` ? '✓' : 'Copy'}
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Accent */}
				{byCluster.accent.length > 0 && (
					<div className='bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200'>
						<h4 className='text-lg font-semibold text-slate-900 mb-4'>Accent Colors</h4>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{byCluster.accent.map((color, index) => (
								<div key={index} className='flex flex-col items-center gap-2'>
									<ColorSwatch color={color.hex} size='md' />
									<p className='text-xs font-mono text-slate-700'>{color.hex}</p>
									<button
										onClick={() => handleCopy(color.hex, `accent-${index}`)}
										className={`
											px-2 py-1 rounded text-xs font-medium transition-colors
											${
												copied === `accent-${index}`
													? 'bg-green-600 text-white'
													: 'bg-white text-slate-700 hover:bg-slate-50'
											}
										`}
									>
										{copied === `accent-${index}` ? '✓' : 'Copy'}
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Neutral */}
				{byCluster.neutral.length > 0 && (
					<div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200'>
						<h4 className='text-lg font-semibold text-slate-900 mb-4'>Neutral Colors</h4>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
							{byCluster.neutral.map((color, index) => (
								<div key={index} className='flex flex-col items-center gap-2'>
									<ColorSwatch color={color.hex} size='md' />
									<p className='text-xs font-mono text-slate-700'>{color.hex}</p>
									<button
										onClick={() => handleCopy(color.hex, `neutral-${index}`)}
										className={`
											px-2 py-1 rounded text-xs font-medium transition-colors
											${
												copied === `neutral-${index}`
													? 'bg-green-600 text-white'
													: 'bg-white text-slate-700 hover:bg-slate-50'
											}
										`}
									>
										{copied === `neutral-${index}` ? '✓' : 'Copy'}
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

