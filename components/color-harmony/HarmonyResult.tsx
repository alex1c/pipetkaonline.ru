'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HarmonyColor } from '@/hooks/useColorHarmony'

interface HarmonyResultProps {
	colors: HarmonyColor[]
	description: string
}

/**
 * Component for displaying harmonious color combinations
 * Shows color swatches with codes, copy buttons, and UI preview
 */
export function HarmonyResult({ colors, description }: HarmonyResultProps) {
	const t = useTranslations('tools.colorHarmony')
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

	const copyToClipboard = async (text: string, index: number) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopiedIndex(index)
			setTimeout(() => setCopiedIndex(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const formatRgb = (rgb: { r: number; g: number; b: number }): string => {
		return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
	}

	const formatHsl = (hsl: { h: number; s: number; l: number }): string => {
		return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
	}

	// Get text color for contrast (black or white)
	const getTextColor = (rgb: { r: number; g: number; b: number }): string => {
		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
		return luminance > 0.5 ? '#000000' : '#ffffff'
	}

	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>{t('result.title')}</h3>

			{/* Harmony Description */}
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
				<p className='text-slate-700'>
					{t(`descriptions.${description}`)}
				</p>
			</div>

			{/* Color Swatches Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
				{colors.map((color, index) => {
					const textColor = getTextColor(color.rgb)
					return (
						<div
							key={index}
							className='bg-white rounded-lg shadow-md overflow-hidden border border-slate-200'
						>
							{/* Color Swatch */}
							<div
								className='h-24 w-full'
								style={{ backgroundColor: color.hex }}
							/>

							{/* Color Info */}
							<div className='p-3 space-y-2'>
								{/* HEX */}
								<div className='flex items-center justify-between'>
									<span className='text-xs text-slate-500'>HEX</span>
									<button
										onClick={() => copyToClipboard(color.hex, index * 3 + 0)}
										className='text-xs font-mono text-slate-700 hover:text-blue-600 transition-colors'
									>
										{copiedIndex === index * 3 + 0 ? t('result.copied') : color.hex}
									</button>
								</div>

								{/* RGB */}
								<div className='flex items-center justify-between'>
									<span className='text-xs text-slate-500'>RGB</span>
									<button
										onClick={() => copyToClipboard(formatRgb(color.rgb), index * 3 + 1)}
										className='text-xs font-mono text-slate-700 hover:text-blue-600 transition-colors truncate max-w-[120px]'
									>
										{copiedIndex === index * 3 + 1
											? t('result.copied')
											: formatRgb(color.rgb)}
									</button>
								</div>

								{/* HSL */}
								<div className='flex items-center justify-between'>
									<span className='text-xs text-slate-500'>HSL</span>
									<button
										onClick={() => copyToClipboard(formatHsl(color.hsl), index * 3 + 2)}
										className='text-xs font-mono text-slate-700 hover:text-blue-600 transition-colors truncate max-w-[120px]'
									>
										{copiedIndex === index * 3 + 2
											? t('result.copied')
											: formatHsl(color.hsl)}
									</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{/* UI Preview */}
			<div className='bg-white rounded-xl shadow-md p-6 mt-8'>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>
					{t('result.preview.title')}
				</h4>

				<div className='space-y-4'>
					{/* Button Preview */}
					<div className='flex gap-4 flex-wrap'>
						{colors.slice(0, 3).map((color, index) => (
							<button
								key={index}
								className='px-6 py-3 rounded-lg font-medium text-white transition-all hover:scale-105'
								style={{ backgroundColor: color.hex }}
							>
								{t('result.preview.button')}
							</button>
						))}
					</div>

					{/* Card Preview */}
					<div className='grid md:grid-cols-3 gap-4'>
						{colors.slice(0, 3).map((color, index) => (
							<div
								key={index}
								className='rounded-lg p-4 shadow-md'
								style={{ backgroundColor: color.hex }}
							>
								<div
									className='text-sm font-medium mb-2'
									style={{ color: getTextColor(color.rgb) }}
								>
									{t('result.preview.cardTitle')}
								</div>
								<div
									className='text-xs opacity-90'
									style={{ color: getTextColor(color.rgb) }}
								>
									{t('result.preview.cardText')}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}


