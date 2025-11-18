/**
 * Text-on-Image Accessibility Hook
 * 
 * Manages state and logic for the Text-on-Image Accessibility Checker tool.
 * 
 * @module hooks/useTextImageAccessibility
 */

'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'
import { calculateContrastRatio } from '@/lib/accessibility/calculateContrast'
import { checkWCAGCompliance, generateRecommendation } from '@/lib/accessibility/wcag'
import type { WCAGCompliance } from '@/lib/accessibility/wcag'

/**
 * Text position
 */
export interface TextPosition {
	horizontal: 'left' | 'center' | 'right'
	vertical: 'top' | 'middle' | 'bottom'
}

/**
 * Text settings
 */
export interface TextSettings {
	text: string
	fontSize: number
	fontWeight: string
	color: string
	shadow: boolean
	background: {
		enabled: boolean
		color: string
		opacity: number
	}
	position: TextPosition
}

/**
 * Analysis result
 */
export interface AnalysisResult {
	contrastRatio: number
	wcag: WCAGCompliance
	recommendation: string
}

/**
 * Text-on-Image Accessibility Hook
 * 
 * @returns {Object} Hook return object
 */
export function useTextImageAccessibility() {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [imageData, setImageData] = useState<ImageData | null>(null)
	const [showHeatmap, setShowHeatmap] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [textSettings, setTextSettings] = useState<TextSettings>({
		text: 'Your text here',
		fontSize: 48,
		fontWeight: 'normal',
		color: '#FFFFFF',
		shadow: true,
		background: {
			enabled: true,
			color: '#000000',
			opacity: 0.5,
		},
		position: {
			horizontal: 'center',
			vertical: 'middle',
		},
	})

	/**
	 * Handle image file upload
	 */
	const handleImageUpload = useCallback((file: File) => {
		setImageFile(file)
		const url = URL.createObjectURL(file)
		setImageUrl(url)

		// Load image and extract image data
		const img = new Image()
		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			// Limit canvas size for performance
			const maxSize = 800
			const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
			canvas.width = img.width * scale
			canvas.height = img.height * scale

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
			const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
			setImageData(data)
		}
		img.src = url
	}, [])

	/**
	 * Update text settings
	 */
	const updateTextSettings = useCallback((updates: Partial<TextSettings>) => {
		setTextSettings((prev) => ({ ...prev, ...updates }))
	}, [])

	/**
	 * Calculate text position coordinates
	 */
	const getTextPosition = useCallback(
		(canvasWidth: number, canvasHeight: number, textWidth: number, textHeight: number) => {
			let x = 0
			let y = 0

			// Horizontal position
			switch (textSettings.position.horizontal) {
				case 'left':
					x = 20
					break
				case 'center':
					x = (canvasWidth - textWidth) / 2
					break
				case 'right':
					x = canvasWidth - textWidth - 20
					break
			}

			// Vertical position
			switch (textSettings.position.vertical) {
				case 'top':
					y = 20 + textHeight
					break
				case 'middle':
					y = (canvasHeight + textHeight) / 2
					break
				case 'bottom':
					y = canvasHeight - 20
					break
			}

			return { x, y }
		},
		[textSettings.position]
	)

	/**
	 * Calculate analysis result
	 */
	const analysisResult = useMemo<AnalysisResult | null>(() => {
		if (!imageData || !canvasRef.current) return null

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return null

		// Get text metrics
		ctx.font = `${textSettings.fontWeight} ${textSettings.fontSize}px sans-serif`
		const metrics = ctx.measureText(textSettings.text)
		const textWidth = metrics.width
		const textHeight = textSettings.fontSize

		// Get text position
		const pos = getTextPosition(canvas.width, canvas.height, textWidth, textHeight)

		// Sample pixels under text
		const sampleSize = Math.min(50, Math.floor(textWidth / 4))
		const sampleHeight = Math.min(50, textHeight)
		const startX = Math.max(0, Math.floor(pos.x))
		const startY = Math.max(0, Math.floor(pos.y - textHeight))
		const endX = Math.min(imageData.width, Math.floor(pos.x + textWidth))
		const endY = Math.min(imageData.height, Math.floor(pos.y))

		// Calculate average background color
		let totalR = 0
		let totalG = 0
		let totalB = 0
		let count = 0

		for (let py = startY; py < endY; py += 2) {
			for (let px = startX; px < endX; px += 2) {
				const index = (py * imageData.width + px) * 4
				totalR += imageData.data[index]
				totalG += imageData.data[index + 1]
				totalB += imageData.data[index + 2]
				count++
			}
		}

		if (count === 0) return null

		const avgR = Math.round(totalR / count)
		const avgG = Math.round(totalG / count)
		const avgB = Math.round(totalB / count)
		const bgColor = rgbToHex(avgR, avgG, avgB)

		// Calculate contrast
		let contrastRatio: number
		if (textSettings.background.enabled) {
			// Contrast against background overlay
			contrastRatio = calculateContrastRatio(textSettings.color, textSettings.background.color)
		} else {
			// Contrast against image
			contrastRatio = calculateContrastRatio(textSettings.color, bgColor)
		}

		const wcag = checkWCAGCompliance(contrastRatio)
		const isLargeText = textSettings.fontSize >= 18
		const recommendation = generateRecommendation(contrastRatio, isLargeText)

		return {
			contrastRatio,
			wcag,
			recommendation,
		}
	}, [imageData, textSettings, getTextPosition])

	return {
		imageFile,
		imageUrl,
		imageData,
		textSettings,
		showHeatmap,
		canvasRef,
		analysisResult,
		handleImageUpload,
		updateTextSettings,
		setShowHeatmap,
		getTextPosition,
	}
}

