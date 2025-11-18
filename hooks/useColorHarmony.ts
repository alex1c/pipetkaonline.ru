/**
 * Color Harmony Hook
 * 
 * Custom React hook for generating harmonious color combinations based on
 * color theory principles. Supports multiple harmony modes that create
 * visually pleasing color palettes from a base color.
 * 
 * Harmony Modes:
 * - Analogous: Adjacent colors on color wheel (±30°)
 * - Monochromatic: Variations of same hue (different saturation/lightness)
 * - Complementary: Base color + opposite (180°)
 * - Split Complementary: Base + two colors adjacent to complement
 * - Triadic: Three colors evenly spaced (120° apart)
 * - Tetradic: Four colors evenly spaced (90° apart)
 * - Square: Four colors at 90° intervals
 * - Neutral: Low saturation colors (muted palette)
 * 
 * All harmonies are calculated in HSL color space for accurate
 * color wheel relationships, then converted to RGB and HEX.
 * 
 * @module hooks/useColorHarmony
 * @see https://en.wikipedia.org/wiki/Color_harmony
 */

import { useState, useMemo, useCallback } from 'react'
import {
	parseColorToRgb,
	rgbToHsl,
	hslToRgb,
	rgbToHex,
} from '@/lib/color-utils'

/**
 * Available harmony modes
 * Each mode generates colors using different color theory principles
 */
export type HarmonyMode =
	| 'analogous' // Adjacent colors (±30°)
	| 'monochromatic' // Same hue, different saturation/lightness
	| 'complementary' // Opposite color (180°)
	| 'splitComplementary' // Base + two colors near complement
	| 'triadic' // Three colors (120° apart)
	| 'tetradic' // Four colors (90° apart)
	| 'square' // Four colors at square positions
	| 'neutral' // Low saturation palette

/**
 * Color in harmony palette
 * Contains color in all formats plus optional angle for visualization
 */
export interface HarmonyColor {
	/** HEX color code */
	hex: string
	/** RGB color values */
	rgb: { r: number; g: number; b: number }
	/** HSL color values */
	hsl: { h: number; s: number; l: number }
	/** Optional angle offset from base color (for color wheel diagrams) */
	angle?: number
}

/**
 * Harmony generation result
 * Contains array of harmonious colors and description
 */
export interface HarmonyResult {
	/** Array of harmonious colors */
	colors: HarmonyColor[]
	/** Harmony mode description */
	description: string
}

/**
 * Color Harmony Hook
 * 
 * Generates harmonious color combinations from a base color.
 * Supports multiple harmony modes based on color theory.
 * 
 * Algorithm:
 * 1. Parse base color to RGB
 * 2. Convert RGB to HSL (for color wheel calculations)
 * 3. Calculate harmony colors based on selected mode
 * 4. Convert all colors back to RGB and HEX
 * 5. Return complete palette
 * 
 * @param {string} [baseColor='#3498db'] - Base color in any format (HEX, RGB, HSL)
 * @returns {Object} Hook return object containing:
 *   - mode: Current harmony mode
 *   - setMode: Function to change harmony mode
 *   - harmony: Generated harmony result with colors
 *   - baseHsl: Base color in HSL format
 * 
 * @example
 * ```tsx
 * const { mode, setMode, harmony } = useColorHarmony('#FF5733')
 * 
 * // Switch to triadic harmony
 * setMode('triadic')
 * 
 * // Access generated colors
 * harmony.colors.forEach(color => {
 *   console.log(color.hex) // "#FF5733", "#33FF57", "#5733FF"
 * })
 * ```
 */
export function useColorHarmony(baseColor: string = '#3498db') {
	/**
	 * Current harmony mode state
	 * Defaults to 'analogous' for a safe, pleasing starting point
	 */
	const [mode, setMode] = useState<HarmonyMode>('analogous')

	/**
	 * Base color in HSL format
	 * 
	 * Converts the base color string to HSL for color wheel calculations.
	 * HSL is used because it's easier to calculate harmonies using hue angles.
	 * 
	 * Fallback: If color parsing fails, uses a default blue color
	 * (h: 204, s: 70, l: 53) which is a pleasant medium blue.
	 * 
	 * @type {Object}
	 * @property {number} h - Hue in degrees (0-360)
	 * @property {number} s - Saturation as percentage (0-100)
	 * @property {number} l - Lightness as percentage (0-100)
	 */
	const baseHsl = useMemo(() => {
		const rgb = parseColorToRgb(baseColor)
		if (!rgb) return { h: 204, s: 70, l: 53 }
		return rgbToHsl(rgb.r, rgb.g, rgb.b)
	}, [baseColor])

	/**
	 * Generate Analogous Harmony
	 * 
	 * Creates a palette of colors adjacent on the color wheel.
	 * Analogous colors are harmonious because they share similar hues.
	 * 
	 * Algorithm:
	 * - Takes base color hue
	 * - Generates colors at -30°, 0°, +30° offsets
	 * - Keeps same saturation and lightness
	 * 
	 * Result: 3 colors that work well together (e.g., blue, blue-green, green)
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @param {number} hsl.h - Hue in degrees
	 * @param {number} hsl.s - Saturation percentage
	 * @param {number} hsl.l - Lightness percentage
	 * @returns {HarmonyResult} Harmony result with 3 analogous colors
	 */
	const generateAnalogous = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const offsets = [-30, 0, 30]

			for (const offset of offsets) {
				const h = (hsl.h + offset + 360) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: offset,
				})
			}

			return {
				colors,
				description: 'analogous',
			}
		},
		[]
	)

	/**
	 * Generate Monochromatic Harmony
	 * 
	 * Creates variations of the same hue by changing saturation and lightness.
	 * Monochromatic palettes are very cohesive and elegant.
	 * 
	 * Algorithm:
	 * - Keeps the same hue
	 * - Varies saturation and lightness to create depth
	 * - Generates 5 variations: lighter, more saturated, base, less saturated, darker
	 * 
	 * Result: 5 colors with the same hue but different intensity/brightness
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with 5 monochromatic variations
	 */
	const generateMonochromatic = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const variations = [
				{ s: hsl.s, l: Math.min(100, hsl.l + 30) },
				{ s: Math.min(100, hsl.s + 20), l: hsl.l },
				{ s: hsl.s, l: hsl.l },
				{ s: Math.max(0, hsl.s - 20), l: hsl.l },
				{ s: hsl.s, l: Math.max(0, hsl.l - 30) },
			]

			for (const variation of variations) {
				const rgb = hslToRgb(hsl.h, variation.s, variation.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s: variation.s, l: variation.l },
					angle: 0,
				})
			}

			return {
				colors,
				description: 'monochromatic',
			}
		},
		[]
	)

	/**
	 * Generate Complementary Harmony
	 * 
	 * Creates a palette with the base color and its complement (opposite on color wheel).
	 * Complementary colors create high contrast and visual interest.
	 * 
	 * Algorithm:
	 * - Base color at current hue
	 * - Complement at hue + 180°
	 * - Adds lighter and darker variations of both
	 * 
	 * Result: 4 colors - base, complement, and variations of each
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with complementary colors
	 */
	const generateComplementary = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const hues = [hsl.h, (hsl.h + 180) % 360]

			for (const h of hues) {
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: h === hsl.h ? 0 : 180,
				})
			}

			// Add variations
			for (const h of hues) {
				const variations = [
					{ s: hsl.s, l: Math.min(100, hsl.l + 20) },
					{ s: hsl.s, l: Math.max(0, hsl.l - 20) },
				]
				for (const variation of variations) {
					const rgb = hslToRgb(h, variation.s, variation.l)
					colors.push({
						hex: rgbToHex(rgb.r, rgb.g, rgb.b),
						rgb,
						hsl: { h, s: variation.s, l: variation.l },
						angle: h === hsl.h ? 0 : 180,
					})
				}
			}

			return {
				colors: colors.slice(0, 4),
				description: 'complementary',
			}
		},
		[]
	)

	/**
	 * Generate Split Complementary Harmony
	 * 
	 * Creates a palette with base color and two colors adjacent to its complement.
	 * Less intense than pure complementary, but still provides good contrast.
	 * 
	 * Algorithm:
	 * - Base color at current hue
	 * - Two colors at 150° and 210° from base (adjacent to 180° complement)
	 * 
	 * Result: 3 colors with balanced contrast
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with split complementary colors
	 */
	const generateSplitComplementary = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const offsets = [0, 150, 210]

			for (const offset of offsets) {
				const h = (hsl.h + offset) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: offset,
				})
			}

			return {
				colors,
				description: 'splitComplementary',
			}
		},
		[]
	)

	/**
	 * Generate Triadic Harmony
	 * 
	 * Creates a palette of three colors evenly spaced on the color wheel.
	 * Provides balanced contrast while maintaining harmony.
	 * 
	 * Algorithm:
	 * - Three colors at 0°, 120°, and 240° from base hue
	 * - All colors maintain same saturation and lightness
	 * 
	 * Result: 3 vibrant, balanced colors (e.g., red, green, blue)
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with triadic colors
	 */
	const generateTriadic = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const offsets = [0, 120, 240]

			for (const offset of offsets) {
				const h = (hsl.h + offset) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: offset,
				})
			}

			return {
				colors,
				description: 'triadic',
			}
		},
		[]
	)

	/**
	 * Generate Tetradic Harmony
	 * 
	 * Creates a palette of four colors evenly spaced on the color wheel.
	 * Provides rich, diverse color combinations.
	 * 
	 * Algorithm:
	 * - Four colors at 0°, 90°, 180°, and 270° from base hue
	 * - Forms a rectangle on the color wheel
	 * 
	 * Result: 4 colors with good balance and variety
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with tetradic colors
	 */
	const generateTetradic = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const offsets = [0, 90, 180, 270]

			for (const offset of offsets) {
				const h = (hsl.h + offset) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: offset,
				})
			}

			return {
				colors,
				description: 'tetradic',
			}
		},
		[]
	)

	/**
	 * Generate Square Harmony
	 * 
	 * Similar to tetradic, but colors form a square on the color wheel.
	 * Creates vibrant, diverse palettes with strong contrast.
	 * 
	 * Algorithm:
	 * - Four colors at 0°, 90°, 180°, and 270° from base hue
	 * - Same as tetradic but with different visual interpretation
	 * 
	 * Result: 4 colors forming a square pattern on color wheel
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with square colors
	 */
	const generateSquare = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const offsets = [0, 90, 180, 270]

			for (const offset of offsets) {
				const h = (hsl.h + offset) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
					angle: offset,
				})
			}

			return {
				colors,
				description: 'square',
			}
		},
		[]
	)

	/**
	 * Generate Neutral Harmony
	 * 
	 * Creates a muted, sophisticated palette with low saturation colors.
	 * Perfect for subtle, elegant designs.
	 * 
	 * Algorithm:
	 * - Keeps the same hue
	 * - Uses very low saturation (5-20%)
	 * - Varies lightness for depth
	 * 
	 * Result: 4 muted, neutral colors (grays with slight hue tint)
	 * 
	 * @param {Object} hsl - Base color in HSL format
	 * @returns {HarmonyResult} Harmony result with neutral colors
	 */
	const generateNeutral = useCallback(
		(hsl: { h: number; s: number; l: number }): HarmonyResult => {
			const colors: HarmonyColor[] = []
			const saturations = [5, 10, 15, 20]
			const lightnesses = [30, 50, 70, 90]

			for (let i = 0; i < 4; i++) {
				const s = saturations[i] || 10
				const l = lightnesses[i] || 50
				const rgb = hslToRgb(hsl.h, s, l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s, l },
					angle: 0,
				})
			}

			return {
				colors,
				description: 'neutral',
			}
		},
		[]
	)

	/**
	 * Generated Harmony Result
	 * 
	 * Computed harmony based on current mode and base color.
	 * Automatically recalculates when mode or baseColor changes.
	 * 
	 * Uses useMemo for performance - only recalculates when dependencies change.
	 * 
	 * @type {HarmonyResult}
	 */
	const harmony = useMemo(() => {
		switch (mode) {
			case 'analogous':
				return generateAnalogous(baseHsl)
			case 'monochromatic':
				return generateMonochromatic(baseHsl)
			case 'complementary':
				return generateComplementary(baseHsl)
			case 'splitComplementary':
				return generateSplitComplementary(baseHsl)
			case 'triadic':
				return generateTriadic(baseHsl)
			case 'tetradic':
				return generateTetradic(baseHsl)
			case 'square':
				return generateSquare(baseHsl)
			case 'neutral':
				return generateNeutral(baseHsl)
			default:
				return generateAnalogous(baseHsl)
		}
	}, [
		mode,
		baseHsl,
		generateAnalogous,
		generateMonochromatic,
		generateComplementary,
		generateSplitComplementary,
		generateTriadic,
		generateTetradic,
		generateSquare,
		generateNeutral,
	])

	return {
		mode,
		setMode,
		harmony,
		baseHsl,
	}
}


