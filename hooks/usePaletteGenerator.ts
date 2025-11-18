import { useState, useMemo, useCallback } from 'react'
import {
	parseColorToRgb,
	rgbToHsl,
	hslToRgb,
	rgbToHex,
	hexToRgb,
} from '@/lib/color-utils'

export type PaletteMode =
	| 'monochromatic'
	| 'analogous'
	| 'complementary'
	| 'triad'
	| 'tetradic'
	| 'shades'
	| 'tints'
	| 'tones'

export interface ColorPalette {
	hex: string
	rgb: { r: number; g: number; b: number }
	hsl: { h: number; s: number; l: number }
}

/**
 * Hook for generating color palettes from a base color
 * Supports multiple generation modes: monochromatic, analogous, complementary, etc.
 */
export function usePaletteGenerator(baseColor: string = '#3498db') {
	const [mode, setMode] = useState<PaletteMode>('analogous')

	/**
	 * Convert base color to HSL
	 */
	const baseHsl = useMemo(() => {
		const rgb = parseColorToRgb(baseColor)
		if (!rgb) return { h: 204, s: 70, l: 53 }
		return rgbToHsl(rgb.r, rgb.g, rgb.b)
	}, [baseColor])

	/**
	 * Generate monochromatic palette
	 * Varies lightness while keeping hue and saturation constant
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
	 * Generate analogous palette
	 * Colors adjacent on the color wheel (±30°)
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
	 * Generate complementary palette
	 * Base color + opposite color (180°)
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
	 * Generate triad palette
	 * Three colors evenly spaced (120° apart)
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
	 * Generate tetradic palette
	 * Four colors evenly spaced (90° apart)
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
	 * Generate shades palette
	 * Decreasing lightness
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
	 * Generate tints palette
	 * Increasing lightness (adding white)
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
	 * Generate tones palette
	 * Varying saturation (adding gray)
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
	 * Generate palette based on selected mode
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
