/**
 * Technical Info Component
 * 
 * Displays technical information about the selected color.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface TechnicalInfoProps {
	/** Color formats */
	formats: {
		hex: string
		rgb: string
		hsl: string
		luminance: number
	}
	/** Contrast information */
	contrast: {
		black: { ratio: number; wcag: { aaSmall: boolean; aaLarge: boolean; aaa: boolean } }
		white: { ratio: number; wcag: { aaSmall: boolean; aaLarge: boolean; aaa: boolean } }
	}
	/** Callback to copy color */
	onCopy: (format: 'hex' | 'rgb' | 'hsl') => void
}

/**
 * Technical Info Component
 * 
 * @param {TechnicalInfoProps} props - Component props
 * @returns {JSX.Element} Technical info component
 */
export function TechnicalInfo({ formats, contrast, onCopy }: TechnicalInfoProps) {
	const t = useTranslations('tools.solidBackground')
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Handle copy
	 */
	const handleCopy = async (format: 'hex' | 'rgb' | 'hsl') => {
		await onCopy(format)
		setCopied(format)
		setTimeout(() => setCopied(null), 2000)
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('technicalInfo')}</h3>

			{/* Color Formats */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-slate-700'>{t('hex')}:</span>
					<div className='flex items-center gap-2'>
						<code className='text-sm font-mono text-slate-900'>{formats.hex}</code>
						<button
							onClick={() => handleCopy('hex')}
							className={`
								px-2 py-1 rounded text-xs font-medium transition-colors
								${
									copied === 'hex'
										? 'bg-green-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{copied === 'hex' ? '✓' : t('copyColor')}
						</button>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-slate-700'>{t('rgb')}:</span>
					<div className='flex items-center gap-2'>
						<code className='text-sm font-mono text-slate-900'>{formats.rgb}</code>
						<button
							onClick={() => handleCopy('rgb')}
							className={`
								px-2 py-1 rounded text-xs font-medium transition-colors
								${
									copied === 'rgb'
										? 'bg-green-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{copied === 'rgb' ? '✓' : t('copyColor')}
						</button>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-slate-700'>{t('hsl')}:</span>
					<div className='flex items-center gap-2'>
						<code className='text-sm font-mono text-slate-900'>{formats.hsl}</code>
						<button
							onClick={() => handleCopy('hsl')}
							className={`
								px-2 py-1 rounded text-xs font-medium transition-colors
								${
									copied === 'hsl'
										? 'bg-green-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{copied === 'hsl' ? '✓' : t('copyColor')}
						</button>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-slate-700'>{t('luminance')}:</span>
					<code className='text-sm font-mono text-slate-900'>{formats.luminance}</code>
				</div>
			</div>

			{/* Contrast Info */}
			<div className='pt-4 border-t border-slate-200 space-y-3'>
				<div>
					<div className='flex items-center justify-between mb-1'>
						<span className='text-sm font-medium text-slate-700'>
							{t('contrastBlack')}:
						</span>
						<span className='text-sm text-slate-900'>{contrast.black.ratio}:1</span>
					</div>
					<div className='flex gap-2 text-xs'>
						<span
							className={
								contrast.black.wcag.aaSmall ? 'text-green-600' : 'text-red-600'
							}
						>
							AA Small: {contrast.black.wcag.aaSmall ? '✓' : '✗'}
						</span>
						<span
							className={
								contrast.black.wcag.aaLarge ? 'text-green-600' : 'text-red-600'
							}
						>
							AA Large: {contrast.black.wcag.aaLarge ? '✓' : '✗'}
						</span>
						<span
							className={contrast.black.wcag.aaa ? 'text-green-600' : 'text-red-600'}
						>
							AAA: {contrast.black.wcag.aaa ? '✓' : '✗'}
						</span>
					</div>
				</div>

				<div>
					<div className='flex items-center justify-between mb-1'>
						<span className='text-sm font-medium text-slate-700'>
							{t('contrastWhite')}:
						</span>
						<span className='text-sm text-slate-900'>{contrast.white.ratio}:1</span>
					</div>
					<div className='flex gap-2 text-xs'>
						<span
							className={
								contrast.white.wcag.aaSmall ? 'text-green-600' : 'text-red-600'
							}
						>
							AA Small: {contrast.white.wcag.aaSmall ? '✓' : '✗'}
						</span>
						<span
							className={
								contrast.white.wcag.aaLarge ? 'text-green-600' : 'text-red-600'
							}
						>
							AA Large: {contrast.white.wcag.aaLarge ? '✓' : '✗'}
						</span>
						<span
							className={contrast.white.wcag.aaa ? 'text-green-600' : 'text-red-600'}
						>
							AAA: {contrast.white.wcag.aaa ? '✓' : '✗'}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

