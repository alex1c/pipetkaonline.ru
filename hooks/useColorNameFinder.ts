/**
 * Color Name Finder Hook
 * 
 * Manages state and logic for the Color Name Finder tool.
 * Handles color input, name generation, similar color matching, and descriptions.
 * 
 * @module hooks/useColorNameFinder
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { hexToRgb, rgbToHex, rgbToHsl, parseColorToRgb } from '@/lib/color-utils'
import {
	rgbToLab,
	labToLch,
	deltaE2000,
	findClosestColorNames,
	algorithmicColorNaming,
	generateMarketingName,
	getColorTags,
	cssColorNames,
} from '@/lib/color-name-utils'
import { calculateLuma } from '@/lib/colorMath'

/**
 * Color name result
 */
export interface ColorNameResult {
	standard: Array<{ name: string; hex: string; distance: number }>
	algorithmic: string
	marketing: string
}

/**
 * Similar color match
 */
export interface SimilarColor {
	hex: string
	name: string
	distance: number
}

/**
 * Color description
 */
export interface ColorDescription {
	short: string
	medium: string
	long: string
}

/**
 * Technical color data
 */
export interface TechnicalData {
	hex: string
	rgb: { r: number; g: number; b: number }
	hsl: { h: number; s: number; l: number }
	lab: { l: number; a: number; b: number }
	lch: { l: number; c: number; h: number }
	contrastWhite: number
	contrastBlack: number
	tags: string[]
}

/**
 * Color Name Finder Hook
 * 
 * @returns {Object} Hook return object
 */
export function useColorNameFinder() {
	const [colorInput, setColorInput] = useState<string>('#FF5733')
	const [customDescription, setCustomDescription] = useState<string>('')
	const [descriptionTone, setDescriptionTone] = useState<'neutral' | 'marketing' | 'artistic'>('neutral')

	/**
	 * Parse and normalize color input
	 */
	const parsedColor = useMemo(() => {
		const rgb = parseColorToRgb(colorInput)
		if (!rgb) return null

		return {
			hex: rgbToHex(rgb.r, rgb.g, rgb.b),
			rgb,
			hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
		}
	}, [colorInput])

	/**
	 * Color names
	 */
	const colorNames = useMemo<ColorNameResult | null>(() => {
		if (!parsedColor) return null

		const standard = findClosestColorNames(parsedColor.hex, cssColorNames, 6)
		const algorithmic = algorithmicColorNaming(
			parsedColor.hsl.h,
			parsedColor.hsl.s,
			parsedColor.hsl.l
		)
		const marketing = generateMarketingName(
			parsedColor.hsl.h,
			parsedColor.hsl.s,
			parsedColor.hsl.l
		)

		return { standard, algorithmic, marketing }
	}, [parsedColor])

	/**
	 * Similar colors
	 */
	const similarColors = useMemo<SimilarColor[]>(() => {
		if (!parsedColor) return []

		const matches = findClosestColorNames(parsedColor.hex, cssColorNames, 6)
		return matches.map((match) => ({
			hex: match.hex,
			name: match.name,
			distance: Math.round(match.distance * 10) / 10,
		}))
	}, [parsedColor])

	/**
	 * Technical data
	 */
	const technicalData = useMemo<TechnicalData | null>(() => {
		if (!parsedColor) return null

		const lab = rgbToLab(parsedColor.rgb.r, parsedColor.rgb.g, parsedColor.rgb.b)
		const lch = labToLch(lab.l, lab.a, lab.b)

		// Calculate contrast ratios
		const luma = calculateLuma(parsedColor.rgb.r, parsedColor.rgb.g, parsedColor.rgb.b)
		const whiteLuma = 1.0
		const blackLuma = 0.0

		const contrastWhite = ((Math.max(luma, whiteLuma) + 0.05) / (Math.min(luma, whiteLuma) + 0.05))
		const contrastBlack = ((Math.max(luma, blackLuma) + 0.05) / (Math.min(luma, blackLuma) + 0.05))

		const tags = getColorTags(parsedColor.hsl.h, parsedColor.hsl.s, parsedColor.hsl.l)

		return {
			hex: parsedColor.hex,
			rgb: parsedColor.rgb,
			hsl: parsedColor.hsl,
			lab: {
				l: Math.round(lab.l * 10) / 10,
				a: Math.round(lab.a * 10) / 10,
				b: Math.round(lab.b * 10) / 10,
			},
			lch: {
				l: Math.round(lch.l * 10) / 10,
				c: Math.round(lch.c * 10) / 10,
				h: Math.round(lch.h),
			},
			contrastWhite: Math.round(contrastWhite * 10) / 10,
			contrastBlack: Math.round(contrastBlack * 10) / 10,
			tags,
		}
	}, [parsedColor])

	/**
	 * Generate color descriptions
	 */
	const generateDescriptions = useCallback((): ColorDescription => {
		if (!parsedColor || !colorNames) {
			return {
				short: '',
				medium: '',
				long: '',
			}
		}

		const { hsl } = parsedColor
		const { standard, algorithmic, marketing } = colorNames

		// Short description
		const short = `${marketing} (${parsedColor.hex})`

		// Medium description (marketing style)
		const medium = `A ${algorithmic.toLowerCase()} color with hex code ${parsedColor.hex}. This ${getColorTags(hsl.h, hsl.s, hsl.l).join(' and ')} shade is similar to ${standard[0]?.name || 'a standard color'}.`

		// Long description (artistic style)
		const long = `This ${marketing.toLowerCase()} embodies a ${algorithmic.toLowerCase()} character. With its ${hsl.s >= 50 ? 'vibrant' : 'subtle'} saturation and ${hsl.l >= 50 ? 'luminous' : 'deep'} lightness, it evokes ${hsl.h < 60 || hsl.h > 300 ? 'warmth and energy' : hsl.h < 180 ? 'freshness and growth' : 'calm and serenity'}. The color ${parsedColor.hex} finds its closest match in the ${standard[0]?.name || 'color spectrum'}, with a perceptual distance of ${standard[0]?.distance ? standard[0].distance.toFixed(1) : 'N/A'} ΔE units.`

		return { short, medium, long }
	}, [parsedColor, colorNames])

	/**
	 * Descriptions
	 */
	const descriptions = useMemo<ColorDescription>(() => {
		const baseDescriptions = generateDescriptions()

		if (customDescription && descriptionTone === 'artistic') {
			return {
				...baseDescriptions,
				long: customDescription || baseDescriptions.long,
			}
		}

		return baseDescriptions
	}, [generateDescriptions, customDescription, descriptionTone])

	/**
	 * Handle color input change
	 */
	const handleColorChange = useCallback((newColor: string) => {
		setColorInput(newColor)
	}, [])

	/**
	 * Handle similar color selection
	 */
	const handleSelectSimilarColor = useCallback((hex: string) => {
		setColorInput(hex)
	}, [])

	return {
		colorInput,
		parsedColor,
		colorNames,
		similarColors,
		technicalData,
		descriptions,
		customDescription,
		descriptionTone,
		handleColorChange,
		handleSelectSimilarColor,
		setCustomDescription,
		setDescriptionTone,
		generateDescriptions,
	}
}

