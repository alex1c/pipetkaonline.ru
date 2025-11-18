/**
 * Brightness Adjustment Utilities
 * 
 * Functions for adjusting color brightness while maintaining perceptual uniformity.
 * 
 * @module lib/theme-generator/adjustBrightness
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/color-utils'

/**
 * Adjust color brightness
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Brightness adjustment (-100 to 100)
 * @returns {string} Adjusted color in HEX
 */
export function adjustBrightness(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const newLightness = Math.max(0, Math.min(100, hsl.l + amount))
	const newRgb = hslToRgb(hsl.h, hsl.s, newLightness)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Lighten color
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Lightness amount (0-100)
 * @returns {string} Lightened color in HEX
 */
export function lighten(color: string, amount: number): string {
	return adjustBrightness(color, amount)
}

/**
 * Darken color
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Darkness amount (0-100)
 * @returns {string} Darkened color in HEX
 */
export function darken(color: string, amount: number): string {
	return adjustBrightness(color, -amount)
}

