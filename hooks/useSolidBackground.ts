/**
 * Solid Background Hook
 * 
 * Manages state and logic for the Solid Background Generator tool.
 * 
 * @module hooks/useSolidBackground
 */

'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { parseColorToRgb, hexToRgb, rgbToHsl, hexToHsl } from '@/lib/color-utils'
import { calculateRelativeLuminance } from '@/lib/accessibility/calculateContrast'
import { checkWCAGCompliance } from '@/lib/accessibility/wcag'

/**
 * Background size preset
 */
export interface BackgroundSize {
	name: string
	width: number
	height: number
}

/**
 * Solid Background Hook
 * 
 * @returns {Object} Hook return object
 */
export function useSolidBackground() {
	const [selectedColor, setSelectedColor] = useState<string>('#3B82F6')
	const [history, setHistory] = useState<string[]>([])

	/**
	 * Background size presets
	 */
	const sizes: BackgroundSize[] = [
		{ name: 'Desktop', width: 1920, height: 1080 },
		{ name: 'Square', width: 1080, height: 1080 },
		{ name: 'Portrait', width: 1080, height: 1920 },
		{ name: 'Social', width: 1200, height: 628 },
	]

	/**
	 * Load history from localStorage
	 */
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('solidBackgroundHistory')
			if (saved) {
				try {
					const parsed = JSON.parse(saved)
					setHistory(Array.isArray(parsed) ? parsed : [])
				} catch (e) {
					console.error('Failed to load history', e)
				}
			}
		}
	}, [])

	/**
	 * Save history to localStorage
	 */
	useEffect(() => {
		if (typeof window !== 'undefined' && history.length > 0) {
			localStorage.setItem('solidBackgroundHistory', JSON.stringify(history))
		}
	}, [history])

	/**
	 * Handle color change
	 */
	const handleColorChange = useCallback((color: string) => {
		setSelectedColor(color)

		// Add to history (keep last 8)
		setHistory((prev) => {
			const filtered = prev.filter((c) => c !== color)
			return [color, ...filtered].slice(0, 8)
		})
	}, [])

	/**
	 * Get color formats
	 */
	const colorFormats = useMemo(() => {
		const rgb = hexToRgb(selectedColor)
		const hsl = hexToHsl(selectedColor)

		if (!rgb || !hsl) {
			return {
				hex: selectedColor,
				rgb: 'N/A',
				hsl: 'N/A',
				luminance: 0,
			}
		}

		const luminance = calculateRelativeLuminance(rgb.r, rgb.g, rgb.b)

		return {
			hex: selectedColor,
			rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
			luminance: Math.round(luminance * 100) / 100,
		}
	}, [selectedColor])

	/**
	 * Calculate contrast with black and white
	 */
	const contrast = useMemo(() => {
		const rgb = hexToRgb(selectedColor)
		if (!rgb) {
			return {
				black: { ratio: 0, wcag: { aaSmall: false, aaLarge: false, aaa: false } },
				white: { ratio: 0, wcag: { aaSmall: false, aaLarge: false, aaa: false } },
			}
		}

		const blackLum = calculateRelativeLuminance(0, 0, 0)
		const whiteLum = calculateRelativeLuminance(255, 255, 255)
		const colorLum = calculateRelativeLuminance(rgb.r, rgb.g, rgb.b)

		const contrastBlack = (Math.max(colorLum, blackLum) + 0.05) / (Math.min(colorLum, blackLum) + 0.05)
		const contrastWhite = (Math.max(colorLum, whiteLum) + 0.05) / (Math.min(colorLum, whiteLum) + 0.05)

		return {
			black: {
				ratio: Math.round(contrastBlack * 100) / 100,
				wcag: checkWCAGCompliance(contrastBlack),
			},
			white: {
				ratio: Math.round(contrastWhite * 100) / 100,
				wcag: checkWCAGCompliance(contrastWhite),
			},
		}
	}, [selectedColor])

	/**
	 * Copy color to clipboard
	 */
	const copyColor = useCallback(async (format: 'hex' | 'rgb' | 'hsl' = 'hex') => {
		let text = ''
		switch (format) {
			case 'hex':
				text = colorFormats.hex
				break
			case 'rgb':
				text = colorFormats.rgb
				break
			case 'hsl':
				text = colorFormats.hsl
				break
		}
		await navigator.clipboard.writeText(text)
	}, [colorFormats])

	/**
	 * Download background as image
	 */
	const downloadBackground = useCallback(
		async (format: 'png' | 'jpg' | 'webp', size: BackgroundSize) => {
			const canvas = document.createElement('canvas')
			canvas.width = size.width
			canvas.height = size.height

			const ctx = canvas.getContext('2d')
			if (!ctx) return

			// Fill with color
			ctx.fillStyle = selectedColor
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Convert to blob and download
			const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`
			canvas.toBlob(
				(blob) => {
					if (!blob) return
					const url = URL.createObjectURL(blob)
					const a = document.createElement('a')
					a.href = url
					a.download = `solid-background-${size.width}x${size.height}.${format}`
					a.click()
					URL.revokeObjectURL(url)
				},
				mimeType,
				format === 'jpg' ? 0.92 : 1.0
			)
		},
		[selectedColor]
	)

	return {
		selectedColor,
		history,
		sizes,
		colorFormats,
		contrast,
		handleColorChange,
		copyColor,
		downloadBackground,
	}
}

