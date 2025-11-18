/**
 * Color Clustering Utilities
 * 
 * Functions for clustering brand colors into categories:
 * primary, secondary, accent, neutral
 * 
 * @module lib/brand-analysis/colorClustering
 */

import { hexToRgb, rgbToHsl } from '@/lib/color-utils'
import { rgbToLab, deltaE2000 } from '@/lib/color-name-utils'

/**
 * Color cluster type
 */
export type ColorCluster = 'primary' | 'secondary' | 'accent' | 'neutral'

/**
 * Clustered color with metadata
 */
export interface ClusteredColor {
	hex: string
	cluster: ColorCluster
	percentage: number
	rgb: { r: number; g: number; b: number }
	hsl: { h: number; s: number; l: number }
}

/**
 * Cluster colors into categories
 * 
 * Algorithm:
 * 1. Sort by saturation and lightness to identify neutrals
 * 2. Group by hue similarity for primary/secondary
 * 3. Identify accent colors (high saturation, distinct hue)
 * 
 * @param {string[]} colors - Array of color hex codes
 * @returns {ClusteredColor[]} Clustered colors with metadata
 */
export function clusterColors(colors: string[]): ClusteredColor[] {
	if (colors.length === 0) return []

	// Convert to HSL and LAB for analysis
	const colorData = colors.map((hex) => {
		const rgb = hexToRgb(hex)
		if (!rgb) return null

		const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
		const lab = rgbToLab(rgb.r, rgb.g, rgb.b)

		return {
			hex,
			rgb,
			hsl,
			lab,
		}
	}).filter((c): c is NonNullable<typeof c> => c !== null)

	if (colorData.length === 0) return []

	// Identify neutrals (low saturation or very light/dark)
	const neutrals = colorData.filter(
		(c) => c.hsl.s < 20 || c.hsl.l < 10 || c.hsl.l > 90
	)

	// Remaining colors for primary/secondary/accent
	const colored = colorData.filter(
		(c) => !neutrals.includes(c)
	)

	// Sort by saturation and lightness for primary/secondary
	const sortedColored = [...colored].sort((a, b) => {
		// Primary: highest saturation + medium lightness
		const scoreA = a.hsl.s * (1 - Math.abs(a.hsl.l - 50) / 50)
		const scoreB = b.hsl.s * (1 - Math.abs(b.hsl.l - 50) / 50)
		return scoreB - scoreA
	})

	// Assign clusters
	const result: ClusteredColor[] = []

	// Primary: top 1-2 most saturated, medium lightness
	const primaryCount = Math.min(2, Math.ceil(sortedColored.length * 0.3))
	sortedColored.slice(0, primaryCount).forEach((c) => {
		result.push({
			hex: c.hex,
			cluster: 'primary',
			percentage: 100 / colorData.length,
			rgb: c.rgb,
			hsl: c.hsl,
		})
	})

	// Secondary: next 1-2 colors
	const secondaryCount = Math.min(2, Math.ceil(sortedColored.length * 0.3))
	sortedColored.slice(primaryCount, primaryCount + secondaryCount).forEach((c) => {
		result.push({
			hex: c.hex,
			cluster: 'secondary',
			percentage: 100 / colorData.length,
			rgb: c.rgb,
			hsl: c.hsl,
		})
	})

	// Accent: remaining colored (high saturation, distinct)
	sortedColored.slice(primaryCount + secondaryCount).forEach((c) => {
		result.push({
			hex: c.hex,
			cluster: 'accent',
			percentage: 100 / colorData.length,
			rgb: c.rgb,
			hsl: c.hsl,
		})
	})

	// Neutral: all neutral colors
	neutrals.forEach((c) => {
		result.push({
			hex: c.hex,
			cluster: 'neutral',
			percentage: 100 / colorData.length,
			rgb: c.rgb,
			hsl: c.hsl,
		})
	})

	return result
}

