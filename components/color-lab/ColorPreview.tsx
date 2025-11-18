'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface ColorPreviewProps {
	hex: string
	rgb: string
	hsl: string
}

/**
 * Color preview component with copy functionality
 */
export function ColorPreview({ hex, rgb, hsl }: ColorPreviewProps) {
	const t = useTranslations('tools.colorLab')
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy color value to clipboard
	 */
	const copyToClipboard = async (value: string, type: string) => {
		try {
			await navigator.clipboard.writeText(value)
			setCopied(type)
			setTimeout(() => setCopied(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	if (!hex) {
		return (
			<div className='bg-white rounded-xl shadow-md p-6 text-center text-slate-500'>
				{t('picker.hint')}
			</div>
		)
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('picker.title')}</h3>

			{/* Color swatch */}
			<div
				className='w-full h-24 rounded-lg border-2 border-slate-200 shadow-sm'
				style={{ backgroundColor: hex }}
			/>

			{/* Color values */}
			<div className='space-y-3'>
				{/* HEX */}
				<div className='flex items-center gap-3'>
					<div className='flex-1'>
						<label className='text-xs text-slate-500 uppercase tracking-wide'>
							HEX
						</label>
						<div className='font-mono text-slate-900 mt-1'>{hex}</div>
					</div>
					<button
						onClick={() => copyToClipboard(hex, 'hex')}
						className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm font-medium'
					>
						{copied === 'hex' ? t('copied') : t('copy')}
					</button>
				</div>

				{/* RGB */}
				<div className='flex items-center gap-3'>
					<div className='flex-1'>
						<label className='text-xs text-slate-500 uppercase tracking-wide'>
							RGB
						</label>
						<div className='font-mono text-slate-900 mt-1'>{rgb}</div>
					</div>
					<button
						onClick={() => copyToClipboard(rgb, 'rgb')}
						className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm font-medium'
					>
						{copied === 'rgb' ? t('copied') : t('copy')}
					</button>
				</div>

				{/* HSL */}
				<div className='flex items-center gap-3'>
					<div className='flex-1'>
						<label className='text-xs text-slate-500 uppercase tracking-wide'>
							HSL
						</label>
						<div className='font-mono text-slate-900 mt-1'>{hsl}</div>
					</div>
					<button
						onClick={() => copyToClipboard(hsl, 'hsl')}
						className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm font-medium'
					>
						{copied === 'hsl' ? t('copied') : t('copy')}
					</button>
				</div>
			</div>
		</div>
	)
}

