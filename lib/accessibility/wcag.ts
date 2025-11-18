/**
 * WCAG Compliance Utilities
 * 
 * Functions for checking WCAG 2.1 compliance levels.
 * 
 * @module lib/accessibility/wcag
 */

import { calculateContrastRatio } from './calculateContrast'

/**
 * WCAG compliance levels
 */
export interface WCAGCompliance {
	aaSmall: boolean // 4.5:1 for normal text
	aaLarge: boolean // 3:1 for large text
	aaa: boolean // 7:1 for normal text
	ratio: number
}

/**
 * Check WCAG compliance for contrast ratio
 * 
 * @param {number} ratio - Contrast ratio
 * @returns {WCAGCompliance} Compliance information
 */
export function checkWCAGCompliance(ratio: number): WCAGCompliance {
	return {
		aaSmall: ratio >= 4.5,
		aaLarge: ratio >= 3.0,
		aaa: ratio >= 7.0,
		ratio,
	}
}

/**
 * Check WCAG compliance for two colors
 * 
 * @param {string} color1 - First color in HEX
 * @param {string} color2 - Second color in HEX
 * @returns {WCAGCompliance} Compliance information
 */
export function checkWCAGComplianceColors(color1: string, color2: string): WCAGCompliance {
	const ratio = calculateContrastRatio(color1, color2)
	return checkWCAGCompliance(ratio)
}

/**
 * Generate recommendation based on contrast ratio
 * 
 * @param {number} ratio - Contrast ratio
 * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns {string} Recommendation text
 */
export function generateRecommendation(ratio: number, isLargeText: boolean = false): string {
	const threshold = isLargeText ? 3.0 : 4.5

	if (ratio >= 7.0) {
		return 'Excellent contrast. Meets WCAG AAA standards.'
	}

	if (ratio >= threshold) {
		return 'Good contrast. Meets WCAG AA standards.'
	}

	const needed = threshold
	const current = ratio
	const increase = ((needed - current) / current) * 100

	if (increase > 0) {
		return `Increase contrast by approximately ${Math.round(increase)}% to meet WCAG ${isLargeText ? 'AA Large' : 'AA'} standards. Consider ${isLargeText ? 'increasing text size or' : ''} adjusting text color brightness.`
	}

	return 'Contrast is below WCAG standards. Please adjust colors.'
}

