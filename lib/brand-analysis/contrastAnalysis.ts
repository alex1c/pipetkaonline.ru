/**
 * Contrast Analysis Utilities
 * 
 * Functions for analyzing color contrast and accessibility (WCAG).
 * 
 * @module lib/brand-analysis/contrastAnalysis
 */

import { hexToRgb } from '@/lib/color-utils'
import { calculateLuma } from '@/lib/colorMath'

/**
 * Contrast analysis result
 */
export interface ContrastAnalysis {
	hex: string
	contrastWhite: number
	contrastBlack: number
	wcagAA: boolean
	wcagAAA: boolean
	wcagAALarge: boolean
	recommendations: string[]
}

/**
 * Calculate contrast ratio between two colors
 * 
 * @param {number} luma1 - Luminance of first color
 * @param {number} luma2 - Luminance of second color
 * @returns {number} Contrast ratio
 */
function calculateContrastRatio(luma1: number, luma2: number): number {
	const lighter = Math.max(luma1, luma2)
	const darker = Math.min(luma1, luma2)
	return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Analyze contrast for a color
 * 
 * @param {string} hex - Color in HEX format
 * @returns {ContrastAnalysis} Contrast analysis
 */
export function analyzeContrast(hex: string): ContrastAnalysis {
	const rgb = hexToRgb(hex)
	if (!rgb) {
		return {
			hex,
			contrastWhite: 0,
			contrastBlack: 0,
			wcagAA: false,
			wcagAAA: false,
			wcagAALarge: false,
			recommendations: ['Invalid color'],
		}
	}

	const luma = calculateLuma(rgb.r, rgb.g, rgb.b)
	const whiteLuma = 1.0
	const blackLuma = 0.0

	const contrastWhite = calculateContrastRatio(luma, whiteLuma)
	const contrastBlack = calculateContrastRatio(luma, blackLuma)

	const wcagAA = contrastWhite >= 4.5 || contrastBlack >= 4.5
	const wcagAAA = contrastWhite >= 7.0 || contrastBlack >= 7.0
	const wcagAALarge = contrastWhite >= 3.0 || contrastBlack >= 3.0

	// Generate recommendations
	const recommendations: string[] = []
	if (!wcagAA) {
		if (luma < 0.5) {
			recommendations.push('Lighten the color for better contrast')
		} else {
			recommendations.push('Darken the color for better contrast')
		}
	}
	if (contrastWhite < 3 && contrastBlack < 3) {
		recommendations.push('Increase saturation for better visibility')
	}
	if (wcagAA && !wcagAAA) {
		recommendations.push('Consider increasing contrast for AAA compliance')
	}

	return {
		hex,
		contrastWhite: Math.round(contrastWhite * 10) / 10,
		contrastBlack: Math.round(contrastBlack * 10) / 10,
		wcagAA,
		wcagAAA,
		wcagAALarge,
		recommendations,
	}
}

/**
 * Analyze contrast for multiple colors
 * 
 * @param {string[]} colors - Array of color hex codes
 * @returns {ContrastAnalysis[]} Array of contrast analyses
 */
export function analyzeContrastMultiple(colors: string[]): ContrastAnalysis[] {
	return colors.map((hex) => analyzeContrast(hex))
}

