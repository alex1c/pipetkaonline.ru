'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePaletteGenerator } from '@/hooks/usePaletteGenerator'
import { rgbToHex } from '@/lib/color-utils'

interface PaletteGeneratorProps {
	baseColor: { r: number; g: number; b: number } | null
}

/**
 * Palette generator component
 * Supports triad, complementary, and monochromatic schemes
 */
export function PaletteGenerator({ baseColor }: PaletteGeneratorProps) {
	const t = useTranslations('tools.colorLab')
	
	// Convert RGB to HEX string for the hook
	const baseColorHex = useMemo(() => {
		if (!baseColor) return '#3498db'
		return rgbToHex(baseColor.r, baseColor.g, baseColor.b)
	}, [baseColor])
	
	// Use the hook with correct signature
	const { mode, setMode, palette } = usePaletteGenerator(baseColorHex)
	
	// Set initial mode to 'triad' on mount
	useEffect(() => {
		setMode('triad')
	}, [setMode])
	
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy color to clipboard
	 */
	const copyToClipboard = async (hex: string) => {
		try {
			await navigator.clipboard.writeText(hex)
			setCopied(hex)
			setTimeout(() => setCopied(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	if (!baseColor || palette.length === 0) {
		return null
	}

	const paletteTypes: { value: 'monochromatic' | 'complementary' | 'triad'; labelKey: string }[] = [
		{ value: 'triad', labelKey: 'palette.triad' },
		{ value: 'complementary', labelKey: 'palette.complementary' },
		{ value: 'monochromatic', labelKey: 'palette.monochromatic' },
	]

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('palette.title')}</h3>

			{/* Palette type selector */}
			<div className='flex gap-2'>
				{paletteTypes.map((type) => (
					<button
						key={type.value}
						onClick={() => setMode(type.value)}
						className={`
							px-4 py-2 rounded-md text-sm font-medium transition-colors
							${
								mode === type.value
									? 'bg-blue-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{t(type.labelKey)}
					</button>
				))}
			</div>

			{/* Palette colors */}
			<div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
				{palette.map((color, index) => (
					<div
						key={index}
						className='group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-slate-200 hover:border-slate-400 transition-all shadow-sm hover:shadow-md'
						style={{ backgroundColor: color.hex }}
						onClick={() => copyToClipboard(color.hex)}
					>
						{/* Overlay on hover */}
						<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors' />

						{/* Color hex on hover */}
						<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
							<div className='bg-white/90 px-2 py-1 rounded text-xs font-mono text-slate-900'>
								{copied === color.hex ? '✓' : color.hex}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

