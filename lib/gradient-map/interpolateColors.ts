/**
 * Color Interpolation Utilities
 * 
 * Functions for interpolating colors between gradient stops.
 * Supports HSL and LAB color spaces.
 * 
 * @module lib/gradient-map/interpolateColors
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/color-utils'
import { rgbToLab, labToRgb } from '@/lib/color-name-utils'

/**
 * Gradient stop point
 */
export interface GradientStop {
	position: number // 0-1
	color: string // HEX
}

/**
 * Interpolate color in HSL space
 * 
 * @param {GradientStop} stop1 - First gradient stop
 * @param {GradientStop} stop2 - Second gradient stop
 * @param {number} t - Interpolation factor (0-1)
 * @returns {string} Interpolated color in HEX
 */
export function interpolateHSL(stop1: GradientStop, stop2: GradientStop, t: number): string {
	const rgb1 = hexToRgb(stop1.color)
	const rgb2 = hexToRgb(stop2.color)

	if (!rgb1 || !rgb2) return stop1.color

	const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b)
	const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b)

	// Handle hue wrapping
	let h1 = hsl1.h
	let h2 = hsl2.h
	const hDiff = h2 - h1
	if (Math.abs(hDiff) > 180) {
		if (hDiff > 0) {
			h1 += 360
		} else {
			h2 += 360
		}
	}

	const h = (h1 + (h2 - h1) * t) % 360
	const s = hsl1.s + (hsl2.s - hsl1.s) * t
	const l = hsl1.l + (hsl2.l - hsl1.l) * t

	const rgb = hslToRgb(h, s, l)
	return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * Interpolate color in LAB space
 * 
 * More perceptually uniform than HSL.
 * 
 * @param {GradientStop} stop1 - First gradient stop
 * @param {GradientStop} stop2 - Second gradient stop
 * @param {number} t - Interpolation factor (0-1)
 * @returns {string} Interpolated color in HEX
 */
export function interpolateLAB(stop1: GradientStop, stop2: GradientStop, t: number): string {
	const rgb1 = hexToRgb(stop1.color)
	const rgb2 = hexToRgb(stop2.color)

	if (!rgb1 || !rgb2) return stop1.color

	const lab1 = rgbToLab(rgb1.r, rgb1.g, rgb1.b)
	const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b)

	const l = lab1.l + (lab2.l - lab1.l) * t
	const a = lab1.a + (lab2.a - lab1.a) * t
	const b = lab1.b + (lab2.b - lab1.b) * t

	const rgb = labToRgb({ l, a, b })
	return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * Find color for given luminance value
 * 
 * @param {GradientStop[]} stops - Gradient stops (sorted by position)
 * @param {number} luminance - Luminance value (0-1)
 * @param {boolean} useLAB - Whether to use LAB interpolation (default: true)
 * @returns {string} Color in HEX
 */
export function getColorForLuminance(
	stops: GradientStop[],
	luminance: number,
	useLAB: boolean = true
): string {
	if (stops.length === 0) return '#000000'
	if (stops.length === 1) return stops[0].color

	// Clamp luminance
	luminance = Math.max(0, Math.min(1, luminance))

	// Find surrounding stops
	for (let i = 0; i < stops.length - 1; i++) {
		const stop1 = stops[i]
		const stop2 = stops[i + 1]

		if (luminance >= stop1.position && luminance <= stop2.position) {
			// Interpolate between stops
			const range = stop2.position - stop1.position
			if (range === 0) return stop1.color

			const t = (luminance - stop1.position) / range
			return useLAB ? interpolateLAB(stop1, stop2, t) : interpolateHSL(stop1, stop2, t)
		}
	}

	// Clamp to nearest stop
	if (luminance <= stops[0].position) {
		return stops[0].color
	}
	return stops[stops.length - 1].color
}

