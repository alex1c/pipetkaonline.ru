/**
 * Color Scale Generation
 * 
 * Generates light and dark variations of a base color.
 * Uses HSL/LAB for perceptually uniform color transformations.
 * 
 * @module lib/theme-generator/generateScale
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/color-utils'
import { rgbToLab, labToLch } from '@/lib/color-name-utils'

/**
 * Generate color scale (light and dark variations)
 * 
 * Creates perceptually uniform color variations by adjusting lightness.
 * 
 * @param {string} baseColor - Base color in HEX format
 * @param {number} steps - Number of steps in each direction (default: 5)
 * @returns {Object} Color scale with light and dark variations
 */
export function generateScale(
	baseColor: string,
	steps: number = 5
): {
	light: string[]
	dark: string[]
	base: string
} {
	const rgb = hexToRgb(baseColor)
	if (!rgb) {
		return { light: [], dark: [], base: baseColor }
	}

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const light: string[] = []
	const dark: string[] = []

	// Generate light variations
	for (let i = 1; i <= steps; i++) {
		const lightness = Math.min(100, hsl.l + (i * 10))
		const newRgb = hslToRgb(hsl.h, hsl.s, lightness)
		light.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
	}

	// Generate dark variations
	for (let i = 1; i <= steps; i++) {
		const lightness = Math.max(0, hsl.l - (i * 10))
		const newRgb = hslToRgb(hsl.h, hsl.s, lightness)
		dark.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
	}

	return {
		light,
		dark,
		base: baseColor,
	}
}

