/**
 * UI Tokens Utility Functions
 * 
 * This module provides utilities for generating UI design tokens from a base color.
 * Includes functions for generating color scales, semantic colors, and design tokens.
 * 
 * Features:
 * - Color scale generation (50-900)
 * - Lighten/darken operations
 * - Saturation adjustments
 * - Semantic color generation (success, warning, danger)
 * - Design token export formats
 * 
 * @module lib/ui-tokens-utils
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from './color-utils'

/**
 * Generate a color scale from a base color
 * Creates 10 shades from lightest (50) to darkest (900)
 * 
 * Algorithm:
 * - Uses HSL color space for better perceptual uniformity
 * - Adjusts lightness for lighter shades (50-400)
 * - Adjusts lightness and saturation for darker shades (500-900)
 * - Maintains hue for color consistency
 * 
 * @param {string} baseColor - Base color in HEX format
 * @returns {Record<string, string>} Color scale object with keys 50-900
 * 
 * @example
 * generateColorScale('#3B82F6')
 * // Returns: { 50: '#EFF6FF', 100: '#DBEAFE', ..., 900: '#1E3A8A' }
 */
export function generateColorScale(baseColor: string): Record<string, string> {
	const rgb = hexToRgb(baseColor)
	if (!rgb) {
		// Fallback to default blue scale if invalid color
		return generateDefaultScale()
	}

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const scale: Record<string, string> = {}

	// Define lightness and saturation adjustments for each shade
	const adjustments = [
		{ l: 95, s: hsl.s * 0.3 }, // 50 - very light
		{ l: 90, s: hsl.s * 0.4 }, // 100
		{ l: 85, s: hsl.s * 0.5 }, // 200
		{ l: 75, s: hsl.s * 0.6 }, // 300
		{ l: 65, s: hsl.s * 0.7 }, // 400
		{ l: hsl.l, s: hsl.s }, // 500 - base color
		{ l: Math.max(0, hsl.l - 10), s: Math.min(100, hsl.s + 5) }, // 600
		{ l: Math.max(0, hsl.l - 20), s: Math.min(100, hsl.s + 10) }, // 700
		{ l: Math.max(0, hsl.l - 30), s: Math.min(100, hsl.s + 15) }, // 800
		{ l: Math.max(0, hsl.l - 40), s: Math.min(100, hsl.s + 20) }, // 900 - very dark
	]

	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

	shades.forEach((shade, index) => {
		const { l, s } = adjustments[index]
		const adjustedHsl = { h: hsl.h, s, l }
		const adjustedRgb = hslToRgb(adjustedHsl.h, adjustedHsl.s, adjustedHsl.l)
		scale[shade.toString()] = rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b)
	})

	return scale
}

/**
 * Generate default color scale (blue) as fallback
 * 
 * @returns {Record<string, string>} Default blue color scale
 */
function generateDefaultScale(): Record<string, string> {
	return {
		'50': '#EFF6FF',
		'100': '#DBEAFE',
		'200': '#BFDBFE',
		'300': '#93C5FD',
		'400': '#60A5FA',
		'500': '#3B82F6',
		'600': '#2563EB',
		'700': '#1D4ED8',
		'800': '#1E40AF',
		'900': '#1E3A8A',
	}
}

/**
 * Generate semantic colors from base color
 * Creates success, warning, and danger colors by adjusting hue
 * 
 * Algorithm:
 * - Success: base hue + 120° (green)
 * - Warning: base hue + 60° (yellow/orange)
 * - Danger: base hue - 60° (red)
 * 
 * @param {string} baseColor - Base color in HEX format
 * @returns {Object} Semantic colors object
 * @returns {string} returns.success - Success color (green variant)
 * @returns {string} returns.warning - Warning color (yellow/orange variant)
 * @returns {string} returns.danger - Danger color (red variant)
 * 
 * @example
 * generateSemanticColors('#3B82F6')
 * // Returns: { success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }
 */
export function generateSemanticColors(baseColor: string): {
	success: string
	warning: string
	danger: string
} {
	const rgb = hexToRgb(baseColor)
	if (!rgb) {
		return {
			success: '#10B981',
			warning: '#F59E0B',
			danger: '#EF4444',
		}
	}

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

	// Generate semantic colors by adjusting hue
	const successHue = (hsl.h + 120) % 360
	const warningHue = (hsl.h + 60) % 360
	const dangerHue = (hsl.h - 60 + 360) % 360

	const successRgb = hslToRgb(successHue, hsl.s, hsl.l)
	const warningRgb = hslToRgb(warningHue, hsl.s, hsl.l)
	const dangerRgb = hslToRgb(dangerHue, hsl.s, hsl.l)

	return {
		success: rgbToHex(successRgb.r, successRgb.g, successRgb.b),
		warning: rgbToHex(warningRgb.r, warningRgb.g, warningRgb.b),
		danger: rgbToHex(dangerRgb.r, dangerRgb.g, dangerRgb.b),
	}
}

/**
 * Lighten a color by a percentage
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Lightness amount (0-100)
 * @returns {string} Lightened color in HEX format
 */
export function lighten(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const newLightness = Math.min(100, hsl.l + amount)
	const newRgb = hslToRgb(hsl.h, hsl.s, newLightness)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Darken a color by a percentage
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Darkness amount (0-100)
 * @returns {string} Darkened color in HEX format
 */
export function darken(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const newLightness = Math.max(0, hsl.l - amount)
	const newRgb = hslToRgb(hsl.h, hsl.s, newLightness)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Adjust saturation of a color
 * 
 * @param {string} color - Color in HEX format
 * @param {number} amount - Saturation adjustment (-100 to 100)
 * @returns {string} Color with adjusted saturation in HEX format
 */
export function saturate(color: string, amount: number): string {
	const rgb = hexToRgb(color)
	if (!rgb) return color

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
	const newSaturation = Math.max(0, Math.min(100, hsl.s + amount))
	const newRgb = hslToRgb(hsl.h, newSaturation, hsl.l)

	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * UI Tokens interface
 * Complete structure of generated UI tokens
 */
export interface UITokens {
	primary: {
		base: string
		hover: string
		active: string
		muted: string
		foreground: string
		scale: Record<string, string>
	}
	background: {
		bg: string
		bgMuted: string
		surface: string
		surfaceHover: string
		border: string
	}
	semantic: {
		success: string
		warning: string
		danger: string
	}
}

/**
 * Generate complete UI tokens from base color
 * 
 * @param {string} baseColor - Base color in HEX format
 * @returns {UITokens} Complete UI tokens object
 */
export function generateUITokens(baseColor: string): UITokens {
	const scale = generateColorScale(baseColor)
	const semantic = generateSemanticColors(baseColor)

	// Generate primary tokens
	const primary = {
		base: scale['500'],
		hover: scale['600'],
		active: scale['700'],
		muted: scale['100'],
		foreground: '#FFFFFF', // White text on primary
		scale,
	}

	// Generate background tokens (neutral grays based on base color lightness)
	const rgb = hexToRgb(baseColor)
	const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 50 }

	// Create neutral grays with same lightness perception
	const bgRgb = hslToRgb(0, 0, 98) // Very light gray
	const bgMutedRgb = hslToRgb(0, 0, 95)
	const surfaceRgb = hslToRgb(0, 0, 100) // White
	const surfaceHoverRgb = hslToRgb(0, 0, 98)
	const borderRgb = hslToRgb(0, 0, 85)

	const background = {
		bg: rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b),
		bgMuted: rgbToHex(bgMutedRgb.r, bgMutedRgb.g, bgMutedRgb.b),
		surface: rgbToHex(surfaceRgb.r, surfaceRgb.g, surfaceRgb.b),
		surfaceHover: rgbToHex(surfaceHoverRgb.r, surfaceHoverRgb.g, surfaceHoverRgb.b),
		border: rgbToHex(borderRgb.r, borderRgb.g, borderRgb.b),
	}

	return {
		primary,
		background,
		semantic,
	}
}

/**
 * Export tokens as CSS variables
 * 
 * @param {UITokens} tokens - UI tokens object
 * @returns {string} CSS variables string
 */
export function exportAsCSSVariables(tokens: UITokens): string {
	let css = ':root {\n'

	// Primary tokens
	css += '  /* Primary Colors */\n'
	css += `  --color-primary: ${tokens.primary.base};\n`
	css += `  --color-primary-hover: ${tokens.primary.hover};\n`
	css += `  --color-primary-active: ${tokens.primary.active};\n`
	css += `  --color-primary-muted: ${tokens.primary.muted};\n`
	css += `  --color-primary-foreground: ${tokens.primary.foreground};\n\n`

	// Primary scale
	css += '  /* Primary Scale */\n'
	Object.entries(tokens.primary.scale).forEach(([shade, color]) => {
		css += `  --color-primary-${shade}: ${color};\n`
	})
	css += '\n'

	// Background tokens
	css += '  /* Background Colors */\n'
	css += `  --color-bg: ${tokens.background.bg};\n`
	css += `  --color-bg-muted: ${tokens.background.bgMuted};\n`
	css += `  --color-surface: ${tokens.background.surface};\n`
	css += `  --color-surface-hover: ${tokens.background.surfaceHover};\n`
	css += `  --color-border: ${tokens.background.border};\n\n`

	// Semantic tokens
	css += '  /* Semantic Colors */\n'
	css += `  --color-success: ${tokens.semantic.success};\n`
	css += `  --color-warning: ${tokens.semantic.warning};\n`
	css += `  --color-danger: ${tokens.semantic.danger};\n`

	css += '}\n'
	return css
}

/**
 * Export tokens as Tailwind config
 * 
 * @param {UITokens} tokens - UI tokens object
 * @returns {string} Tailwind config snippet
 */
export function exportAsTailwindConfig(tokens: UITokens): string {
	let config = 'module.exports = {\n'
	config += '  theme: {\n'
	config += '    extend: {\n'
	config += '      colors: {\n'
	config += '        primary: {\n'

	// Primary scale
	Object.entries(tokens.primary.scale).forEach(([shade, color]) => {
		config += `          ${shade}: '${color}',\n`
	})

	config += '        },\n'
	config += '        success: {\n'
	config += `          DEFAULT: '${tokens.semantic.success}',\n`
	config += '        },\n'
	config += '        warning: {\n'
	config += `          DEFAULT: '${tokens.semantic.warning}',\n`
	config += '        },\n'
	config += '        danger: {\n'
	config += `          DEFAULT: '${tokens.semantic.danger}',\n`
	config += '        },\n'
	config += '      },\n'
	config += '    },\n'
	config += '  },\n'
	config += '}\n'

	return config
}

/**
 * Export tokens as JSON (Design Tokens format)
 * 
 * @param {UITokens} tokens - UI tokens object
 * @returns {string} JSON string
 */
export function exportAsJSON(tokens: UITokens): string {
	const json = {
		color: {
			primary: {
				base: tokens.primary.base,
				hover: tokens.primary.hover,
				active: tokens.primary.active,
				muted: tokens.primary.muted,
				foreground: tokens.primary.foreground,
				scale: tokens.primary.scale,
			},
			background: {
				bg: tokens.background.bg,
				bgMuted: tokens.background.bgMuted,
				surface: tokens.background.surface,
				surfaceHover: tokens.background.surfaceHover,
				border: tokens.background.border,
			},
			semantic: {
				success: tokens.semantic.success,
				warning: tokens.semantic.warning,
				danger: tokens.semantic.danger,
			},
		},
	}

	return JSON.stringify(json, null, 2)
}

