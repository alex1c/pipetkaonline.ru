/**
 * Palette Analysis Utilities
 * 
 * Functions for analyzing brand color palette characteristics:
 * temperature, brightness, saturation, style, harmony
 * 
 * @module lib/brand-analysis/paletteAnalysis
 */

import { hexToRgb, rgbToHsl } from '@/lib/color-utils'
import { rgbToLab, deltaE2000 } from '@/lib/color-name-utils'
import type { ClusteredColor } from './colorClustering'

// Note: checkHarmonyWCAG function removed as it's not used

/**
 * Palette characteristics
 */
export interface PaletteCharacteristics {
	temperature: 'warm' | 'cold' | 'neutral'
	brightness: 'bright' | 'medium' | 'dark'
	saturation: 'vibrant' | 'moderate' | 'muted'
	style: 'energetic' | 'muted' | 'minimalistic' | 'playful' | 'corporate'
	tags: string[]
}

/**
 * Color harmony analysis
 */
export interface HarmonyAnalysis {
	type: 'triad' | 'complementary' | 'split-complementary' | 'analogous' | 'none'
	hasConflict: boolean
	contrastLevel: 'high' | 'medium' | 'low'
}

/**
 * Analyze palette characteristics
 * 
 * @param {ClusteredColor[]} colors - Clustered colors
 * @returns {PaletteCharacteristics} Palette characteristics
 */
export function analyzePalette(colors: ClusteredColor[]): PaletteCharacteristics {
	if (colors.length === 0) {
		return {
			temperature: 'neutral',
			brightness: 'medium',
			saturation: 'moderate',
			style: 'corporate',
			tags: [],
		}
	}

	// Calculate averages
	const avgHue = colors.reduce((sum, c) => sum + c.hsl.h, 0) / colors.length
	const avgSaturation = colors.reduce((sum, c) => sum + c.hsl.s, 0) / colors.length
	const avgLightness = colors.reduce((sum, c) => sum + c.hsl.l, 0) / colors.length

	// Temperature
	let temperature: 'warm' | 'cold' | 'neutral' = 'neutral'
	if (avgHue >= 0 && avgHue <= 180) {
		temperature = 'warm'
	} else if (avgHue > 180 && avgHue <= 360) {
		temperature = 'cold'
	}

	// Brightness
	let brightness: 'bright' | 'medium' | 'dark' = 'medium'
	if (avgLightness >= 60) {
		brightness = 'bright'
	} else if (avgLightness <= 40) {
		brightness = 'dark'
	}

	// Saturation
	let saturation: 'vibrant' | 'moderate' | 'muted' = 'moderate'
	if (avgSaturation >= 70) {
		saturation = 'vibrant'
	} else if (avgSaturation <= 30) {
		saturation = 'muted'
	}

	// Style
	let style: 'energetic' | 'muted' | 'minimalistic' | 'playful' | 'corporate' = 'corporate'
	if (avgSaturation >= 70 && avgLightness >= 50) {
		style = 'energetic'
	} else if (avgSaturation <= 30) {
		style = 'muted'
	} else if (colors.length <= 2 && avgSaturation <= 50) {
		style = 'minimalistic'
	} else if (avgSaturation >= 60 && colors.length >= 4) {
		style = 'playful'
	}

	// Tags
	const tags: string[] = []
	if (avgSaturation >= 60) tags.push('modern')
	if (avgSaturation <= 40 && avgLightness <= 50) tags.push('classic')
	if (temperature === 'warm' && avgSaturation <= 50) tags.push('natural')
	if (avgSaturation >= 70 && brightness === 'bright') tags.push('digital')

	return {
		temperature,
		brightness,
		saturation,
		style,
		tags,
	}
}

/**
 * Analyze color harmony
 * 
 * @param {ClusteredColor[]} colors - Clustered colors
 * @returns {HarmonyAnalysis} Harmony analysis
 */
export function analyzeHarmony(colors: ClusteredColor[]): HarmonyAnalysis {
	if (colors.length < 2) {
		return {
			type: 'none',
			hasConflict: false,
			contrastLevel: 'low',
		}
	}

	// Get primary colors (non-neutral)
	const colored = colors.filter((c) => c.cluster !== 'neutral')
	if (colored.length < 2) {
		return {
			type: 'none',
			hasConflict: false,
			contrastLevel: 'low',
		}
	}

	const hues = colored.map((c) => c.hsl.h).sort((a, b) => a - b)

	// Check for complementary (180° difference)
	for (let i = 0; i < hues.length; i++) {
		for (let j = i + 1; j < hues.length; j++) {
			const diff = Math.abs(hues[i] - hues[j])
			const complementDiff = Math.abs(diff - 180)
			if (complementDiff < 30) {
				return {
					type: 'complementary',
					hasConflict: false,
					contrastLevel: 'high',
				}
			}
		}
	}

	// Check for triad (120° spacing)
	if (colored.length >= 3) {
		const spacing1 = Math.abs(hues[1] - hues[0])
		const spacing2 = Math.abs(hues[2] - hues[1])
		if (Math.abs(spacing1 - 120) < 30 && Math.abs(spacing2 - 120) < 30) {
			return {
				type: 'triad',
				hasConflict: false,
				contrastLevel: 'high',
			}
		}
	}

	// Check for split-complementary
	if (colored.length >= 3) {
		for (let i = 0; i < hues.length; i++) {
			const baseHue = hues[i]
			const complement1 = (baseHue + 150) % 360
			const complement2 = (baseHue + 210) % 360

			const hasComp1 = hues.some((h) => Math.abs(h - complement1) < 30)
			const hasComp2 = hues.some((h) => Math.abs(h - complement2) < 30)

			if (hasComp1 && hasComp2) {
				return {
					type: 'split-complementary',
					hasConflict: false,
					contrastLevel: 'medium',
				}
			}
		}
	}

	// Check for analogous (adjacent hues)
	if (colored.length >= 2) {
		let allAdjacent = true
		for (let i = 1; i < hues.length; i++) {
			const diff = hues[i] - hues[i - 1]
			if (diff > 60) {
				allAdjacent = false
				break
			}
		}
		if (allAdjacent) {
			return {
				type: 'analogous',
				hasConflict: false,
				contrastLevel: 'low',
			}
		}
	}

	// Check for conflicts (very close hues with different saturation/lightness)
	let hasConflict = false
	for (let i = 0; i < colored.length; i++) {
		for (let j = i + 1; j < colored.length; j++) {
			const hueDiff = Math.abs(colored[i].hsl.h - colored[j].hsl.h)
			if (hueDiff < 15) {
				const satDiff = Math.abs(colored[i].hsl.s - colored[j].hsl.s)
				const lightDiff = Math.abs(colored[i].hsl.l - colored[j].hsl.l)
				if (satDiff > 30 || lightDiff > 30) {
					hasConflict = true
					break
				}
			}
		}
		if (hasConflict) break
	}

	// Calculate contrast level
	const primaryColors = colored.filter((c) => c.cluster === 'primary')
	if (primaryColors.length >= 2) {
		const rgb1 = primaryColors[0].rgb
		const rgb2 = primaryColors[1].rgb
		const lab1 = rgbToLab(rgb1.r, rgb1.g, rgb1.b)
		const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b)
		const deltaE = deltaE2000(lab1, lab2)

		let contrastLevel: 'high' | 'medium' | 'low' = 'low'
		if (deltaE >= 20) {
			contrastLevel = 'high'
		} else if (deltaE >= 10) {
			contrastLevel = 'medium'
		}

		return {
			type: 'none',
			hasConflict,
			contrastLevel,
		}
	}

	return {
		type: 'none',
		hasConflict,
		contrastLevel: 'low',
	}
}

