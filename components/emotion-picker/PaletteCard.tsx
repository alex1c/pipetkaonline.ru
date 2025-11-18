/**
 * Palette Card Component
 * 
 * Displays a color with its formats and copy functionality.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { ColorFormats } from '@/hooks/useEmotionColors'

interface PaletteCardProps {
	/** Color formats */
	color: ColorFormats
	/** Label for the color */
	label?: string
	/** Callback to copy color */
	onCopy: (hex: string) => void
}

/**
 * Palette Card Component
 * 
 * @param {PaletteCardProps} props - Component props
 * @returns {JSX.Element} Palette card component
 */
export function PaletteCard({ color, label, onCopy }: PaletteCardProps) {
	const [copied, setCopied] = useState(false)

	/**
	 * Handle copy
	 */
	const handleCopy = async () => {
		await onCopy(color.hex)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
			{/* Color Swatch */}
			<div
				className='h-24 w-full cursor-pointer'
				style={{ backgroundColor: color.hex }}
				onClick={handleCopy}
			/>

			{/* Color Info */}
			<div className='p-4 space-y-2'>
				{label && (
					<div className='text-sm font-medium text-slate-900'>{label}</div>
				)}

				<div className='space-y-1 text-xs'>
					<div className='flex items-center justify-between'>
						<span className='text-slate-600'>HEX:</span>
						<code className='text-slate-900 font-mono'>{color.hex}</code>
					</div>
					<div className='flex items-center justify-between'>
						<span className='text-slate-600'>RGB:</span>
						<code className='text-slate-900 font-mono text-[10px]'>{color.rgb}</code>
					</div>
					<div className='flex items-center justify-between'>
						<span className='text-slate-600'>HSL:</span>
						<code className='text-slate-900 font-mono text-[10px]'>{color.hsl}</code>
					</div>
				</div>

				{/* Copy Button */}
				<button
					onClick={handleCopy}
					className={`
						w-full px-3 py-1.5 rounded-md text-xs font-medium transition-colors
						${
							copied
								? 'bg-green-600 text-white'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
						}
					`}
				>
					{copied ? '✓ Copied' : 'Copy HEX'}
				</button>
			</div>
		</div>
	)
}

