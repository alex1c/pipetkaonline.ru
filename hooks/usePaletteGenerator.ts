/**
 * Palette Generator Hook
 * 
 * Custom React hook for generating color palettes from a base color using
 * various color harmony theories and color manipulation techniques.
 * 
 * Features:
 * - Multiple palette generation modes (monochromatic, analogous, complementary, etc.)
 * - Real-time palette generation based on base color
 * - Full color format support (HEX, RGB, HSL)
 * - Memoized generation functions for performance
 * - Mode switching with state management
 * 
 * Color Harmony Modes:
 * - Monochromatic: Variations of the same hue (different lightness)
 * - Analogous: Adjacent colors on color wheel (±30°)
 * - Complementary: Opposite colors (180° apart)
 * - Triad: Three evenly spaced colors (120° apart)
 * - Tetradic: Four evenly spaced colors (90° apart)
 * - Shades: Darker variations (decreasing lightness)
 * - Tints: Lighter variations (increasing lightness, reducing saturation)
 * - Tones: Variations with different saturation (adding gray)
 * 
 * @module hooks/usePaletteGenerator
 */

import { useState, useMemo, useCallback } from 'react'
import {
	parseColorToRgb,
	rgbToHsl,
	hslToRgb,
	rgbToHex,
	hexToRgb,
} from '@/lib/color-utils'

/**
 * Palette Generation Mode
 * 
 * Defines the color harmony theory or manipulation technique used
 * to generate the palette from the base color.
 * 
 * @typedef {('monochromatic' | 'analogous' | 'complementary' | 'triad' | 'tetradic' | 'shades' | 'tints' | 'tones')} PaletteMode
 */
export type PaletteMode =
	| 'monochromatic'
	| 'analogous'
	| 'complementary'
	| 'triad'
	| 'tetradic'
	| 'shades'
	| 'tints'
	| 'tones'

/**
 * Color Palette Item
 * 
 * Represents a single color in multiple formats for maximum flexibility.
 * All formats are computed and stored to avoid repeated conversions.
 * 
 * @interface ColorPalette
 * @property {string} hex - HEX color string (e.g., "#FF5733")
 * @property {{ r: number; g: number; b: number }} rgb - RGB color values (0-255 each)
 * @property {{ h: number; s: number; l: number }} hsl - HSL color values (h: 0-360, s/l: 0-100)
 */
export interface ColorPalette {
	hex: string
	rgb: { r: number; g: number; b: number }
	hsl: { h: number; s: number; l: number }
}

/**
 * Palette Generator Hook
 * 
 * Generates color palettes from a base color using various color harmony theories.
 * The hook manages the generation mode state and provides memoized palette generation
 * functions for optimal performance.
 * 
 * Usage Flow:
 * 1. User provides base color (HEX, RGB, or HSL format)
 * 2. Base color is converted to HSL for color manipulation
 * 3. User selects generation mode (analogous, complementary, etc.)
 * 4. Hook generates palette based on selected mode
 * 5. Palette is memoized and returned with all color formats
 * 
 * Performance:
 * - Base color conversion is memoized (only recalculates when baseColor changes)
 * - Generation functions are memoized with useCallback
 * - Final palette is memoized (only regenerates when mode or baseColor changes)
 * 
 * @param {string} [baseColor='#3498db'] - Base color in any format (HEX, RGB, HSL)
 *   Defaults to blue (#3498db) if not provided or invalid
 * 
 * @returns {Object} Hook return object containing:
 *   - mode: Current palette generation mode
 *   - setMode: Function to change the generation mode
 *   - palette: Generated color palette array (ColorPalette[])
 *   - baseHsl: Base color in HSL format (for reference)
 * 
 * @example
 * ```tsx
 * const { mode, setMode, palette } = usePaletteGenerator('#FF5733')
 * 
 * // Change mode
 * setMode('complementary')
 * 
 * // Use palette
 * palette.forEach(color => {
 *   console.log(color.hex, color.rgb, color.hsl)
 * })
 * ```
 */
export function usePaletteGenerator(baseColor: string = '#3498db') {
	/**
	 * Palette Generation Mode State
	 * 
	 * Current palette generation mode. Defaults to 'analogous' for a balanced,
	 * harmonious starting point.
	 */
	const [mode, setMode] = useState<PaletteMode>('analogous')

	/**
	 * Base Color in HSL Format
	 * 
	 * Converts the base color to HSL format for color manipulation.
	 * HSL is used because it's easier to manipulate hue, saturation, and lightness
	 * programmatically compared to RGB.
	 * 
	 * Memoization:
	 * - Only recalculates when baseColor changes
	 * - Falls back to default blue if color parsing fails
	 * 
	 * @type {useMemo<{ h: number; s: number; l: number }>}
	 */
	const baseHsl = useMemo(() => {
		const rgb = parseColorToRgb(baseColor)
		// Fallback to default blue if parsing fails
		if (!rgb) return { h: 204, s: 70, l: 53 }
		return rgbToHsl(rgb.r, rgb.g, rgb.b)
	}, [baseColor])

	/**
	 * Generate Monochromatic Palette
	 * 
	 * Creates a palette by varying the lightness of the base color while
	 * keeping hue and saturation constant. This creates a harmonious set
	 * of colors that work well together.
	 * 
	 * Algorithm:
	 * - Keeps hue and saturation from base color
	 * - Varies lightness in steps: 20%, 35%, 50%, 65%, 80%, 95%
	 * - Generates 6 colors total
	 * 
	 * Use Cases:
	 * - Creating subtle, professional color schemes
	 * - UI design where consistency is important
	 * - Background variations
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 6 monochromatic colors
	 * 
	 * @example
	 * generateMonochromatic({ h: 204, s: 70, l: 53 })
	 * // Returns array of 6 colors with same hue/saturation, different lightness
	 */
	const generateMonochromatic = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const steps = [0.2, 0.35, 0.5, 0.65, 0.8, 0.95]

			for (const lightness of steps) {
				const l = Math.round(lightness * 100)
				const rgb = hslToRgb(hsl.h, hsl.s, l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s: hsl.s, l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generate Analogous Palette
	 * 
	 * Creates a palette using colors adjacent to the base color on the color wheel.
	 * Analogous colors create harmonious, natural-looking palettes.
	 * 
	 * Algorithm:
	 * - Base color at center
	 * - Colors at -60°, -30°, 0° (base), +30°, +60° from base hue
	 * - Keeps saturation and lightness constant
	 * - Generates 5 colors total
	 * 
	 * Color Theory:
	 * Analogous colors share a common hue and create smooth transitions.
	 * They're commonly found in nature (sunset colors, ocean colors).
	 * 
	 * Use Cases:
	 * - Natural, harmonious designs
	 * - Background gradients
	 * - Brand color schemes
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 5 analogous colors
	 * 
	 * @example
	 * generateAnalogous({ h: 204, s: 70, l: 53 })
	 * // Returns: [blue-60°, blue-30°, blue, blue+30°, blue+60°]
	 */
	const generateAnalogous = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const offsets = [-60, -30, 0, 30, 60]

			for (const offset of offsets) {
				let h = (hsl.h + offset + 360) % 360
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generate Complementary Palette
	 * 
	 * Creates a palette using the base color and its complement (opposite on color wheel).
	 * Complementary colors create high contrast and visual interest.
	 * 
	 * Algorithm:
	 * - Base color at original hue
	 * - Complement at base hue + 180°
	 * - Adds lighter and darker variations of both colors
	 * - Generates up to 6 colors total
	 * 
	 * Color Theory:
	 * Complementary colors are opposite on the color wheel and create
	 * maximum contrast. They're used for call-to-action buttons and
	 * important UI elements.
	 * 
	 * Use Cases:
	 * - High-contrast designs
	 * - Call-to-action elements
	 * - Eye-catching interfaces
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of up to 6 complementary colors
	 * 
	 * @example
	 * generateComplementary({ h: 0, s: 100, l: 50 }) // Red
	 * // Returns: [red, cyan, red variations, cyan variations]
	 */
	const generateComplementary = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const hues = [hsl.h, (hsl.h + 180) % 360]

			for (const h of hues) {
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
				})
			}

			// Add variations with different lightness
			for (const h of hues) {
				const variations = [hsl.l - 20, hsl.l + 20]
				for (const l of variations) {
					if (l >= 0 && l <= 100) {
						const rgb = hslToRgb(h, hsl.s, l)
						colors.push({
							hex: rgbToHex(rgb.r, rgb.g, rgb.b),
							rgb,
							hsl: { h, s: hsl.s, l },
						})
					}
				}
			}

			return colors.slice(0, 6)
		},
		[]
	)

	/**
	 * Generate Triad Palette
	 * 
	 * Creates a palette using three colors evenly spaced on the color wheel (120° apart).
	 * Triadic colors create vibrant, balanced palettes with good contrast.
	 * 
	 * Algorithm:
	 * - Base color at original hue
	 * - Second color at base hue + 120°
	 * - Third color at base hue + 240°
	 * - Adds lighter and darker variations of all three colors
	 * - Generates up to 8 colors total
	 * 
	 * Color Theory:
	 * Triadic colors form an equilateral triangle on the color wheel.
	 * They provide strong contrast while maintaining balance.
	 * 
	 * Use Cases:
	 * - Vibrant, energetic designs
	 * - Creative projects
	 * - Colorful interfaces
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of up to 8 triadic colors
	 * 
	 * @example
	 * generateTriad({ h: 0, s: 100, l: 50 }) // Red
	 * // Returns: [red, green, blue, and variations]
	 */
	const generateTriad = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const hues = [hsl.h, (hsl.h + 120) % 360, (hsl.h + 240) % 360]

			for (const h of hues) {
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
				})
			}

			// Add lighter and darker variations
			for (const h of hues) {
				const variations = [
					{ s: hsl.s, l: Math.max(0, hsl.l - 15) },
					{ s: hsl.s, l: Math.min(100, hsl.l + 15) },
				]
				for (const variation of variations) {
					const rgb = hslToRgb(h, variation.s, variation.l)
					colors.push({
						hex: rgbToHex(rgb.r, rgb.g, rgb.b),
						rgb,
						hsl: { h, s: variation.s, l: variation.l },
					})
				}
			}

			return colors.slice(0, 8)
		},
		[]
	)

	/**
	 * Generate Tetradic Palette
	 * 
	 * Creates a palette using four colors evenly spaced on the color wheel (90° apart).
	 * Tetradic colors create rich, complex palettes with multiple color relationships.
	 * 
	 * Algorithm:
	 * - Base color at original hue
	 * - Second color at base hue + 90°
	 * - Third color at base hue + 180° (complement)
	 * - Fourth color at base hue + 270°
	 * - Generates 4 colors total
	 * 
	 * Color Theory:
	 * Tetradic colors form a square on the color wheel. They provide
	 * maximum color variety but require careful use to avoid chaos.
	 * 
	 * Use Cases:
	 * - Complex, rich color schemes
	 * - Artistic designs
	 * - Colorful branding
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 4 tetradic colors
	 * 
	 * @example
	 * generateTetradic({ h: 0, s: 100, l: 50 }) // Red
	 * // Returns: [red, yellow, cyan, blue]
	 */
	const generateTetradic = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const hues = [
				hsl.h,
				(hsl.h + 90) % 360,
				(hsl.h + 180) % 360,
				(hsl.h + 270) % 360,
			]

			for (const h of hues) {
				const rgb = hslToRgb(h, hsl.s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h, s: hsl.s, l: hsl.l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generate Shades Palette
	 * 
	 * Creates a palette by darkening the base color (decreasing lightness).
	 * Shades are created by adding black to the base color.
	 * 
	 * Algorithm:
	 * - Keeps hue and saturation constant
	 * - Decreases lightness in steps: 100%, 80%, 60%, 40%, 20%, 0%
	 * - Generates 6 colors from lightest to darkest
	 * 
	 * Use Cases:
	 * - Dark mode variations
	 * - Depth and shadow effects
	 * - Professional, subdued designs
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 6 shades from lightest to darkest
	 * 
	 * @example
	 * generateShades({ h: 204, s: 70, l: 50 })
	 * // Returns: [very light blue, light blue, ..., very dark blue]
	 */
	const generateShades = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const lightnessSteps = [100, 80, 60, 40, 20, 0]

			for (const l of lightnessSteps) {
				const rgb = hslToRgb(hsl.h, hsl.s, l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s: hsl.s, l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generate Tints Palette
	 * 
	 * Creates a palette by lightening the base color (increasing lightness).
	 * Tints are created by adding white to the base color, which also
	 * naturally reduces saturation.
	 * 
	 * Algorithm:
	 * - Keeps hue constant
	 * - Increases lightness in steps: 0%, 20%, 40%, 60%, 80%, 100%
	 * - Reduces saturation proportionally as lightness increases
	 * - Generates 6 colors from darkest to lightest
	 * 
	 * Use Cases:
	 * - Light mode variations
	 * - Pastel color schemes
	 * - Soft, gentle designs
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 6 tints from darkest to lightest
	 * 
	 * @example
	 * generateTints({ h: 204, s: 70, l: 50 })
	 * // Returns: [dark blue, medium blue, ..., very light blue/pastel]
	 */
	const generateTints = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const lightnessSteps = [0, 20, 40, 60, 80, 100]

			for (const l of lightnessSteps) {
				// Reduce saturation as we add white
				const s = Math.max(0, hsl.s - (l / 100) * hsl.s * 0.5)
				const rgb = hslToRgb(hsl.h, s, l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s: Math.round(s), l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generate Tones Palette
	 * 
	 * Creates a palette by varying the saturation of the base color (adding gray).
	 * Tones are created by mixing the base color with gray, creating muted variations.
	 * 
	 * Algorithm:
	 * - Keeps hue and lightness constant
	 * - Decreases saturation in steps: 100%, 75%, 50%, 25%, 10%, 0%
	 * - Generates 6 colors from most saturated to least saturated (grayscale)
	 * 
	 * Use Cases:
	 * - Muted, sophisticated color schemes
	 * - Professional designs
	 * - Subtle color variations
	 * 
	 * @param {{ h: number; s: number; l: number }} hsl - Base color in HSL format
	 * @returns {ColorPalette[]} Array of 6 tones from most to least saturated
	 * 
	 * @example
	 * generateTones({ h: 204, s: 70, l: 50 })
	 * // Returns: [vibrant blue, muted blue, ..., gray]
	 */
	const generateTones = useCallback(
		(hsl: { h: number; s: number; l: number }): ColorPalette[] => {
			const colors: ColorPalette[] = []
			const saturationSteps = [100, 75, 50, 25, 10, 0]

			for (const s of saturationSteps) {
				const rgb = hslToRgb(hsl.h, s, hsl.l)
				colors.push({
					hex: rgbToHex(rgb.r, rgb.g, rgb.b),
					rgb,
					hsl: { h: hsl.h, s, l: hsl.l },
				})
			}

			return colors
		},
		[]
	)

	/**
	 * Generated Palette
	 * 
	 * The current palette generated based on the selected mode and base color.
	 * This is memoized to avoid regenerating the palette on every render.
	 * 
	 * Memoization Dependencies:
	 * - mode: Regenerates when mode changes
	 * - baseHsl: Regenerates when base color changes
	 * - All generation functions: Included for completeness (they're memoized)
	 * 
	 * The palette is generated by calling the appropriate generation function
	 * based on the current mode. If mode is invalid, defaults to analogous.
	 * 
	 * @type {useMemo<ColorPalette[]>}
	 */
	const palette = useMemo(() => {
		switch (mode) {
			case 'monochromatic':
				return generateMonochromatic(baseHsl)
			case 'analogous':
				return generateAnalogous(baseHsl)
			case 'complementary':
				return generateComplementary(baseHsl)
			case 'triad':
				return generateTriad(baseHsl)
			case 'tetradic':
				return generateTetradic(baseHsl)
			case 'shades':
				return generateShades(baseHsl)
			case 'tints':
				return generateTints(baseHsl)
			case 'tones':
				return generateTones(baseHsl)
			default:
				return generateAnalogous(baseHsl)
		}
	}, [
		mode,
		baseHsl,
		generateMonochromatic,
		generateAnalogous,
		generateComplementary,
		generateTriad,
		generateTetradic,
		generateShades,
		generateTints,
		generateTones,
	])

	return {
		mode,
		setMode,
		palette,
		baseHsl,
	}
}
