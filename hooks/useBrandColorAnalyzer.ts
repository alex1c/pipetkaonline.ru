/**
 * Brand Color Analyzer Hook
 * 
 * Manages state and logic for the Brand Color Analyzer tool.
 * 
 * @module hooks/useBrandColorAnalyzer
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'
import { clusterColors, type ClusteredColor } from '@/lib/brand-analysis/colorClustering'
import { analyzePalette, analyzeHarmony, type PaletteCharacteristics, type HarmonyAnalysis } from '@/lib/brand-analysis/paletteAnalysis'
import { analyzeContrastMultiple, type ContrastAnalysis } from '@/lib/brand-analysis/contrastAnalysis'
import { generateDescriptions, type BrandDescriptions } from '@/lib/brand-analysis/descriptions'
import { extractColorsFromImage } from '@/lib/brand-analysis/imageExtraction'
import { predefinedBrands } from '@/lib/brand-analysis/predefinedBrands'

/**
 * Brand Color Analyzer Hook
 * 
 * @returns {Object} Hook return object
 */
export function useBrandColorAnalyzer() {
	const [colors, setColors] = useState<string[]>(['#FF5733', '#33C3F0', '#000000'])
	const [isProcessing, setIsProcessing] = useState(false)

	/**
	 * Parse and validate color input
	 */
	const parsedColors = useMemo(() => {
		return colors
			.map((color) => {
				const rgb = parseColorToRgb(color.trim())
				return rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : null
			})
			.filter((c): c is string => c !== null)
	}, [colors])

	/**
	 * Clustered colors
	 */
	const clusteredColors = useMemo<ClusteredColor[]>(() => {
		if (parsedColors.length === 0) return []
		return clusterColors(parsedColors)
	}, [parsedColors])

	/**
	 * Palette characteristics
	 */
	const characteristics = useMemo<PaletteCharacteristics>(() => {
		if (clusteredColors.length === 0) {
			return {
				temperature: 'neutral',
				brightness: 'medium',
				saturation: 'moderate',
				style: 'corporate',
				tags: [],
			}
		}
		return analyzePalette(clusteredColors)
	}, [clusteredColors])

	/**
	 * Harmony analysis
	 */
	const harmony = useMemo<HarmonyAnalysis>(() => {
		if (clusteredColors.length === 0) {
			return {
				type: 'none',
				hasConflict: false,
				contrastLevel: 'low',
			}
		}
		return analyzeHarmony(clusteredColors)
	}, [clusteredColors])

	/**
	 * Contrast analysis
	 */
	const contrastAnalysis = useMemo<ContrastAnalysis[]>(() => {
		if (parsedColors.length === 0) return []
		return analyzeContrastMultiple(parsedColors)
	}, [parsedColors])

	/**
	 * Descriptions
	 */
	const descriptions = useMemo<BrandDescriptions>(() => {
		if (clusteredColors.length === 0) {
			return {
				short: '',
				marketing: '',
				technical: '',
				recommendations: '',
			}
		}
		return generateDescriptions(clusteredColors, characteristics, harmony)
	}, [clusteredColors, characteristics, harmony])

	/**
	 * Handle color input change
	 */
	const handleColorsChange = useCallback((newColors: string[]) => {
		setColors(newColors)
	}, [])

	/**
	 * Handle image upload
	 */
	const handleImageUpload = useCallback(async (file: File) => {
		setIsProcessing(true)
		try {
			const extractedColors = await extractColorsFromImage(file, 5)
			setColors(extractedColors)
		} catch (error) {
			console.error('Failed to extract colors:', error)
		} finally {
			setIsProcessing(false)
		}
	}, [])

	/**
	 * Handle brand selection
	 */
	const handleBrandSelect = useCallback((brandName: string) => {
		const brand = predefinedBrands.find((b) => b.name === brandName)
		if (brand) {
			setColors(brand.colors)
		}
	}, [])

	/**
	 * Regenerate descriptions
	 */
	const regenerateDescriptions = useCallback(() => {
		// Descriptions are memoized, so this just triggers a re-render
		// In a real implementation, you might want to add randomization
	}, [])

	/**
	 * Export as JSON
	 */
	const exportJSON = useCallback((): string => {
		const data = {
			colors: parsedColors,
			clustered: clusteredColors.map((c) => ({
				hex: c.hex,
				cluster: c.cluster,
			})),
			characteristics,
			harmony,
			contrast: contrastAnalysis,
			descriptions,
		}
		return JSON.stringify(data, null, 2)
	}, [parsedColors, clusteredColors, characteristics, harmony, contrastAnalysis, descriptions])

	/**
	 * Export as CSS variables
	 */
	const exportCSS = useCallback((): string => {
		let css = ':root {\n'
		css += '  /* Brand Colors */\n'
		clusteredColors.forEach((color) => {
			const varName = `--brand-${color.cluster}-${color.hex.slice(1).toLowerCase()}`
			css += `  ${varName}: ${color.hex};\n`
		})
		css += '\n  /* By Cluster */\n'
		const byCluster = {
			primary: clusteredColors.filter((c) => c.cluster === 'primary'),
			secondary: clusteredColors.filter((c) => c.cluster === 'secondary'),
			accent: clusteredColors.filter((c) => c.cluster === 'accent'),
			neutral: clusteredColors.filter((c) => c.cluster === 'neutral'),
		}
		Object.entries(byCluster).forEach(([cluster, colors]) => {
			if (colors.length > 0) {
				css += `  --brand-${cluster}: ${colors[0].hex};\n`
			}
		})
		css += '}\n'
		return css
	}, [clusteredColors])

	return {
		colors,
		parsedColors,
		clusteredColors,
		characteristics,
		harmony,
		contrastAnalysis,
		descriptions,
		isProcessing,
		handleColorsChange,
		handleImageUpload,
		handleBrandSelect,
		regenerateDescriptions,
		exportJSON,
		exportCSS,
		predefinedBrands,
	}
}

