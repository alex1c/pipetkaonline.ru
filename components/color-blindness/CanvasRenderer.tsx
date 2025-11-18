'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ColorBlindnessType } from '@/hooks/useColorBlindness'

interface CanvasRendererProps {
	imageUrl: string | null
	type: ColorBlindnessType
	splitView: boolean
	compareMode: boolean
	onSimulationApply: (
		canvas: HTMLCanvasElement,
		image: HTMLImageElement,
		type: ColorBlindnessType
	) => void
	canvasRef: React.RefObject<HTMLCanvasElement>
	originalCanvasRef: React.RefObject<HTMLCanvasElement>
}

/**
 * Component for rendering image with color blindness simulation on canvas
 * Supports split view and compare mode
 */
export function CanvasRenderer({
	imageUrl,
	type,
	splitView,
	compareMode,
	onSimulationApply,
	canvasRef,
	originalCanvasRef,
}: CanvasRendererProps) {
	const t = useTranslations('tools.colorBlindnessSimulator')
	const imageRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		if (!imageUrl || !canvasRef.current) return

		const img = new Image()
		img.crossOrigin = 'anonymous'
		img.onload = () => {
			imageRef.current = img

			// Render to main canvas
			if (canvasRef.current) {
				onSimulationApply(canvasRef.current, img, type)
			}

			// Render original to original canvas if needed
			if (originalCanvasRef.current && (splitView || compareMode)) {
				const ctx = originalCanvasRef.current.getContext('2d')
				if (ctx) {
					originalCanvasRef.current.width = img.naturalWidth
					originalCanvasRef.current.height = img.naturalHeight
					ctx.drawImage(img, 0, 0)
				}
			}
		}
		img.src = imageUrl
	}, [imageUrl, type, splitView, compareMode, onSimulationApply, canvasRef, originalCanvasRef])

	if (!imageUrl) return null

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>
				{t('canvas.title')}
			</h3>

			{compareMode ? (
				<div className='grid md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-700 text-center'>
							{t('canvas.original')}
						</p>
						<div className='border-2 border-slate-200 rounded-lg overflow-hidden'>
							<canvas
								ref={originalCanvasRef}
								className='w-full h-auto max-h-[500px] object-contain'
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-700 text-center'>
							{t('canvas.simulated')} ({t(`controls.type.${type}.name`)})
						</p>
						<div className='border-2 border-slate-200 rounded-lg overflow-hidden'>
							<canvas
								ref={canvasRef}
								className='w-full h-auto max-h-[500px] object-contain'
							/>
						</div>
					</div>
				</div>
			) : splitView ? (
				<div className='relative border-2 border-slate-200 rounded-lg overflow-hidden'>
					<div className='relative w-full' style={{ aspectRatio: '2/1' }}>
						{/* Original half */}
						<div className='absolute left-0 top-0 w-1/2 h-full overflow-hidden'>
							<canvas
								ref={originalCanvasRef}
								className='w-full h-full object-contain'
							/>
						</div>
						{/* Simulated half */}
						<div className='absolute right-0 top-0 w-1/2 h-full overflow-hidden'>
							<canvas
								ref={canvasRef}
								className='w-full h-full object-contain'
							/>
						</div>
						{/* Divider line */}
						<div className='absolute top-0 left-1/2 w-0.5 h-full bg-slate-400 pointer-events-none transform -translate-x-1/2' />
						{/* Labels */}
						<div className='absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-md text-sm font-medium text-slate-700'>
							{t('canvas.original')}
						</div>
						<div className='absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-md text-sm font-medium text-slate-700'>
							{t('canvas.simulated')}
						</div>
					</div>
				</div>
			) : (
				<div className='border-2 border-slate-200 rounded-lg overflow-hidden'>
					<canvas
						ref={canvasRef}
						className='w-full h-auto max-h-[600px] object-contain'
					/>
				</div>
			)}
		</div>
	)
}

