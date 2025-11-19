'use client'

import { useMemo } from 'react'
import { rgbToHsl, hslToRgb, rgbToHex } from '@/lib/color-utils'

interface SimilarColor {
	hex: string
	rgb: { r: number; g: number; b: number }
}

/**
 * Hook for generating similar colors
 * Generates 10 similar shades by varying lightness and saturation
 */
export function useSimilarColors(
	baseColor: { r: number; g: number; b: number } | null
) {
	const similarColors = useMemo<SimilarColor[]>(() => {
		if (!baseColor) return []

		const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b)
		const colors: SimilarColor[] = []

		// Generate 10 similar colors
		for (let i = 0; i < 10; i++) {
			// Vary lightness by ±20% and saturation by ±15%
			const lightnessOffset = (Math.random() - 0.5) * 40
			const saturationOffset = (Math.random() - 0.5) * 30

			const newL = Math.max(0, Math.min(100, hsl.l + lightnessOffset))
			const newS = Math.max(0, Math.min(100, hsl.s + saturationOffset))
			const newH = hsl.h + (Math.random() - 0.5) * 10 // Slight hue variation

			const rgb = hslToRgb(newH, newS, newL)
			colors.push({
				hex: rgbToHex(rgb.r, rgb.g, rgb.b),
				rgb,
			})
		}

		return colors
	}, [baseColor])

	return similarColors
}



