/**
 * Contrast Calculation Utilities
 * 
 * Functions for calculating color contrast according to WCAG 2.1 guidelines.
 * Uses relative luminance (L') formula.
 * 
 * @module lib/accessibility/calculateContrast
 */

import { hexToRgb } from '@/lib/color-utils'

/**
 * Calculate relative luminance of a color
 * 
 * Formula from WCAG 2.1: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * where R, G, B are normalized to 0-1 range
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Relative luminance (0-1)
 */
export function calculateRelativeLuminance(r: number, g: number, b: number): number {
	// Normalize to 0-1 range
	const normalize = (val: number) => {
		val = val / 255
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
	}

	const rNorm = normalize(r)
	const gNorm = normalize(g)
	const bNorm = normalize(b)

	// Calculate relative luminance
	return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm
}

/**
 * Calculate contrast ratio between two colors
 * 
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter color and L2 is the darker color
 * 
 * @param {string} color1 - First color in HEX format
 * @param {string} color2 - Second color in HEX format
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
	const rgb1 = hexToRgb(color1)
	const rgb2 = hexToRgb(color2)

	if (!rgb1 || !rgb2) return 0

	const l1 = calculateRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
	const l2 = calculateRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)

	const lighter = Math.max(l1, l2)
	const darker = Math.min(l1, l2)

	return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Calculate contrast ratio from RGB values
 * 
 * @param {number} r1 - Red component of first color (0-255)
 * @param {number} g1 - Green component of first color (0-255)
 * @param {number} b1 - Blue component of first color (0-255)
 * @param {number} r2 - Red component of second color (0-255)
 * @param {number} g2 - Green component of second color (0-255)
 * @param {number} b2 - Blue component of second color (0-255)
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatioRGB(
	r1: number,
	g1: number,
	b1: number,
	r2: number,
	g2: number,
	b2: number
): number {
	const l1 = calculateRelativeLuminance(r1, g1, b1)
	const l2 = calculateRelativeLuminance(r2, g2, b2)

	const lighter = Math.max(l1, l2)
	const darker = Math.min(l1, l2)

	return (lighter + 0.05) / (darker + 0.05)
}

