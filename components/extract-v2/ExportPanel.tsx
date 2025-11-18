/**
 * Export Panel Component
 * 
 * Provides export functionality for extracted colors in multiple formats.
 * 
 * @component
 */

'use client'

import { useState, useCallback } from 'react'
import type { GeneratedPalettes, ColorWithMeta } from '@/hooks/useExtractColorsV2'

interface ExportPanelProps {
	/** Dominant colors */
	dominantColors: ColorWithMeta[]
	/** Extended colors */
	extendedColors: ColorWithMeta[]
	/** Generated palettes */
	palettes: GeneratedPalettes | null
	/** Export functions */
	exportCSS: () => string
	exportTailwind: () => string
	exportJSON: () => string
}

/**
 * Export format type
 */
type ExportFormat = 'css' | 'tailwind' | 'json' | 'png'

/**
 * Export Panel Component
 * 
 * Provides tabbed interface for exporting colors in different formats.
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({
	dominantColors,
	extendedColors,
	palettes,
	exportCSS,
	exportTailwind,
	exportJSON,
}: ExportPanelProps) {
	const [activeTab, setActiveTab] = useState<ExportFormat>('css')
	const [copied, setCopied] = useState(false)

	/**
	 * Get export content based on active tab
	 */
	const getExportContent = (): string => {
		switch (activeTab) {
			case 'css':
				return exportCSS()
			case 'tailwind':
				return exportTailwind()
			case 'json':
				return exportJSON()
			case 'png':
				return '' // PNG export handled separately
			default:
				return ''
		}
	}

	/**
	 * Copy content to clipboard
	 */
	const handleCopy = async () => {
		const content = getExportContent()
		if (!content) return

		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	/**
	 * Export palette as PNG
	 */
	const exportPNG = useCallback(() => {
		if (dominantColors.length === 0) return

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Create palette image
		const colors = dominantColors.slice(0, 10)
		const swatchSize = 100
		const cols = 5
		const rows = Math.ceil(colors.length / cols)
		canvas.width = cols * swatchSize
		canvas.height = rows * swatchSize

		colors.forEach((color, index) => {
			const col = index % cols
			const row = Math.floor(index / cols)
			const x = col * swatchSize
			const y = row * swatchSize

			ctx.fillStyle = color.hex
			ctx.fillRect(x, y, swatchSize, swatchSize)

			// Add hex code text
			ctx.fillStyle = '#FFFFFF'
			ctx.font = '14px monospace'
			ctx.textAlign = 'center'
			ctx.fillText(color.hex, x + swatchSize / 2, y + swatchSize / 2)
		})

		// Download
		canvas.toBlob((blob) => {
			if (!blob) return
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'color-palette.png'
			a.click()
			URL.revokeObjectURL(url)
		})
	}, [dominantColors])

	const tabs: { id: ExportFormat; label: string }[] = [
		{ id: 'css', label: 'CSS Variables' },
		{ id: 'tailwind', label: 'Tailwind Config' },
		{ id: 'json', label: 'JSON Tokens' },
		{ id: 'png', label: 'PNG Export' },
	]

	const content = getExportContent()

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>Export</h3>

			{/* Tabs */}
			<div className='flex gap-2 border-b border-slate-200'>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => {
							setActiveTab(tab.id)
							if (tab.id === 'png') {
								exportPNG()
							}
						}}
						className={`
							px-4 py-2 font-medium text-sm transition-colors
							${
								activeTab === tab.id
									? 'text-blue-600 border-b-2 border-blue-600'
									: 'text-slate-600 hover:text-slate-900'
							}
						`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Code Block (for CSS, Tailwind, JSON) */}
			{activeTab !== 'png' && (
				<div className='relative'>
					<pre className='bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono'>
						<code>{content}</code>
					</pre>

					{/* Copy Button */}
					<button
						onClick={handleCopy}
						className={`
							absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-medium
							transition-colors
							${
								copied
									? 'bg-green-600 text-white'
									: 'bg-slate-700 text-slate-100 hover:bg-slate-600'
							}
						`}
					>
						{copied ? '✓ Copied' : 'Copy'}
					</button>
				</div>
			)}

			{/* PNG Export Info */}
			{activeTab === 'png' && (
				<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
					<p className='text-sm text-blue-800'>
						Click the "PNG Export" tab to download the color palette as an image.
					</p>
				</div>
			)}
		</div>
	)
}

