/**
 * Extract Colors V2 Hook
 * 
 * Advanced hook for extracting and analyzing colors from images.
 * Implements K-means clustering, color grouping, and semantic classification.
 * 
 * Features:
 * - Image upload and pixel extraction
 * - K-means clustering for dominant colors
 * - Color grouping by tone and family
 * - Palette generation
 * - Image analytics
 * - Multiple export formats
 * 
 * @module hooks/useExtractColorsV2
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import {
	rgbToHslMath,
	hslToRgbMath,
	calculateLuma,
	calculateLightness,
	colorDistance,
	getHueFamily,
	classifyTone,
	generateColorScale,
	lightenColor,
	darkenColor,
} from '@/lib/colorMath'
import { hexToRgb, rgbToHex } from '@/lib/color-utils'

/**
 * Color with metadata
 */
export interface ColorWithMeta {
	hex: string
	rgb: { r: number; g: number; b: number }
	hsl: { h: number; s: number; l: number }
	percentage: number
	family: string
	tone: 'light' | 'mid' | 'dark'
}

/**
 * Color groups
 */
export interface ColorGroups {
	light: ColorWithMeta[]
	mid: ColorWithMeta[]
	dark: ColorWithMeta[]
	warm: ColorWithMeta[]
	cold: ColorWithMeta[]
	neutral: ColorWithMeta[]
	vibrant: ColorWithMeta[]
	muted: ColorWithMeta[]
	pastel: ColorWithMeta[]
	earth: ColorWithMeta[]
}

/**
 * Image analytics
 */
export interface ImageAnalytics {
	averageLightness: number
	darkestColor: ColorWithMeta | null
	lightestColor: ColorWithMeta | null
	dominantHue: number
	mood: {
		temperature: 'warm' | 'cold'
		brightness: 'bright' | 'dark'
		vibrancy: 'vibrant' | 'muted'
		contrast: 'high-contrast' | 'low-contrast'
	}
}

/**
 * Generated palettes
 */
export interface GeneratedPalettes {
	brand: string[]
	ui: {
		primary: string
		surface: string
		accent: string
		neutral: string[]
	}
	creative: string[]
}

/**
 * Extract Colors V2 Hook
 * 
 * Manages image upload, color extraction, clustering, and analysis.
 * 
 * @returns {Object} Hook return object
 */
export function useExtractColorsV2() {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [pixels, setPixels] = useState<{ r: number; g: number; b: number }[]>([])
	const [clusterCount, setClusterCount] = useState<number>(10)
	const [isProcessing, setIsProcessing] = useState(false)

	/**
	 * Handle image file selection
	 */
	const handleImageSelect = useCallback((file: File) => {
		if (!file.type.startsWith('image/')) return

		setImageFile(file)

		// Create preview
		const reader = new FileReader()
		reader.onload = (e) => {
			setImagePreview(e.target?.result as string)
		}
		reader.readAsDataURL(file)

		// Extract pixels
		extractPixels(file)
	}, [])

	/**
	 * Extract pixels from image
	 */
	const extractPixels = useCallback(async (file: File) => {
		setIsProcessing(true)

		const img = new Image()
		const url = URL.createObjectURL(file)

		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) {
				setIsProcessing(false)
				return
			}

			// Limit canvas size for performance (max 500px)
			const maxSize = 500
			const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
			canvas.width = img.width * scale
			canvas.height = img.height * scale

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

			// Extract pixel data
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const pixelArray: { r: number; g: number; b: number }[] = []

			// Sample pixels (every 4th pixel for performance)
			for (let i = 0; i < imageData.data.length; i += 16) {
				pixelArray.push({
					r: imageData.data[i],
					g: imageData.data[i + 1],
					b: imageData.data[i + 2],
				})
			}

			setPixels(pixelArray)
			setIsProcessing(false)
			URL.revokeObjectURL(url)
		}

		img.src = url
	}, [])

	/**
	 * K-means clustering algorithm
	 * 
	 * Groups similar colors into clusters.
	 * 
	 * @param {Array} pixels - Array of RGB pixels
	 * @param {number} k - Number of clusters
	 * @returns {Array} Array of cluster centers (dominant colors)
	 */
	const kMeansClustering = useCallback(
		(pixels: { r: number; g: number; b: number }[], k: number): {
			r: number
			g: number
			b: number
		}[] => {
			if (pixels.length === 0 || k === 0) return []

			// Initialize centroids randomly
			const centroids: { r: number; g: number; b: number }[] = []
			for (let i = 0; i < k; i++) {
				const randomIndex = Math.floor(Math.random() * pixels.length)
				centroids.push({ ...pixels[randomIndex] })
			}

			// Iterate until convergence (max 10 iterations)
			for (let iter = 0; iter < 10; iter++) {
				// Assign pixels to nearest centroid
				const clusters: { r: number; g: number; b: number }[][] = Array(k)
					.fill(null)
					.map(() => [])

				for (const pixel of pixels) {
					let minDist = Infinity
					let nearestCluster = 0

					for (let i = 0; i < centroids.length; i++) {
						const dist = colorDistance(pixel, centroids[i])
						if (dist < minDist) {
							minDist = dist
							nearestCluster = i
						}
					}

					clusters[nearestCluster].push(pixel)
				}

				// Update centroids
				let converged = true
				for (let i = 0; i < k; i++) {
					if (clusters[i].length === 0) continue

					const sum = clusters[i].reduce(
						(acc, p) => ({
							r: acc.r + p.r,
							g: acc.g + p.g,
							b: acc.b + p.b,
						}),
						{ r: 0, g: 0, b: 0 }
					)

					const newCentroid = {
						r: Math.round(sum.r / clusters[i].length),
						g: Math.round(sum.g / clusters[i].length),
						b: Math.round(sum.b / clusters[i].length),
					}

					if (colorDistance(centroids[i], newCentroid) > 1) {
						converged = false
					}

					centroids[i] = newCentroid
				}

				if (converged) break
			}

			return centroids
		},
		[]
	)

	/**
	 * Calculate color percentages
	 * 
	 * Determines how much each color appears in the image.
	 */
	const calculatePercentages = useCallback(
		(
			colors: { r: number; g: number; b: number }[],
			pixels: { r: number; g: number; b: number }[]
		): number[] => {
			if (pixels.length === 0) return colors.map(() => 0)

			const counts = new Array(colors.length).fill(0)

			// Sample pixels for performance
			const sampleSize = Math.min(1000, pixels.length)
			const step = Math.floor(pixels.length / sampleSize)

			for (let i = 0; i < sampleSize; i++) {
				const pixel = pixels[i * step]
				let minDist = Infinity
				let nearestIndex = 0

				for (let j = 0; j < colors.length; j++) {
					const dist = colorDistance(pixel, colors[j])
					if (dist < minDist) {
						minDist = dist
						nearestIndex = j
					}
				}

				counts[nearestIndex]++
			}

			// Convert to percentages
			const total = counts.reduce((a, b) => a + b, 0)
			return counts.map((count) => (total > 0 ? (count / total) * 100 : 0))
		},
		[]
	)

	/**
	 * Dominant colors (5 base)
	 */
	const dominantColors = useMemo<ColorWithMeta[]>(() => {
		if (pixels.length === 0) return []

		const clusters = kMeansClustering(pixels, 5)
		const percentages = calculatePercentages(clusters, pixels)

		return clusters.map((color, index) => {
			const hex = rgbToHex(color.r, color.g, color.b)
			const hsl = rgbToHslMath(color.r, color.g, color.b)
			const lightness = calculateLightness(color.r, color.g, color.b)

			return {
				hex,
				rgb: color,
				hsl,
				percentage: Math.round(percentages[index] * 10) / 10,
				family: getHueFamily(hsl.h, hsl.s, hsl.l),
				tone: classifyTone(lightness),
			}
		})
	}, [pixels, kMeansClustering, calculatePercentages])

	/**
	 * Extended colors (based on clusterCount)
	 */
	const extendedColors = useMemo<ColorWithMeta[]>(() => {
		if (pixels.length === 0) return []

		const extendedCount = clusterCount
		const clusters = kMeansClustering(pixels, extendedCount)
		const percentages = calculatePercentages(clusters, pixels)

		return clusters.map((color, index) => {
			const hex = rgbToHex(color.r, color.g, color.b)
			const hsl = rgbToHslMath(color.r, color.g, color.b)
			const lightness = calculateLightness(color.r, color.g, color.b)

			return {
				hex,
				rgb: color,
				hsl,
				percentage: Math.round(percentages[index] * 10) / 10,
				family: getHueFamily(hsl.h, hsl.s, hsl.l),
				tone: classifyTone(lightness),
			}
		})
	}, [pixels, clusterCount, kMeansClustering, calculatePercentages])

	/**
	 * Colors grouped by tone
	 */
	const colorGroups = useMemo<ColorGroups>(() => {
		const allColors = [...dominantColors, ...extendedColors]
		const groups: ColorGroups = {
			light: [],
			mid: [],
			dark: [],
			warm: [],
			cold: [],
			neutral: [],
			vibrant: [],
			muted: [],
			pastel: [],
			earth: [],
		}

		for (const color of allColors) {
			// Group by tone
			if (color.tone === 'light') groups.light.push(color)
			if (color.tone === 'mid') groups.mid.push(color)
			if (color.tone === 'dark') groups.dark.push(color)

			// Group by family
			if (color.family === 'warm') groups.warm.push(color)
			if (color.family === 'cold') groups.cold.push(color)
			if (color.family === 'neutral') groups.neutral.push(color)
			if (color.family === 'vibrant') groups.vibrant.push(color)
			if (color.family === 'muted') groups.muted.push(color)
			if (color.family === 'pastel') groups.pastel.push(color)
			if (color.family === 'earth') groups.earth.push(color)
		}

		return groups
	}, [dominantColors, extendedColors])

	/**
	 * Image analytics
	 */
	const analytics = useMemo<ImageAnalytics | null>(() => {
		if (pixels.length === 0) return null

		const allColors = [...dominantColors, ...extendedColors]
		if (allColors.length === 0) return null

		// Calculate average lightness
		const totalLightness = allColors.reduce((sum, c) => sum + c.hsl.l, 0)
		const avgLightness = totalLightness / allColors.length

		// Find darkest and lightest
		const darkest = allColors.reduce((min, c) =>
			c.hsl.l < min.hsl.l ? c : min
		)
		const lightest = allColors.reduce((max, c) =>
			c.hsl.l > max.hsl.l ? c : max
		)

		// Calculate dominant hue (weighted average)
		const hueSum = allColors.reduce((sum, c) => sum + c.hsl.h * c.percentage, 0)
		const totalPercentage = allColors.reduce((sum, c) => sum + c.percentage, 0)
		const dominantHue = totalPercentage > 0 ? hueSum / totalPercentage : 0

		// Determine mood
		const avgSaturation = allColors.reduce((sum, c) => sum + c.hsl.s, 0) / allColors.length
		const contrast = lightest.hsl.l - darkest.hsl.l

		const mood: ImageAnalytics['mood'] = {
			temperature: (dominantHue >= 0 && dominantHue <= 180 ? 'warm' : 'cold') as 'warm' | 'cold',
			brightness: (avgLightness >= 50 ? 'bright' : 'dark') as 'bright' | 'dark',
			vibrancy: (avgSaturation >= 50 ? 'vibrant' : 'muted') as 'vibrant' | 'muted',
			contrast: (contrast >= 40 ? 'high-contrast' : 'low-contrast') as 'high-contrast' | 'low-contrast',
		}

		return {
			averageLightness: Math.round(avgLightness),
			darkestColor: darkest,
			lightestColor: lightest,
			dominantHue: Math.round(dominantHue),
			mood,
		}
	}, [pixels, dominantColors, extendedColors])

	/**
	 * Generated palettes
	 */
	const palettes = useMemo<GeneratedPalettes | null>(() => {
		if (dominantColors.length === 0) return null

		// Brand palette - scales from dominant colors
		const brand: string[] = []
		for (const color of dominantColors.slice(0, 5)) {
			const scale = generateColorScale(color.hex)
			brand.push(...scale)
		}

		// UI palette
		const primaryColor = dominantColors[0]
		const ui = {
			primary: primaryColor.hex,
			surface: '#FFFFFF',
			accent: dominantColors.length > 1 ? dominantColors[1].hex : primaryColor.hex,
			neutral: ['#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373', '#525252'],
		}

		// Creative palette - complementary pairs
		const creative: string[] = []
		for (const color of dominantColors.slice(0, 3)) {
			creative.push(color.hex)
			const hsl = color.hsl
			const complementaryHue = (hsl.h + 180) % 360
			const compRgb = hslToRgbMath(complementaryHue, hsl.s, hsl.l)
			creative.push(rgbToHex(compRgb.r, compRgb.g, compRgb.b))
		}

		return { brand, ui, creative }
	}, [dominantColors])

	/**
	 * Export as CSS variables
	 */
	const exportCSS = useCallback((): string => {
		if (!palettes) return ''

		let css = ':root {\n'
		css += '  /* Dominant Colors */\n'
		dominantColors.forEach((color, index) => {
			css += `  --color-dominant-${index + 1}: ${color.hex};\n`
		})
		css += '\n  /* UI Palette */\n'
		css += `  --color-primary: ${palettes.ui.primary};\n`
		css += `  --color-surface: ${palettes.ui.surface};\n`
		css += `  --color-accent: ${palettes.ui.accent};\n`
		css += '\n  /* Brand Palette */\n'
		palettes.brand.slice(0, 10).forEach((color, index) => {
			css += `  --color-brand-${index + 1}: ${color};\n`
		})
		css += '}\n'
		return css
	}, [dominantColors, palettes])

	/**
	 * Export as Tailwind config
	 */
	const exportTailwind = useCallback((): string => {
		if (!palettes) return ''

		let config = 'module.exports = {\n'
		config += '  theme: {\n'
		config += '    extend: {\n'
		config += '      colors: {\n'
		config += '        extract: {\n'
		config += '          dominant: {\n'
		dominantColors.forEach((color, index) => {
			config += `            ${index + 1}: '${color.hex}',\n`
		})
		config += '          },\n'
		config += '          ui: {\n'
		config += `            primary: '${palettes.ui.primary}',\n`
		config += `            surface: '${palettes.ui.surface}',\n`
		config += `            accent: '${palettes.ui.accent}',\n`
		config += '          },\n'
		config += '        },\n'
		config += '      },\n'
		config += '    },\n'
		config += '  },\n'
		config += '}\n'
		return config
	}, [dominantColors, palettes])

	/**
	 * Export as JSON
	 */
	const exportJSON = useCallback((): string => {
		if (!palettes) return ''

		const json = {
			dominant: dominantColors.map((c) => ({
				hex: c.hex,
				rgb: c.rgb,
				percentage: c.percentage,
			})),
			extended: extendedColors.map((c) => ({
				hex: c.hex,
				rgb: c.rgb,
				percentage: c.percentage,
			})),
			palettes: {
				brand: palettes.brand,
				ui: palettes.ui,
				creative: palettes.creative,
			},
			groups: {
				light: colorGroups.light.map((c) => c.hex),
				mid: colorGroups.mid.map((c) => c.hex),
				dark: colorGroups.dark.map((c) => c.hex),
			},
		}

		return JSON.stringify(json, null, 2)
	}, [dominantColors, extendedColors, palettes, colorGroups])

	return {
		imageFile,
		imagePreview,
		isProcessing,
		handleImageSelect,
		dominantColors,
		extendedColors,
		colorGroups,
		analytics,
		palettes,
		clusterCount,
		setClusterCount,
		exportCSS,
		exportTailwind,
		exportJSON,
	}
}

