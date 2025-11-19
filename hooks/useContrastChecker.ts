/**
 * Contrast Checker Hook
 * 
 * Custom React hook for calculating color contrast ratios according to WCAG 2.1 guidelines.
 * Used for accessibility testing to ensure text is readable against background colors.
 * 
 * Features:
 * - WCAG 2.1 compliant contrast calculation
 * - Automatic compliance level checking (AA, AAA)
 * - Support for normal and large text requirements
 * - Real-time calculation as colors change
 * - Formatted ratio display
 * 
 * WCAG Compliance Levels:
 * - AA Normal: 4.5:1 (minimum for normal text)
 * - AA Large: 3.0:1 (for text 18pt+ or 14pt+ bold)
 * - AAA Normal: 7.0:1 (enhanced for normal text)
 * - AAA Large: 4.5:1 (enhanced for large text)
 * 
 * @module hooks/useContrastChecker
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

import { useState, useMemo } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'

/**
 * Calculate relative luminance of a color
 * 
 * Implements the WCAG 2.1 formula for relative luminance calculation.
 * This is the first step in contrast ratio calculation.
 * 
 * Algorithm:
 * 1. Normalize RGB values (0-255 -> 0-1)
 * 2. Apply gamma correction for each component
 * 3. Weight components by human eye sensitivity:
 *    - Red: 0.2126
 *    - Green: 0.7152 (highest - eye is most sensitive to green)
 *    - Blue: 0.0722
 * 
 * Gamma correction formula:
 * - If value <= 0.03928: value / 12.92
 * - Otherwise: ((value + 0.055) / 1.055) ^ 2.4
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Relative luminance (0-1, where 1 is brightest)
 * 
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-relative-luminance
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
	const normalize = (value: number) => {
		const v = value / 255
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
	}

	const rNorm = normalize(r)
	const gNorm = normalize(g)
	const bNorm = normalize(b)

	return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm
}

/**
 * Calculate contrast ratio between two colors
 * 
 * Implements WCAG 2.1 contrast ratio formula.
 * The ratio ranges from 1:1 (no contrast) to 21:1 (maximum contrast, black on white).
 * 
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * Where:
 * - L1 is the relative luminance of the lighter color
 * - L2 is the relative luminance of the darker color
 * - 0.05 is added to prevent division by zero
 * 
 * The result is always >= 1.0 (lighter color divided by darker).
 * 
 * @param {Object} rgb1 - First RGB color
 * @param {number} rgb1.r - Red component (0-255)
 * @param {number} rgb1.g - Green component (0-255)
 * @param {number} rgb1.b - Blue component (0-255)
 * @param {Object} rgb2 - Second RGB color
 * @param {number} rgb2.r - Red component (0-255)
 * @param {number} rgb2.g - Green component (0-255)
 * @param {number} rgb2.b - Blue component (0-255)
 * @returns {number} Contrast ratio (1.0 to 21.0)
 * 
 * @example
 * // Black text on white background
 * getContrastRatio({r:0,g:0,b:0}, {r:255,g:255,b:255}) // Returns ~21.0
 * 
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-contrast-ratio
 */
function getContrastRatio(
	rgb1: { r: number; g: number; b: number },
	rgb2: { r: number; g: number; b: number }
): number {
	const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
	const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)

	const lighter = Math.max(l1, l2)
	const darker = Math.min(l1, l2)

	return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check WCAG compliance levels against contrast ratio
 * 
 * Determines which WCAG 2.1 compliance levels are met by the given contrast ratio.
 * Returns boolean flags for each compliance level.
 * 
 * WCAG Levels:
 * - AA Normal: 4.5:1 - Minimum for normal text (body text, paragraphs)
 * - AA Large: 3.0:1 - Minimum for large text (18pt+ or 14pt+ bold)
 * - AAA Normal: 7.0:1 - Enhanced for normal text (better accessibility)
 * - AAA Large: 4.5:1 - Enhanced for large text
 * 
 * @param {number} ratio - Contrast ratio (1.0 to 21.0)
 * @returns {Object} Compliance flags:
 *   - aaNormal: boolean - Meets AA normal text requirement
 *   - aaLarge: boolean - Meets AA large text requirement
 *   - aaaNormal: boolean - Meets AAA normal text requirement
 *   - aaaLarge: boolean - Meets AAA large text requirement
 */
function checkWCAGLevels(ratio: number) {
	return {
		aaNormal: ratio >= 4.5, // AA normal text (minimum)
		aaLarge: ratio >= 3.0, // AA large text (18pt+)
		aaaNormal: ratio >= 7.0, // AAA normal text
		aaaLarge: ratio >= 4.5, // AAA large text
	}
}

/**
 * Contrast check result interface
 * Contains all calculated contrast information and WCAG compliance status
 */
export interface ContrastResult {
	/** Calculated contrast ratio (1.0 to 21.0) */
	ratio: number
	/** Formatted ratio string (e.g., "4.5:1") */
	ratioFormatted: string
	/** WCAG compliance level flags */
	wcag: ReturnType<typeof checkWCAGLevels>
	/** Foreground color in RGB format */
	foregroundRgb: { r: number; g: number; b: number } | null
	/** Background color in RGB format */
	backgroundRgb: { r: number; g: number; b: number } | null
	/** Foreground color in HEX format */
	foregroundHex: string | null
	/** Background color in HEX format */
	backgroundHex: string | null
}

/**
 * Contrast Checker Hook
 * 
 * Calculates contrast ratio between foreground and background colors.
 * Automatically recalculates when either color changes.
 * 
 * Usage:
 * - Pass foreground and background color strings (any format)
 * - Hook parses colors and calculates contrast
 * - Returns complete result with ratio and WCAG compliance
 * 
 * @param {string | undefined} foreground - Foreground color (text color) in any format
 * @param {string | undefined} background - Background color in any format
 * @returns {ContrastResult | null} Contrast calculation result or null if colors invalid
 * 
 * @example
 * ```tsx
 * const result = useContrastChecker('#000000', '#FFFFFF')
 * // Returns: {
 * //   ratio: 21.0,
 * //   ratioFormatted: "21.00:1",
 * //   wcag: { aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true },
 * //   foregroundRgb: { r: 0, g: 0, b: 0 },
 * //   backgroundRgb: { r: 255, g: 255, b: 255 },
 * //   foregroundHex: "#000000",
 * //   backgroundHex: "#FFFFFF"
 * // }
 * ```
 */
export function useContrastChecker(
	foreground?: string,
	background?: string
) {
	const result = useMemo<ContrastResult | null>(() => {
		const fgRgb = parseColorToRgb(foreground)
		const bgRgb = parseColorToRgb(background)

		if (!fgRgb || !bgRgb) {
			return {
				ratio: 0,
				ratioFormatted: '0:1',
				wcag: {
					aaNormal: false,
					aaLarge: false,
					aaaNormal: false,
					aaaLarge: false,
				},
				foregroundRgb: fgRgb,
				backgroundRgb: bgRgb,
				foregroundHex: fgRgb ? rgbToHex(fgRgb.r, fgRgb.g, fgRgb.b) : null,
				backgroundHex: bgRgb ? rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b) : null,
			}
		}

		const ratio = getContrastRatio(fgRgb, bgRgb)
		const wcag = checkWCAGLevels(ratio)

		return {
			ratio,
			ratioFormatted: `${ratio.toFixed(2)}:1`,
			wcag,
			foregroundRgb: fgRgb,
			backgroundRgb: bgRgb,
			foregroundHex: rgbToHex(fgRgb.r, fgRgb.g, fgRgb.b),
			backgroundHex: rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b),
		}
	}, [foreground, background])

	return result
}


