'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSimilarColors } from '@/hooks/useSimilarColors'

interface SimilarColorsProps {
	baseColor: { r: number; g: number; b: number } | null
}

/**
 * Similar colors component
 * Displays 10 similar color shades
 */
export function SimilarColors({ baseColor }: SimilarColorsProps) {
	const t = useTranslations('tools.colorLab')
	const similarColors = useSimilarColors(baseColor)
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

	if (!baseColor || similarColors.length === 0) {
		return null
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('similar.title')}</h3>
			<p className='text-sm text-slate-600'>
				{t('similar.hint')}
			</p>

			<div className='grid grid-cols-5 gap-3'>
				{similarColors.map((color, index) => (
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

