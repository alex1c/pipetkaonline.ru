/**
 * Luminance Computation Utilities
 * 
 * Functions for computing pixel luminance/lightness.
 * Supports HSL L and LAB L methods.
 * 
 * @module lib/gradient-map/computeLuminance
 */

import { rgbToHsl } from '@/lib/color-utils'
import { rgbToLab } from '@/lib/color-name-utils'

/**
 * Compute luminance using HSL lightness
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Lightness value (0-100)
 */
export function computeLuminanceHSL(r: number, g: number, b: number): number {
	const hsl = rgbToHsl(r, g, b)
	return hsl.l
}

/**
 * Compute luminance using LAB L
 * 
 * More perceptually uniform than HSL.
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} L value (0-100)
 */
export function computeLuminanceLAB(r: number, g: number, b: number): number {
	const lab = rgbToLab(r, g, b)
	return lab.l
}

/**
 * Compute normalized luminance (0-1)
 * 
 * Uses LAB for better perceptual uniformity.
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @param {boolean} useLAB - Whether to use LAB (default: true)
 * @returns {number} Normalized luminance (0-1)
 */
export function computeLuminance(
	r: number,
	g: number,
	b: number,
	useLAB: boolean = true
): number {
	const luminance = useLAB ? computeLuminanceLAB(r, g, b) : computeLuminanceHSL(r, g, b)
	return luminance / 100
}

