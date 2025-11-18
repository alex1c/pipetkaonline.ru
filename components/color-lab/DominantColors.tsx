'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDominantColors } from '@/hooks/useDominantColors'

interface DominantColorsProps {
	imageUrl: string | null
}

/**
 * Dominant colors component
 * Extracts 5 dominant colors using K-Means clustering
 */
export function DominantColors({ imageUrl }: DominantColorsProps) {
	const t = useTranslations('tools.colorLab')
	const { dominantColors, isProcessing, extractDominantColors } =
		useDominantColors()
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Extract colors when image is available
	 */
	if (imageUrl && dominantColors.length === 0 && !isProcessing) {
		extractDominantColors(imageUrl)
	}

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

	if (!imageUrl) {
		return null
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>
				{t('dominant.title')}
			</h3>

			{isProcessing ? (
				<div className='text-center py-8 text-slate-500'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2' />
					<p>{t('dominant.analyzing')}</p>
				</div>
			) : (
				<div className='space-y-3'>
					{dominantColors.map((color, index) => (
						<div
							key={index}
							className='flex items-center gap-4 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors'
						>
							{/* Color swatch */}
							<div
								className='w-16 h-16 rounded-lg border-2 border-slate-200 shadow-sm flex-shrink-0'
								style={{ backgroundColor: color.hex }}
							/>

							{/* Color info */}
							<div className='flex-1 min-w-0'>
								<div className='font-mono text-slate-900 font-medium'>
									{color.hex}
								</div>
								<div className='text-sm text-slate-500'>
									{color.percentage}% {t('dominant.ofImage')}
								</div>
							</div>

							{/* Copy button */}
							<button
								onClick={() => copyToClipboard(color.hex)}
								className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm font-medium flex-shrink-0'
							>
								{copied === color.hex ? t('copied') : t('copy')}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

