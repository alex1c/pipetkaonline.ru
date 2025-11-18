/**
 * Gradient Map Application
 * 
 * Applies gradient map to image based on pixel luminance.
 * 
 * @module lib/gradient-map/applyGradientMap
 */

import { computeLuminance } from './computeLuminance'
import { getColorForLuminance, type GradientStop } from './interpolateColors'
import { hexToRgb } from '@/lib/color-utils'

/**
 * Blend mode types
 */
export type BlendMode =
	| 'normal'
	| 'soft-light'
	| 'overlay'
	| 'color'
	| 'luminosity'
	| 'screen'
	| 'multiply'

/**
 * Apply blend mode to two colors
 * 
 * @param {number} r1 - Red component of base color (0-255)
 * @param {number} g1 - Green component of base color (0-255)
 * @param {number} b1 - Blue component of base color (0-255)
 * @param {number} r2 - Red component of blend color (0-255)
 * @param {number} g2 - Green component of blend color (0-255)
 * @param {number} b2 - Blue component of blend color (0-255)
 * @param {BlendMode} mode - Blend mode
 * @param {number} intensity - Blend intensity (0-1)
 * @returns {{ r: number; g: number; b: number }} Blended color
 */
function applyBlendMode(
	r1: number,
	g1: number,
	b1: number,
	r2: number,
	g2: number,
	b2: number,
	mode: BlendMode,
	intensity: number
): { r: number; g: number; b: number } {
	const t = intensity

	switch (mode) {
		case 'normal':
			return {
				r: Math.round(r1 * (1 - t) + r2 * t),
				g: Math.round(g1 * (1 - t) + g2 * t),
				b: Math.round(b1 * (1 - t) + b2 * t),
			}
		case 'multiply':
			return {
				r: Math.round(r1 * (1 - t) + (r1 * r2 / 255) * t),
				g: Math.round(g1 * (1 - t) + (g1 * g2 / 255) * t),
				b: Math.round(b1 * (1 - t) + (b1 * b2 / 255) * t),
			}
		case 'screen':
			return {
				r: Math.round(r1 * (1 - t) + (255 - (255 - r1) * (255 - r2) / 255) * t),
				g: Math.round(g1 * (1 - t) + (255 - (255 - g1) * (255 - g2) / 255) * t),
				b: Math.round(b1 * (1 - t) + (255 - (255 - b1) * (255 - b2) / 255) * t),
			}
		case 'overlay':
			const overlay = (base: number, blend: number) => {
				return base < 128
					? (2 * base * blend) / 255
					: 255 - (2 * (255 - base) * (255 - blend)) / 255
			}
			return {
				r: Math.round(r1 * (1 - t) + overlay(r1, r2) * t),
				g: Math.round(g1 * (1 - t) + overlay(g1, g2) * t),
				b: Math.round(b1 * (1 - t) + overlay(b1, b2) * t),
			}
		case 'soft-light':
			const softLight = (base: number, blend: number) => {
				return base < 128
					? base - ((255 - 2 * blend) * base * (255 - base)) / (255 * 255)
					: base + ((2 * blend - 255) * (Math.sqrt(base / 255) * 255 - base)) / 255
			}
			return {
				r: Math.round(r1 * (1 - t) + softLight(r1, r2) * t),
				g: Math.round(g1 * (1 - t) + softLight(g1, g2) * t),
				b: Math.round(b1 * (1 - t) + softLight(b1, b2) * t),
			}
		case 'color':
			// Preserve luminance of base, use hue/saturation of blend
			const baseLum = 0.299 * r1 + 0.587 * g1 + 0.114 * b1
			const blendLum = 0.299 * r2 + 0.587 * g2 + 0.114 * b2
			const diff = blendLum - baseLum
			return {
				r: Math.round(r1 * (1 - t) + Math.max(0, Math.min(255, r1 + diff)) * t),
				g: Math.round(g1 * (1 - t) + Math.max(0, Math.min(255, g1 + diff)) * t),
				b: Math.round(b1 * (1 - t) + Math.max(0, Math.min(255, b1 + diff)) * t),
			}
		case 'luminosity':
			// Preserve hue/saturation of base, use luminance of blend
			const baseLum2 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1
			const blendLum2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2
			const diff2 = blendLum2 - baseLum2
			return {
				r: Math.round(r1 * (1 - t) + Math.max(0, Math.min(255, r1 + diff2)) * t),
				g: Math.round(g1 * (1 - t) + Math.max(0, Math.min(255, g1 + diff2)) * t),
				b: Math.round(b1 * (1 - t) + Math.max(0, Math.min(255, b1 + diff2)) * t),
			}
		default:
			return { r: r1, g: g1, b: b1 }
	}
}

/**
 * Apply gradient map to image
 * 
 * @param {ImageData} imageData - Source image data
 * @param {GradientStop[]} stops - Gradient stops (sorted by position)
 * @param {number} intensity - Intensity (0-1)
 * @param {BlendMode} blendMode - Blend mode
 * @param {boolean} useLAB - Whether to use LAB for luminance (default: true)
 * @returns {ImageData} Processed image data
 */
export function applyGradientMap(
	imageData: ImageData,
	stops: GradientStop[],
	intensity: number = 1.0,
	blendMode: BlendMode = 'normal',
	useLAB: boolean = true
): ImageData {
	const output = new ImageData(imageData.width, imageData.height)
	const data = imageData.data
	const outputData = output.data

	// Sort stops by position
	const sortedStops = [...stops].sort((a, b) => a.position - b.position)

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i]
		const g = data[i + 1]
		const b = data[i + 2]
		const a = data[i + 3]

		// Compute luminance
		const luminance = computeLuminance(r, g, b, useLAB)

		// Get color from gradient
		const gradientColor = getColorForLuminance(sortedStops, luminance, useLAB)
		const gradientRgb = hexToRgb(gradientColor)

		if (!gradientRgb) {
			outputData[i] = r
			outputData[i + 1] = g
			outputData[i + 2] = b
			outputData[i + 3] = a
			continue
		}

		// Apply blend mode
		const blended = applyBlendMode(
			r,
			g,
			b,
			gradientRgb.r,
			gradientRgb.g,
			gradientRgb.b,
			blendMode,
			intensity
		)

		outputData[i] = blended.r
		outputData[i + 1] = blended.g
		outputData[i + 2] = blended.b
		outputData[i + 3] = a
	}

	return output
}

