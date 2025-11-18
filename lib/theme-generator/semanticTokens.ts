/**
 * Semantic Token Generation
 * 
 * Generates semantic UI tokens from a base color.
 * Creates logical token names and UX-friendly color mappings.
 * 
 * @module lib/theme-generator/semanticTokens
 */

import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/color-utils'
import { lighten, darken } from './adjustBrightness'
import { mixColors } from './mixColors'
import { generateContrastPair } from './generateContrastPair'

/**
 * UI Theme Tokens
 */
export interface UIThemeTokens {
	primary: {
		base: string
		hover: string
		active: string
		foreground: string
	}
	secondary: {
		base: string
		hover: string
		foreground: string
	}
	neutral: {
		background: string
		foreground: string
		card: string
		muted: string
	}
	status: {
		success: string
		warning: string
		error: string
		info: string
	}
	borders: {
		base: string
		strong: string
		ring: string
	}
	shadows: {
		sm: string
		md: string
		lg: string
	}
}

/**
 * Generate semantic UI tokens from base color
 * 
 * @param {string} baseColor - Base color in HEX format
 * @param {'light' | 'dark' | 'auto'} mode - Theme mode
 * @returns {UIThemeTokens} Complete UI theme tokens
 */
export function generateSemanticTokens(
	baseColor: string,
	mode: 'light' | 'dark' | 'auto' = 'auto'
): UIThemeTokens {
	const rgb = hexToRgb(baseColor)
	if (!rgb) {
		// Return default tokens
		return getDefaultTokens(mode)
	}

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

	// Determine mode if auto
	const actualMode = mode === 'auto' ? (hsl.l >= 50 ? 'light' : 'dark') : mode

	// Primary colors
	const primaryBase = baseColor
	const primaryHover = lighten(primaryBase, 10)
	const primaryActive = darken(primaryBase, 10)
	const primaryForeground = generateContrastPair(primaryBase)

	// Secondary colors (desaturated version of primary)
	const secondaryBase = mixColors(primaryBase, actualMode === 'light' ? '#FFFFFF' : '#000000', 0.3)
	const secondaryHover = lighten(secondaryBase, 5)
	const secondaryForeground = generateContrastPair(secondaryBase)

	// Neutral colors
	const background = actualMode === 'light' ? '#FFFFFF' : '#0A0A0A'
	const foreground = actualMode === 'light' ? '#0A0A0A' : '#FFFFFF'
	const card = actualMode === 'light' ? '#F5F5F5' : '#1A1A1A'
	const muted = actualMode === 'light' ? '#E5E5E5' : '#2A2A2A'

	// Status colors (generate from base or use standard)
	const success = generateStatusColor(baseColor, 'success')
	const warning = generateStatusColor(baseColor, 'warning')
	const error = generateStatusColor(baseColor, 'error')
	const info = generateStatusColor(baseColor, 'info')

	// Borders
	const borderBase = actualMode === 'light' ? '#E5E5E5' : '#2A2A2A'
	const borderStrong = actualMode === 'light' ? '#CCCCCC' : '#404040'
	const ring = primaryBase

	// Shadows (using rgba with opacity)
	const shadows = {
		sm: actualMode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.3)',
		md: actualMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)',
		lg: actualMode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.5)',
	}

	return {
		primary: {
			base: primaryBase,
			hover: primaryHover,
			active: primaryActive,
			foreground: primaryForeground,
		},
		secondary: {
			base: secondaryBase,
			hover: secondaryHover,
			foreground: secondaryForeground,
		},
		neutral: {
			background,
			foreground,
			card,
			muted,
		},
		status: {
			success,
			warning,
			error,
			info,
		},
		borders: {
			base: borderBase,
			strong: borderStrong,
			ring,
		},
		shadows,
	}
}

/**
 * Generate status color from base color
 * 
 * @param {string} baseColor - Base color in HEX
 * @param {'success' | 'warning' | 'error' | 'info'} type - Status type
 * @returns {string} Status color in HEX
 */
function generateStatusColor(
	baseColor: string,
	type: 'success' | 'warning' | 'error' | 'info'
): string {
	const rgb = hexToRgb(baseColor)
	if (!rgb) return '#000000'

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

	// Adjust hue for status colors
	let hue = hsl.h
	switch (type) {
		case 'success':
			hue = 120 // Green
			break
		case 'warning':
			hue = 45 // Yellow/Orange
			break
		case 'error':
			hue = 0 // Red
			break
		case 'info':
			hue = 200 // Blue
			break
	}

	// Maintain saturation and adjust lightness for visibility
	const lightness = hsl.l >= 50 ? 50 : 60
	const saturation = Math.min(100, hsl.s + 20)

	const newRgb = hslToRgb(hue, saturation, lightness)
	return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * Get default tokens
 * 
 * @param {'light' | 'dark' | 'auto'} mode - Theme mode
 * @returns {UIThemeTokens} Default tokens
 */
function getDefaultTokens(mode: 'light' | 'dark' | 'auto'): UIThemeTokens {
	const actualMode = mode === 'auto' ? 'light' : mode

	return {
		primary: {
			base: '#3B82F6',
			hover: '#2563EB',
			active: '#1D4ED8',
			foreground: '#FFFFFF',
		},
		secondary: {
			base: actualMode === 'light' ? '#6B7280' : '#9CA3AF',
			hover: actualMode === 'light' ? '#4B5563' : '#D1D5DB',
			foreground: actualMode === 'light' ? '#FFFFFF' : '#000000',
		},
		neutral: {
			background: actualMode === 'light' ? '#FFFFFF' : '#0A0A0A',
			foreground: actualMode === 'light' ? '#0A0A0A' : '#FFFFFF',
			card: actualMode === 'light' ? '#F5F5F5' : '#1A1A1A',
			muted: actualMode === 'light' ? '#E5E5E5' : '#2A2A2A',
		},
		status: {
			success: '#10B981',
			warning: '#F59E0B',
			error: '#EF4444',
			info: '#3B82F6',
		},
		borders: {
			base: actualMode === 'light' ? '#E5E5E5' : '#2A2A2A',
			strong: actualMode === 'light' ? '#CCCCCC' : '#404040',
			ring: '#3B82F6',
		},
		shadows: {
			sm: actualMode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.3)',
			md: actualMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)',
			lg: actualMode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.5)',
		},
	}
}

