/**
 * Pattern Preview Component
 * 
 * Displays large preview of the pattern with tiling.
 * 
 * @component
 */

'use client'

import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import type { PatternSettings } from '@/lib/pattern-renderers/types'
import { renderPattern } from '@/lib/pattern-renderers/base'

interface PatternPreviewProps {
	/** Pattern settings */
	settings: PatternSettings
	/** Canvas ref */
	canvasRef: React.RefObject<HTMLCanvasElement>
}

/**
 * Pattern Preview Component
 * 
 * @param {PatternPreviewProps} props - Component props
 * @returns {JSX.Element} Pattern preview component
 */
export function PatternPreview({ settings, canvasRef }: PatternPreviewProps) {
	const t = useTranslations('tools.patternGenerator')
	const previewRef = useRef<HTMLDivElement>(null)

	/**
	 * Update preview background
	 */
	useEffect(() => {
		if (!canvasRef.current || !previewRef.current) return

		// Render pattern to canvas
		renderPattern(canvasRef.current, settings)

		// Create data URL for background
		const dataUrl = canvasRef.current.toDataURL('image/png')
		previewRef.current.style.backgroundImage = `url(${dataUrl})`
	}, [settings, canvasRef])

	return (
		<div className='space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('preview')}</h3>

			{/* Hidden canvas for pattern generation */}
			<canvas ref={canvasRef} className='hidden' />

			{/* Large preview area */}
			<div
				ref={previewRef}
				className='w-full h-[600px] rounded-lg border-2 border-slate-200 bg-slate-50'
				style={{
					backgroundRepeat: 'repeat',
					backgroundSize: `${settings.tileSize}px ${settings.tileSize}px`,
				}}
			/>
		</div>
	)
}

