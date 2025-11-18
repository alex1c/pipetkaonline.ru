/**
 * Color Name Generator Component
 * 
 * Displays color names: standard, algorithmic, and marketing.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { ColorNameResult } from '@/hooks/useColorNameFinder'
import { ColorSwatch } from '@/components/extract-v2/ColorSwatch'

interface ColorNameGeneratorProps {
	/** Color names result */
	colorNames: ColorNameResult
	/** Current color hex */
	currentColor: string
}

/**
 * Color Name Generator Component
 * 
 * @param {ColorNameGeneratorProps} props - Component props
 * @returns {JSX.Element} Color name generator component
 */
export function ColorNameGenerator({ colorNames, currentColor }: ColorNameGeneratorProps) {
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy text to clipboard
	 */
	const handleCopy = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(id)
			setTimeout(() => setCopied(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div className='space-y-6'>
			{/* Main Color Name Card */}
			<div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200'>
				<div className='flex items-center gap-6'>
					<ColorSwatch color={currentColor} size='lg' />
					<div className='flex-1'>
						<h3 className='text-2xl font-bold text-slate-900 mb-2'>
							{colorNames.marketing}
						</h3>
						<p className='text-lg text-slate-600 mb-4'>{colorNames.algorithmic}</p>
						<button
							onClick={() => handleCopy(colorNames.marketing, 'main')}
							className={`
								px-4 py-2 rounded-lg text-sm font-medium transition-colors
								${
									copied === 'main'
										? 'bg-green-600 text-white'
										: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
								}
							`}
						>
							{copied === 'main' ? '✓ Copied' : 'Copy Name'}
						</button>
					</div>
				</div>
			</div>

			{/* Alternative Names */}
			<div className='space-y-4'>
				<h4 className='text-lg font-semibold text-slate-900'>Alternative Names</h4>
				<div className='grid md:grid-cols-2 gap-4'>
					{/* Algorithmic Name */}
					<div className='bg-white rounded-lg p-4 border border-slate-200'>
						<p className='text-sm font-medium text-slate-600 mb-2'>Algorithmic</p>
						<p className='text-lg font-semibold text-slate-900 mb-3'>
							{colorNames.algorithmic}
						</p>
						<button
							onClick={() => handleCopy(colorNames.algorithmic, 'algorithmic')}
							className={`
								px-3 py-1.5 rounded-md text-sm font-medium transition-colors
								${
									copied === 'algorithmic'
										? 'bg-green-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{copied === 'algorithmic' ? '✓' : 'Copy'}
						</button>
					</div>

					{/* Standard Names */}
					{colorNames.standard.length > 0 && (
						<div className='bg-white rounded-lg p-4 border border-slate-200'>
							<p className='text-sm font-medium text-slate-600 mb-2'>Standard (CSS)</p>
							<div className='space-y-2'>
								{colorNames.standard.slice(0, 3).map((match, index) => (
									<div key={index} className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<ColorSwatch color={match.hex} size='sm' />
											<span className='text-sm font-medium text-slate-700 capitalize'>
												{match.name}
											</span>
											<span className='text-xs text-slate-500'>
												(ΔE: {match.distance.toFixed(1)})
											</span>
										</div>
										<button
											onClick={() => handleCopy(match.name, `standard-${index}`)}
											className={`
												px-2 py-1 rounded text-xs font-medium transition-colors
												${
													copied === `standard-${index}`
														? 'bg-green-600 text-white'
														: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
												}
											`}
										>
											{copied === `standard-${index}` ? '✓' : 'Copy'}
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

