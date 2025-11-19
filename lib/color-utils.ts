/**
 * Color Utility Functions
 * 
 * This module provides comprehensive color conversion utilities for working
 * with different color formats commonly used in web development:
 * - HEX: Hexadecimal color codes (e.g., #FF5733)
 * - RGB: Red, Green, Blue values (0-255 each)
 * - HSL: Hue, Saturation, Lightness values
 * 
 * All functions handle edge cases, validate inputs, and provide type-safe
 * conversions. Used throughout the application for color manipulation
 * in tools like color converter, palette generator, and contrast checker.
 * 
 * @module lib/color-utils
 */

/**
 * Convert RGB color values to HEX format
 * 
 * Takes three RGB values (0-255) and converts them to a hexadecimal
 * color string. Ensures proper zero-padding for single-digit hex values.
 * 
 * Algorithm:
 * 1. Round each RGB value to nearest integer
 * 2. Convert to hexadecimal (base 16)
 * 3. Pad with leading zero if needed
 * 4. Combine with # prefix
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} HEX color string in format #RRGGBB (uppercase)
 * 
 * @example
 * rgbToHex(255, 87, 51) // Returns "#FF5733"
 * rgbToHex(0, 168, 204) // Returns "#00A8CC"
 */
export function rgbToHex(r: number, g: number, b: number): string {
	const toHex = (n: number) => {
		const hex = Math.round(n).toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

/**
 * Convert HEX color string to RGB values
 * 
 * Parses a hexadecimal color string and extracts RGB components.
 * Supports both formats: #RRGGBB and RRGGBB (with or without # prefix).
 * 
 * Validation:
 * - Must match pattern: 6 hexadecimal digits
 * - Case-insensitive matching
 * - Returns null for invalid formats
 * 
 * @param {string} hex - HEX color string (e.g., "#FF5733" or "FF5733")
 * @returns {{ r: number; g: number; b: number } | null} RGB object or null if invalid
 * 
 * @example
 * hexToRgb("#FF5733") // Returns { r: 255, g: 87, b: 51 }
 * hexToRgb("00A8CC")  // Returns { r: 0, g: 168, b: 204 }
 * hexToRgb("invalid") // Returns null
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null
}

/**
 * Convert RGB color values to HSL format
 * 
 * Converts RGB (0-255) to HSL color space using standard color theory algorithms.
 * HSL is useful for programmatic color manipulation (lightening, darkening, etc.)
 * 
 * Algorithm:
 * 1. Normalize RGB values to 0-1 range
 * 2. Find max and min values
 * 3. Calculate lightness: (max + min) / 2
 * 4. Calculate saturation based on lightness
 * 5. Calculate hue based on which component is max
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {{ h: number; s: number; l: number }} HSL object with:
 *   - h: Hue in degrees (0-360)
 *   - s: Saturation as percentage (0-100)
 *   - l: Lightness as percentage (0-100)
 * 
 * @example
 * rgbToHsl(255, 87, 51) // Returns { h: 9, s: 100, l: 60 }
 */
export function rgbToHsl(
	r: number,
	g: number,
	b: number
): { h: number; s: number; l: number } {
	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0
	let s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6
				break
			case g:
				h = ((b - r) / d + 2) / 6
				break
			case b:
				h = ((r - g) / d + 4) / 6
				break
		}
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	}
}

/**
 * Convert HSL color values to RGB format
 * 
 * Converts HSL color space back to RGB using the standard algorithm.
 * This is the inverse operation of rgbToHsl.
 * 
 * Algorithm:
 * 1. Normalize HSL values (h: 0-360 -> 0-1, s/l: 0-100 -> 0-1)
 * 2. If saturation is 0, result is grayscale (r=g=b=l)
 * 3. Otherwise, use hue-to-RGB conversion function
 * 4. Apply hue rotation for each RGB component
 * 
 * @param {number} h - Hue in degrees (0-360)
 * @param {number} s - Saturation as percentage (0-100)
 * @param {number} l - Lightness as percentage (0-100)
 * @returns {{ r: number; g: number; b: number }} RGB object with values 0-255
 * 
 * @example
 * hslToRgb(9, 100, 60) // Returns { r: 255, g: 87, b: 51 }
 */
export function hslToRgb(
	h: number,
	s: number,
	l: number
): { r: number; g: number; b: number } {
	h /= 360
	s /= 100
	l /= 100

	let r: number, g: number, b: number

	if (s === 0) {
		r = g = b = l
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q

		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	}
}

/**
 * Convert HEX color string to HSL format
 * 
 * Convenience function that combines hexToRgb and rgbToHsl conversions.
 * First converts HEX to RGB, then RGB to HSL.
 * 
 * @param {string} hex - HEX color string (e.g., "#FF5733")
 * @returns {{ h: number; s: number; l: number } | null} HSL object or null if HEX is invalid
 * 
 * @example
 * hexToHsl("#FF5733") // Returns { h: 9, s: 100, l: 60 }
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
	const rgb = hexToRgb(hex)
	if (!rgb) return null
	return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

/**
 * Format RGB values as CSS rgb() string
 * 
 * Creates a standard CSS rgb() function string from RGB components.
 * Used for displaying RGB values in a format that can be directly
 * used in CSS stylesheets.
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} CSS rgb() string (e.g., "rgb(255, 87, 51)")
 * 
 * @example
 * formatRgb(255, 87, 51) // Returns "rgb(255, 87, 51)"
 */
export function formatRgb(r: number, g: number, b: number): string {
	return `rgb(${r}, ${g}, ${b})`
}

/**
 * Format HSL values as CSS hsl() string
 * 
 * Creates a standard CSS hsl() function string from HSL components.
 * Used for displaying HSL values in a format that can be directly
 * used in CSS stylesheets.
 * 
 * @param {number} h - Hue in degrees (0-360)
 * @param {number} s - Saturation as percentage (0-100)
 * @param {number} l - Lightness as percentage (0-100)
 * @returns {string} CSS hsl() string (e.g., "hsl(9, 100%, 60%)")
 * 
 * @example
 * formatHsl(9, 100, 60) // Returns "hsl(9, 100%, 60%)"
 */
export function formatHsl(h: number, s: number, l: number): string {
	return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * Parse CSS rgb() string to RGB object
 * 
 * Extracts RGB values from a CSS rgb() function string.
 * Supports flexible formatting with or without spaces around commas.
 * 
 * Validation:
 * - Must match pattern: rgb(r, g, b) or rgb(r,g,b)
 * - Values must be integers 0-255
 * - Returns null for invalid formats or out-of-range values
 * 
 * @param {string} rgbString - CSS rgb() string (e.g., "rgb(255, 87, 51)" or "rgb(255,87,51)")
 * @returns {{ r: number; g: number; b: number } | null} RGB object or null if invalid
 * 
 * @example
 * parseRgb("rgb(255, 87, 51)") // Returns { r: 255, g: 87, b: 51 }
 * parseRgb("rgb(255,87,51)")   // Returns { r: 255, g: 87, b: 51 }
 * parseRgb("invalid")          // Returns null
 */
export function parseRgb(rgbString: string): { r: number; g: number; b: number } | null {
	const match = rgbString.match(/rgb\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)?/i)
	if (!match) return null

	const r = parseInt(match[1], 10)
	const g = parseInt(match[2], 10)
	const b = parseInt(match[3], 10)

	if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
		return null
	}

	return { r, g, b }
}

/**
 * Parse CSS hsl() string to HSL object
 * 
 * Extracts HSL values from a CSS hsl() function string.
 * Supports flexible formatting with or without spaces around commas.
 * 
 * Validation:
 * - Must match pattern: hsl(h, s%, l%) or hsl(h,s%,l%)
 * - Hue must be 0-360
 * - Saturation and lightness must be 0-100 (with % sign)
 * - Returns null for invalid formats or out-of-range values
 * 
 * @param {string} hslString - CSS hsl() string (e.g., "hsl(9, 100%, 60%)" or "hsl(9,100%,60%)")
 * @returns {{ h: number; s: number; l: number } | null} HSL object or null if invalid
 * 
 * @example
 * parseHsl("hsl(9, 100%, 60%)") // Returns { h: 9, s: 100, l: 60 }
 * parseHsl("hsl(9,100%,60%)")   // Returns { h: 9, s: 100, l: 60 }
 * parseHsl("invalid")           // Returns null
 */
export function parseHsl(hslString: string): { h: number; s: number; l: number } | null {
	const match = hslString.match(/hsl\(?\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)?/i)
	if (!match) return null

	const h = parseInt(match[1], 10)
	const s = parseInt(match[2], 10)
	const l = parseInt(match[3], 10)

	if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
		return null
	}

	return { h, s, l }
}

/**
 * Universal color parser - converts any color format to RGB
 * 
 * Attempts to parse a color string in various formats and convert it to RGB.
 * Tries formats in order: HEX, RGB, HSL, HEX without #.
 * 
 * This is useful for accepting user input in any format and normalizing
 * it to RGB for further processing.
 * 
 * Supported formats:
 * - HEX: "#FF5733" or "FF5733"
 * - RGB: "rgb(255, 87, 51)" or "rgb(255,87,51)"
 * - HSL: "hsl(9, 100%, 60%)" or "hsl(9,100%,60%)"
 * 
 * @param {string} colorString - Color string in any supported format
 * @returns {{ r: number; g: number; b: number } | null} RGB object or null if parsing fails
 * 
 * @example
 * parseColorToRgb("#FF5733")        // Returns { r: 255, g: 87, b: 51 }
 * parseColorToRgb("rgb(255, 87, 51)") // Returns { r: 255, g: 87, b: 51 }
 * parseColorToRgb("hsl(9, 100%, 60%)") // Returns { r: 255, g: 87, b: 51 }
 * parseColorToRgb("invalid")       // Returns null
 */
export function parseColorToRgb(
	colorString: string | undefined | null
): { r: number; g: number; b: number } | null {
	// Return null if colorString is undefined, null, or empty
	if (!colorString || typeof colorString !== 'string') {
		return null
	}

	// Try HEX first
	if (colorString.startsWith('#')) {
		return hexToRgb(colorString)
	}

	// Try RGB
	if (colorString.toLowerCase().startsWith('rgb')) {
		return parseRgb(colorString)
	}

	// Try HSL
	if (colorString.toLowerCase().startsWith('hsl')) {
		const hsl = parseHsl(colorString)
		if (!hsl) return null
		return hslToRgb(hsl.h, hsl.s, hsl.l)
	}

	// Try HEX without #
	if (/^[0-9a-f]{6}$/i.test(colorString)) {
		return hexToRgb('#' + colorString)
	}

	return null
}

