/**
 * Color Mixing Utilities
 * 
 * Functions for mixing colors in different color spaces.
 * 
 * @module lib/theme-generator/mixColors
 */

import { hexToRgb, rgbToHex } from '@/lib/color-utils'

/**
 * Mix two colors in RGB space
 * 
 * @param {string} color1 - First color in HEX
 * @param {string} color2 - Second color in HEX
 * @param {number} ratio - Mix ratio (0-1, where 0 = color1, 1 = color2)
 * @returns {string} Mixed color in HEX
 */
export function mixColors(color1: string, color2: string, ratio: number): string {
	const rgb1 = hexToRgb(color1)
	const rgb2 = hexToRgb(color2)

	if (!rgb1 || !rgb2) return color1

	const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio)
	const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio)
	const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)

	return rgbToHex(r, g, b)
}

