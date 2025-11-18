/**
 * Contrast Pair Generation
 * 
 * Functions for generating color pairs with sufficient contrast for text readability.
 * Uses WCAG guidelines and ΔE for perceptual uniformity.
 * 
 * @module lib/theme-generator/generateContrastPair
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/color-utils'
import { calculateLuma } from '@/lib/colorMath'

/**
 * Calculate contrast ratio between two colors
 * 
 * @param {string} color1 - First color in HEX
 * @param {string} color2 - Second color in HEX
 * @returns {number} Contrast ratio
 */
function calculateContrastRatio(color1: string, color2: string): number {
	const rgb1 = hexToRgb(color1)
	const rgb2 = hexToRgb(color2)

	if (!rgb1 || !rgb2) return 0

	const luma1 = calculateLuma(rgb1.r, rgb1.g, rgb1.b)
	const luma2 = calculateLuma(rgb2.r, rgb2.g, rgb2.b)

	const lighter = Math.max(luma1, luma2)
	const darker = Math.min(luma1, luma2)

	return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Generate foreground color with sufficient contrast
 * 
 * @param {string} backgroundColor - Background color in HEX
 * @param {number} minContrast - Minimum contrast ratio (default: 4.5 for WCAG AA)
 * @returns {string} Foreground color in HEX (white or black)
 */
export function generateContrastPair(
	backgroundColor: string,
	minContrast: number = 4.5
): string {
	const rgb = hexToRgb(backgroundColor)
	if (!rgb) return '#000000'

	const luma = calculateLuma(rgb.r, rgb.g, rgb.b)

	// Try white first
	const whiteContrast = calculateContrastRatio(backgroundColor, '#FFFFFF')
	if (whiteContrast >= minContrast) {
		return '#FFFFFF'
	}

	// Try black
	const blackContrast = calculateContrastRatio(backgroundColor, '#000000')
	if (blackContrast >= minContrast) {
		return '#000000'
	}

	// If neither works, return the one with better contrast
	return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}

/**
 * Generate optimal foreground color with high contrast
 * 
 * @param {string} backgroundColor - Background color in HEX
 * @returns {string} Optimal foreground color in HEX
 */
export function generateOptimalForeground(backgroundColor: string): string {
	return generateContrastPair(backgroundColor, 4.5)
}

