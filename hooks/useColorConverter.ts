/**
 * Color Converter Hook
 * 
 * Custom React hook for managing color conversion between different formats.
 * Provides real-time bidirectional conversion between HEX, RGB, and HSL color formats.
 * 
 * Features:
 * - Real-time conversion as user types
 * - Automatic format detection
 * - Bidirectional conversion (change any format, others update)
 * - Input validation and error handling
 * - Computed color values for display
 * - Text color suggestion based on background luminance
 * 
 * @module hooks/useColorConverter
 */

import { useState, useMemo, useCallback } from 'react'
import {
	hexToRgb,
	rgbToHex,
	rgbToHsl,
	hslToRgb,
	parseRgb,
	parseHsl,
	parseColorToRgb,
} from '@/lib/color-utils'

/**
 * Supported color formats for conversion
 */
export type ColorFormat = 'hex' | 'rgb' | 'hsl'

/**
 * RGB color representation
 * Each component ranges from 0 to 255
 */
export interface RgbColor {
	r: number
	g: number
	b: number
}

/**
 * HSL color representation
 * Hue: 0-360 degrees
 * Saturation: 0-100 percentage
 * Lightness: 0-100 percentage
 */
export interface HslColor {
	h: number
	s: number
	l: number
}

/**
 * Complete color converter state
 * Contains all format representations and metadata
 */
export interface ColorConverterState {
	hex: string
	rgb: RgbColor | null
	hsl: HslColor | null
	error: string | null
	format: ColorFormat | null
}

/**
 * Color Converter Hook
 * 
 * Manages state and conversion logic for color format conversion.
 * When user inputs a color in any format, automatically converts and
 * updates all other formats in real-time.
 * 
 * Conversion flow:
 * 1. User inputs color in one format (HEX, RGB, or HSL)
 * 2. Parse input to RGB (common intermediate format)
 * 3. Convert RGB to all other formats
 * 4. Update all input fields and computed values
 * 
 * @param {string} initialColor - Initial color value in HEX format (default: '#000000')
 * @returns {Object} Hook return object containing:
 *   - Input values: hexInput, rgbInput, hslInput
 *   - Change handlers: handleHexChange, handleRgbChange, handleHslChange
 *   - Computed values: currentHex, currentRgb, currentHsl
 *   - Utilities: getTextColor, activeFormat
 * 
 * @example
 * ```tsx
 * const {
 *   hexInput,
 *   handleHexChange,
 *   currentRgb,
 *   getTextColor
 * } = useColorConverter('#FF5733')
 * 
 * // User types in HEX input
 * handleHexChange('#00A8CC')
 * // Automatically updates rgbInput and hslInput
 * ```
 */
export function useColorConverter(initialColor: string = '#000000') {
	const [hexInput, setHexInput] = useState(initialColor)
	const [rgbInput, setRgbInput] = useState('rgb(0, 0, 0)')
	const [hslInput, setHslInput] = useState('hsl(0, 0%, 0%)')
	const [activeFormat, setActiveFormat] = useState<ColorFormat | null>(null)

	/**
	 * Convert HEX to RGB
	 */
	const hexToRgbColor = useCallback((hex: string): RgbColor | null => {
		return hexToRgb(hex)
	}, [])

	/**
	 * Convert RGB to HEX
	 */
	const rgbToHexColor = useCallback((rgb: RgbColor): string => {
		return rgbToHex(rgb.r, rgb.g, rgb.b)
	}, [])

	/**
	 * Convert RGB to HSL
	 */
	const rgbToHslColor = useCallback((rgb: RgbColor): HslColor => {
		const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
		return { h: hsl.h, s: hsl.s, l: hsl.l }
	}, [])

	/**
	 * Convert HSL to RGB
	 */
	const hslToRgbColor = useCallback((hsl: HslColor): RgbColor | null => {
		return hslToRgb(hsl.h, hsl.s, hsl.l)
	}, [])

	/**
	 * Update all formats from a base RGB color
	 */
	const updateFromRgb = useCallback(
		(rgb: RgbColor) => {
			const hex = rgbToHexColor(rgb)
			const hsl = rgbToHslColor(rgb)

			setHexInput(hex)
			setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
			setHslInput(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
		},
		[rgbToHexColor, rgbToHslColor]
	)

	/**
	 * Update from HEX input
	 */
	const handleHexChange = useCallback(
		(value: string) => {
			setHexInput(value)
			setActiveFormat('hex')

			// Auto-add # if missing
			let hexValue = value
			if (!hexValue.startsWith('#') && /^[0-9a-fA-F]{6}$/.test(hexValue)) {
				hexValue = '#' + hexValue
			}

			const rgb = hexToRgbColor(hexValue)
			if (rgb) {
				updateFromRgb(rgb)
			}
		},
		[hexToRgbColor, updateFromRgb]
	)

	/**
	 * Update from RGB input
	 */
	const handleRgbChange = useCallback(
		(value: string) => {
			setRgbInput(value)
			setActiveFormat('rgb')

			const rgb = parseRgb(value)
			if (rgb) {
				updateFromRgb(rgb)
			}
		},
		[updateFromRgb]
	)

	/**
	 * Update from HSL input
	 */
	const handleHslChange = useCallback(
		(value: string) => {
			setHslInput(value)
			setActiveFormat('hsl')

			const hsl = parseHsl(value)
			if (hsl) {
				const rgb = hslToRgbColor(hsl)
				if (rgb) {
					updateFromRgb(rgb)
				}
			}
		},
		[hslToRgbColor, updateFromRgb]
	)

	/**
	 * Get current RGB color (computed from current inputs)
	 */
	const currentRgb = useMemo(() => {
		if (activeFormat === 'hex') {
			return hexToRgbColor(hexInput)
		} else if (activeFormat === 'rgb') {
			return parseRgb(rgbInput)
		} else if (activeFormat === 'hsl') {
			const hsl = parseHsl(hslInput)
			return hsl ? hslToRgbColor(hsl) : null
		}
		// Fallback: try to parse any format
		return parseColorToRgb(hexInput) || parseColorToRgb(rgbInput) || parseColorToRgb(hslInput)
	}, [activeFormat, hexInput, rgbInput, hslInput, hexToRgbColor, hslToRgbColor])

	/**
	 * Get current HSL color
	 */
	const currentHsl = useMemo(() => {
		if (!currentRgb) return null
		return rgbToHslColor(currentRgb)
	}, [currentRgb, rgbToHslColor])

	/**
	 * Get current HEX color
	 */
	const currentHex = useMemo(() => {
		if (!currentRgb) return '#000000'
		return rgbToHexColor(currentRgb)
	}, [currentRgb, rgbToHexColor])

	/**
	 * Determine best text color (black or white) for contrast
	 */
	const getTextColor = useCallback((rgb: RgbColor | null): string => {
		if (!rgb) return '#000000'

		// Calculate relative luminance
		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

		// Use white text for dark backgrounds, black for light
		return luminance > 0.5 ? '#000000' : '#ffffff'
	}, [])

	return {
		// Input values
		hexInput,
		rgbInput,
		hslInput,

		// Handlers
		handleHexChange,
		handleRgbChange,
		handleHslChange,

		// Computed values
		currentHex,
		currentRgb,
		currentHsl,

		// Utilities
		getTextColor,
		activeFormat,
	}
}


