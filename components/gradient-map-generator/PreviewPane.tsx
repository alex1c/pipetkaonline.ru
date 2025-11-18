/**
 * Preview Pane Component
 * 
 * Displays image preview with before/after/split view modes.
 * 
 * @component
 */

'use client'

import { useEffect, useRef } from 'react'
import type { PreviewMode } from '@/hooks/useGradientMapGenerator'

interface PreviewPaneProps {
	/** Input canvas reference */
	inputCanvasRef: React.RefObject<HTMLCanvasElement>
	/** Output canvas reference */
	outputCanvasRef: React.RefObject<HTMLCanvasElement>
	/** Image URL */
	imageUrl: string | null
	/** Image data */
	imageData: ImageData | null
	/** Processed image data */
	processedImageData: ImageData | null
	/** Preview mode */
	previewMode: PreviewMode
	/** Split position (0-100) */
	splitPosition: number
	/** Callback when preview mode changes */
	onPreviewModeChange: (mode: PreviewMode) => void
	/** Callback when split position changes */
	onSplitPositionChange: (position: number) => void
}

/**
 * Preview Pane Component
 * 
 * @param {PreviewPaneProps} props - Component props
 * @returns {JSX.Element} Preview pane component
 */
export function PreviewPane({
	inputCanvasRef,
	outputCanvasRef,
	imageUrl,
	imageData,
	processedImageData,
	previewMode,
	splitPosition,
	onPreviewModeChange,
	onSplitPositionChange,
}: PreviewPaneProps) {
	/**
	 * Draw input canvas
	 */
	useEffect(() => {
		if (!inputCanvasRef.current || !imageUrl) return

		const canvas = inputCanvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const img = new Image()
		img.onload = () => {
			canvas.width = img.width
			canvas.height = img.height
			ctx.drawImage(img, 0, 0)
		}
		img.src = imageUrl
	}, [inputCanvasRef, imageUrl])

	/**
	 * Draw output canvas
	 */
	useEffect(() => {
		if (!outputCanvasRef.current || !processedImageData) return

		const canvas = outputCanvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = processedImageData.width
		canvas.height = processedImageData.height
		ctx.putImageData(processedImageData, 0, 0)
	}, [outputCanvasRef, processedImageData])

	/**
	 * Handle split slider
	 */
	const handleSplitSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSplitPositionChange(parseFloat(e.target.value))
	}

	if (!imageUrl) {
		return (
			<div className='bg-slate-100 rounded-lg p-12 text-center'>
				<p className='text-slate-500'>Upload an image to see preview</p>
			</div>
		)
	}

	return (
		<div className='space-y-4'>
			{/* Preview Mode Toggle */}
			<div className='flex gap-2'>
				{(['before', 'after', 'split'] as PreviewMode[]).map((mode) => (
					<button
						key={mode}
						onClick={() => onPreviewModeChange(mode)}
						className={`
							px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
							${
								previewMode === mode
									? 'bg-blue-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{mode === 'split' ? 'Split View' : mode}
					</button>
				))}
			</div>

			{/* Preview Container */}
			<div className='relative bg-slate-900 rounded-lg overflow-hidden'>
				{previewMode === 'before' && (
					<canvas
						ref={inputCanvasRef}
						className='w-full h-auto block'
					/>
				)}

				{previewMode === 'after' && (
					<canvas
						ref={outputCanvasRef}
						className='w-full h-auto block'
					/>
				)}

				{previewMode === 'split' && (
					<div className='relative'>
						<canvas
							ref={inputCanvasRef}
							className='w-full h-auto block'
						/>
						<div
							className='absolute top-0 left-0 w-full h-full overflow-hidden'
							style={{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }}
						>
							<canvas
								ref={outputCanvasRef}
								className='w-full h-auto block'
							/>
						</div>
						<div
							className='absolute top-0 w-1 h-full bg-white cursor-col-resize z-10'
							style={{ left: `${splitPosition}%` }}
						/>
						<input
							type='range'
							min='0'
							max='100'
							step='0.1'
							value={splitPosition}
							onChange={handleSplitSlider}
							className='absolute top-0 left-0 w-full h-full opacity-0 cursor-col-resize z-20'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

