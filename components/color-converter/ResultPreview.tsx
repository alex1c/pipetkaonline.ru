'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RgbColor, HslColor } from '@/hooks/useColorConverter'

interface ResultPreviewProps {
	hex: string
	rgb: RgbColor | null
	hsl: HslColor | null
	textColor: string
}

/**
 * Preview component showing the color and all format codes with copy buttons
 */
export function ResultPreview({ hex, rgb, hsl, textColor }: ResultPreviewProps) {
	const t = useTranslations('tools.colorConverter')
	const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

	const copyToClipboard = async (text: string, format: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopiedFormat(format)
			setTimeout(() => setCopiedFormat(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const formatRgb = (rgb: RgbColor | null): string => {
		if (!rgb) return 'rgb(0, 0, 0)'
		return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
	}

	const formatHsl = (hsl: HslColor | null): string => {
		if (!hsl) return 'hsl(0, 0%, 0%)'
		return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
	}

	const bgColor = hex || '#000000'

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-6'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('preview.title')}</h3>

			{/* Color Preview Card */}
			<div
				className='rounded-lg p-8 border-2 border-slate-200 transition-all'
				style={{ backgroundColor: bgColor }}
			>
				<div className='text-center space-y-4' style={{ color: textColor }}>
					<div className='text-6xl font-bold'>Aa</div>
					<div className='text-lg'>{t('preview.textExample')}</div>
				</div>
			</div>

			{/* Format Codes Table */}
			<div className='space-y-4'>
				<h4 className='text-md font-semibold text-slate-900'>{t('preview.formats')}</h4>

				<div className='space-y-3'>
					{/* HEX */}
					<div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
						<div className='flex-1'>
							<span className='text-xs text-slate-500 block mb-1'>HEX</span>
							<span className='font-mono text-slate-900'>{hex}</span>
						</div>
						<button
							onClick={() => copyToClipboard(hex, 'hex')}
							className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium'
						>
							{copiedFormat === 'hex' ? t('preview.copied') : t('preview.copy')}
						</button>
					</div>

					{/* RGB */}
					{rgb && (
						<div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
							<div className='flex-1'>
								<span className='text-xs text-slate-500 block mb-1'>RGB</span>
								<span className='font-mono text-slate-900'>{formatRgb(rgb)}</span>
							</div>
							<button
								onClick={() => copyToClipboard(formatRgb(rgb), 'rgb')}
								className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium'
							>
								{copiedFormat === 'rgb' ? t('preview.copied') : t('preview.copy')}
							</button>
						</div>
					)}

					{/* HSL */}
					{hsl && (
						<div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
							<div className='flex-1'>
								<span className='text-xs text-slate-500 block mb-1'>HSL</span>
								<span className='font-mono text-slate-900'>{formatHsl(hsl)}</span>
							</div>
							<button
								onClick={() => copyToClipboard(formatHsl(hsl), 'hsl')}
								className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium'
							>
								{copiedFormat === 'hsl' ? t('preview.copied') : t('preview.copy')}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}



