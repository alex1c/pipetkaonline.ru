/**
 * Color Swatch Component
 * 
 * Displays a single color with hex code and copy functionality.
 * 
 * @component
 */

'use client'

import { useState } from 'react'

interface ColorSwatchProps {
	/** Color in HEX format */
	color: string
	/** Optional percentage value */
	percentage?: number
	/** Optional label */
	label?: string
	/** Size variant */
	size?: 'sm' | 'md' | 'lg'
}

/**
 * Color Swatch Component
 * 
 * Displays a color square with hex code and copy button.
 * 
 * @param {ColorSwatchProps} props - Component props
 * @returns {JSX.Element} Color swatch component
 */
export function ColorSwatch({
	color,
	percentage,
	label,
	size = 'md',
}: ColorSwatchProps) {
	const [copied, setCopied] = useState(false)

	/**
	 * Copy color to clipboard
	 */
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(color)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const sizeClasses = {
		sm: 'w-16 h-16',
		md: 'w-24 h-24',
		lg: 'w-32 h-32',
	}

	return (
		<div className='flex flex-col items-center gap-2 group'>
			{/* Color Square */}
			<div
				className={`
					${sizeClasses[size]} rounded-lg border-2 border-slate-300
					shadow-sm hover:shadow-md transition-all duration-200
					cursor-pointer relative overflow-hidden
				`}
				style={{ backgroundColor: color }}
				onClick={handleCopy}
				title={`Click to copy ${color}`}
			>
				{/* Copy Overlay */}
				<div className='absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center'>
					{copied ? (
						<span className='text-white text-xs font-bold bg-green-500 px-2 py-1 rounded'>
							✓
						</span>
					) : (
						<span className='opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded transition-opacity'>
							Copy
						</span>
					)}
				</div>
			</div>

			{/* Color Info */}
			<div className='text-center min-w-0'>
				{label && (
					<p className='text-xs font-medium text-slate-700 mb-1 truncate'>{label}</p>
				)}
				<p className='text-xs font-mono text-slate-600'>{color}</p>
				{percentage !== undefined && (
					<p className='text-xs text-slate-500 mt-1'>{percentage.toFixed(1)}%</p>
				)}
			</div>
		</div>
	)
}

