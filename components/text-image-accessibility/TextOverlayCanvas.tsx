/**
 * Text Overlay Canvas Component
 * 
 * Renders image with text overlay and optional heatmap.
 * 
 * @component
 */

'use client'

import { useEffect, useRef } from 'react'
import type { TextSettings } from '@/hooks/useTextImageAccessibility'
import { generateHeatmapData } from '@/lib/accessibility/calculateLocalContrastMap'
import { parseColorToRgb } from '@/lib/color-utils'

interface TextOverlayCanvasProps {
	/** Canvas reference */
	canvasRef: React.RefObject<HTMLCanvasElement>
	/** Image URL */
	imageUrl: string | null
	/** Image data */
	imageData: ImageData | null
	/** Text settings */
	textSettings: TextSettings
	/** Show heatmap */
	showHeatmap: boolean
	/** Get text position function */
	getTextPosition: (width: number, height: number, textWidth: number, textHeight: number) => {
		x: number
		y: number
	}
}

/**
 * Text Overlay Canvas Component
 * 
 * @param {TextOverlayCanvasProps} props - Component props
 * @returns {JSX.Element} Text overlay canvas component
 */
export function TextOverlayCanvas({
	canvasRef,
	imageUrl,
	imageData,
	textSettings,
	showHeatmap,
	getTextPosition,
}: TextOverlayCanvasProps) {
	const heatmapCanvasRef = useRef<HTMLCanvasElement>(null)

	/**
	 * Draw canvas
	 */
	useEffect(() => {
		if (!canvasRef.current || !imageUrl) return

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const img = new Image()
		img.onload = () => {
			canvas.width = img.width
			canvas.height = img.height

			// Draw image
			ctx.drawImage(img, 0, 0)

			// Draw background overlay if enabled
			if (textSettings.background.enabled) {
				const rgb = parseColorToRgb(textSettings.background.color)
				if (rgb) {
					ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${textSettings.background.opacity})`
					ctx.fillRect(0, 0, canvas.width, canvas.height)
				}
			}

			// Draw text
			ctx.font = `${textSettings.fontWeight} ${textSettings.fontSize}px sans-serif`
			ctx.textBaseline = 'bottom'

			// Text shadow
			if (textSettings.shadow) {
				ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
				ctx.shadowBlur = 4
				ctx.shadowOffsetX = 2
				ctx.shadowOffsetY = 2
			} else {
				ctx.shadowColor = 'transparent'
				ctx.shadowBlur = 0
				ctx.shadowOffsetX = 0
				ctx.shadowOffsetY = 0
			}

			// Get text metrics
			const metrics = ctx.measureText(textSettings.text)
			const textWidth = metrics.width
			const textHeight = textSettings.fontSize

			// Get position
			const pos = getTextPosition(canvas.width, canvas.height, textWidth, textHeight)

			// Draw text
			ctx.fillStyle = textSettings.color
			ctx.fillText(textSettings.text, pos.x, pos.y)
		}
		img.src = imageUrl
	}, [canvasRef, imageUrl, textSettings, getTextPosition])

	/**
	 * Draw heatmap
	 */
	useEffect(() => {
		if (!showHeatmap || !heatmapCanvasRef.current || !imageData || !canvasRef.current) {
			if (heatmapCanvasRef.current) {
				const ctx = heatmapCanvasRef.current.getContext('2d')
				if (ctx) {
					ctx.clearRect(0, 0, heatmapCanvasRef.current.width, heatmapCanvasRef.current.height)
				}
			}
			return
		}

		const canvas = canvasRef.current
		const heatmapCanvas = heatmapCanvasRef.current
		heatmapCanvas.width = canvas.width
		heatmapCanvas.height = canvas.height

		const ctx = heatmapCanvas.getContext('2d')
		if (!ctx) return

		// Get text color
		const rgb = parseColorToRgb(textSettings.color)
		if (!rgb) return

		// Generate heatmap data
		const heatmap = generateHeatmapData(imageData, rgb.r, rgb.g, rgb.b, 20)

		// Draw heatmap
		const gridSize = 20
		heatmap.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				const x = colIndex * gridSize
				const y = rowIndex * gridSize

				let color = 'rgba(255, 0, 0, 0.3)' // Red for low
				if (cell.level === 'high') {
					color = 'rgba(0, 255, 0, 0.3)' // Green for high
				} else if (cell.level === 'medium') {
					color = 'rgba(255, 255, 0, 0.3)' // Yellow for medium
				}

				ctx.fillStyle = color
				ctx.fillRect(x, y, gridSize, gridSize)
			})
		})
	}, [showHeatmap, imageData, textSettings.color, canvasRef, getTextPosition])

	return (
		<div className='relative inline-block'>
			<canvas
				ref={canvasRef}
				className='max-w-full h-auto border border-slate-300 rounded-lg shadow-md'
			/>
			{showHeatmap && (
				<canvas
					ref={heatmapCanvasRef}
					className='absolute top-0 left-0 max-w-full h-auto border border-slate-300 rounded-lg pointer-events-none'
					style={{ mixBlendMode: 'multiply' }}
				/>
			)}
		</div>
	)
}

