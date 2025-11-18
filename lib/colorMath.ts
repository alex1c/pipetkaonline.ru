/**
 * Color Math Utilities
 * 
 * Advanced color manipulation and analysis functions for color extraction.
 * Provides mathematical operations for color clustering, grouping, and analysis.
 * 
 * Features:
 * - Color space conversions (RGB, HSL, Luma)
 * - Color distance calculations
 * - Lightness/darkness operations
 * - Semantic color classification
 * - Color family detection
 * 
 * @module lib/colorMath
 */

import { rgbToHsl as rgbToHslUtil, hslToRgb as hslToRgbUtil, hexToRgb, rgbToHex } from './color-utils'

/**
 * Convert RGB to HSL
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {{ h: number; s: number; l: number }} HSL object
 */
export function rgbToHslMath(r: number, g: number, b: number): {
	h: number
	s: number
	l: number
} {
	return rgbToHslUtil(r, g, b)
}

/**
 * Convert HSL to RGB
 * 
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {{ r: number; g: number; b: number }} RGB object
 */
export function hslToRgbMath(h: number, s: number, l: number): {
	r: number
	g: number
	b: number
} {
	return hslToRgbUtil(h, s, l)
}

/**
 * Calculate relative luminance (perceived brightness)
 * 
 * Uses the WCAG formula for relative luminance calculation.
 * This is more accurate than simple average for human perception.
 * 
 * Formula: L = 0.2126*R + 0.7152*G + 0.0722*B
 * (normalized to 0-1 range)
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Luma value (0-1, where 1 is brightest)
 */
export function calculateLuma(r: number, g: number, b: number): number {
	// Normalize to 0-1
	const rNorm = r / 255
	const gNorm = g / 255
	const bNorm = b / 255

	// Apply gamma correction
	const rGamma = rNorm <= 0.03928 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4)
	const gGamma = gNorm <= 0.03928 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4)
	const bGamma = bNorm <= 0.03928 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4)

	// Calculate relative luminance
	return 0.2126 * rGamma + 0.7152 * gGamma + 0.0722 * bGamma
}

/**
 * Calculate lightness (simple average method)
 * 
 * Alternative to luma, uses simple average of RGB values.
 * Faster but less perceptually accurate.
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Lightness value (0-100)
 */
export function calculateLightness(r: number, g: number, b: number): number {
	const hsl = rgbToHslUtil(r, g, b)
	return hsl.l
}

/**
 * Lighten a color by a percentage
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Lightness amount (0-100)
 * @returns {string} Lightened color in HEX format
 */
export function lightenColor(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHslUtil(rgb.r, rgb.g, rgb.b)
	const newLightness = Math.min(100, hsl.l + amount)
	const newRgb = hslToRgbUtil(hsl.h, hsl.s, newLightness)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Darken a color by a percentage
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Darkness amount (0-100)
 * @returns {string} Darkened color in HEX format
 */
export function darkenColor(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHslUtil(rgb.r, rgb.g, rgb.b)
	const newLightness = Math.max(0, hsl.l - amount)
	const newRgb = hslToRgbUtil(hsl.h, hsl.s, newLightness)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Calculate color distance (Euclidean distance in RGB space)
 * 
 * Used for color clustering and similarity calculations.
 * 
 * Formula: sqrt((r1-r2)² + (g1-g2)² + (b1-b2)²)
 * 
 * @param {Object} color1 - First color in RGB
 * @param {number} color1.r - Red component (0-255)
 * @param {number} color1.g - Green component (0-255)
 * @param {number} color1.b - Blue component (0-255)
 * @param {Object} color2 - Second color in RGB
 * @param {number} color2.r - Red component (0-255)
 * @param {number} color2.g - Green component (0-255)
 * @param {number} color2.b - Blue component (0-255)
 * @returns {number} Distance value (0-441.67, where 0 is identical)
 */
export function colorDistance(
	color1: { r: number; g: number; b: number },
	color2: { r: number; g: number; b: number }
): number {
	const dr = color1.r - color2.r
	const dg = color1.g - color2.g
	const db = color1.b - color2.b
	return Math.sqrt(dr * dr + dg * dg + db * db)
}

/**
 * Get color family based on hue
 * 
 * Classifies color into semantic families based on hue value.
 * 
 * Families:
 * - Warm: Red, Orange, Yellow (0-60, 330-360)
 * - Cold: Cyan, Blue, Purple (180-270)
 * - Neutral: Gray tones (low saturation)
 * - Vibrant: High saturation colors
 * - Muted: Low saturation colors
 * - Pastel: Light colors with medium saturation
 * - Earth tones: Brown, beige, tan (20-40 hue, medium saturation)
 * 
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Color family name
 */
export function getHueFamily(h: number, s: number, l: number): string {
	// Neutral (low saturation)
	if (s < 15) {
		return 'neutral'
	}

	// Earth tones (brown, beige, tan)
	if (h >= 20 && h <= 40 && s >= 20 && s <= 60 && l >= 30 && l <= 70) {
		return 'earth'
	}

	// Pastel (light with medium saturation)
	if (l >= 70 && s >= 30 && s <= 60) {
		return 'pastel'
	}

	// Vibrant (high saturation)
	if (s >= 70) {
		if ((h >= 0 && h <= 60) || (h >= 330 && h <= 360)) {
			return 'warm'
		}
		if (h >= 180 && h <= 270) {
			return 'cold'
		}
		return 'vibrant'
	}

	// Muted (medium saturation)
	if (s >= 30 && s < 70) {
		if ((h >= 0 && h <= 60) || (h >= 330 && h <= 360)) {
			return 'warm'
		}
		if (h >= 180 && h <= 270) {
			return 'cold'
		}
	}

	// Warm colors (red, orange, yellow)
	if ((h >= 0 && h <= 60) || (h >= 330 && h <= 360)) {
		return 'warm'
	}

	// Cold colors (cyan, blue, purple)
	if (h >= 180 && h <= 270) {
		return 'cold'
	}

	// Default to neutral for edge cases
	return 'neutral'
}

/**
 * Classify color tone by lightness
 * 
 * @param {number} lightness - Lightness value (0-100)
 * @returns {'light' | 'mid' | 'dark'} Tone classification
 */
export function classifyTone(lightness: number): 'light' | 'mid' | 'dark' {
	if (lightness >= 70) return 'light'
	if (lightness >= 30) return 'mid'
	return 'dark'
}

/**
 * Generate color scale from base color
 * 
 * Creates 10 shades from lightest to darkest.
 * 
 * @param {string} baseColor - Base color in HEX format
 * @returns {string[]} Array of 10 colors from lightest to darkest
 */
export function generateColorScale(baseColor: string): string[] {
	const rgb = hexToRgb(baseColor)
	if (!rgb) return []

	const hsl = rgbToHslUtil(rgb.r, rgb.g, rgb.b)
	const scale: string[] = []

	// Generate 10 shades
	const lightnessValues = [95, 85, 75, 65, 55, hsl.l, 45, 35, 25, 15]

	for (const l of lightnessValues) {
		const newRgb = hslToRgbUtil(hsl.h, hsl.s, l)
		scale.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
	}

	return scale
}

