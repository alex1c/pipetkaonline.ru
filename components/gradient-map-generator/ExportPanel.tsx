/**
 * Export Panel Component
 * 
 * Provides export functionality: download image, download preset, copy CSS gradient.
 * 
 * @component
 */

'use client'

import { useState } from 'react'

interface ExportPanelProps {
	/** Callback to export image */
	onExportImage: () => void
	/** Callback to export preset */
	onExportPreset: () => void
	/** Callback to copy CSS gradient */
	onCopyCSS: () => void
}

/**
 * Export Panel Component
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({ onExportImage, onExportPreset, onCopyCSS }: ExportPanelProps) {
	const [copied, setCopied] = useState(false)

	/**
	 * Handle copy CSS
	 */
	const handleCopyCSS = async () => {
		await onCopyCSS()
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className='space-y-4 bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900'>Export</h3>

			<div className='flex flex-col gap-3'>
				<button
					onClick={onExportImage}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
				>
					Download Image (PNG)
				</button>

				<button
					onClick={onExportPreset}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
				>
					Download Preset (JSON)
				</button>

				<button
					onClick={handleCopyCSS}
					className={`
						px-4 py-2 rounded-lg transition-colors text-sm font-medium
						${
							copied
								? 'bg-green-600 text-white'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
						}
					`}
				>
					{copied ? '✓ CSS Copied' : 'Copy CSS Gradient'}
				</button>
			</div>
		</div>
	)
}

