/**
 * UI Tokens Generator Hook
 * 
 * Custom React hook for generating UI design tokens from a base color.
 * Manages state and provides functions for token generation and export.
 * 
 * Features:
 * - Base color input and validation
 * - Automatic token generation
 * - Multiple export formats (CSS, Tailwind, JSON)
 * - Real-time updates
 * 
 * @module hooks/useUITokens
 */

import { useState, useMemo, useCallback } from 'react'
import {
	generateUITokens,
	exportAsCSSVariables,
	exportAsTailwindConfig,
	exportAsJSON,
	type UITokens,
} from '@/lib/ui-tokens-utils'
import { hexToRgb } from '@/lib/color-utils'

/**
 * Export format type
 */
export type ExportFormat = 'css' | 'tailwind' | 'json'

/**
 * UI Tokens Hook
 * 
 * Manages base color input and generates UI tokens automatically.
 * Provides export functions for different formats.
 * 
 * @param {string} [initialColor='#3B82F6'] - Initial base color (default: blue)
 * @returns {Object} Hook return object containing:
 *   - baseColor: Current base color
 *   - setBaseColor: Function to update base color
 *   - tokens: Generated UI tokens
 *   - isValidColor: Whether the current color is valid
 *   - exportCSS: Function to export as CSS variables
 *   - exportTailwind: Function to export as Tailwind config
 *   - exportJSON: Function to export as JSON
 * 
 * @example
 * ```tsx
 * const {
 *   baseColor,
 *   setBaseColor,
 *   tokens,
 *   exportCSS
 * } = useUITokens('#3B82F6')
 * 
 * // Update color
 * setBaseColor('#10B981')
 * 
 * // Export
 * const css = exportCSS()
 * ```
 */
export function useUITokens(initialColor: string = '#3B82F6') {
	/**
	 * Base color state
	 * User-selected color that serves as the foundation for all tokens
	 */
	const [baseColor, setBaseColor] = useState(initialColor)

	/**
	 * Validate HEX color format
	 * 
	 * @param {string} color - Color string to validate
	 * @returns {boolean} True if valid HEX color
	 */
	const isValidColor = useMemo(() => {
		const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
		return hexPattern.test(baseColor)
	}, [baseColor])

	/**
	 * Generated UI tokens
	 * Automatically recalculated when baseColor changes
	 * 
	 * Uses useMemo for performance - only regenerates when baseColor changes
	 */
	const tokens = useMemo<UITokens | null>(() => {
		if (!isValidColor) return null
		return generateUITokens(baseColor)
	}, [baseColor, isValidColor])

	/**
	 * Update base color
	 * 
	 * Validates and normalizes HEX color input
	 * 
	 * @param {string} color - New base color
	 * @returns {void}
	 */
	const handleColorChange = useCallback((color: string) => {
		// Normalize: add # if missing
		let normalized = color.trim()
		if (!normalized.startsWith('#')) {
			normalized = '#' + normalized
		}

		// Validate format
		const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
		if (hexPattern.test(normalized)) {
			// Expand 3-digit hex to 6-digit
			if (normalized.length === 4) {
				normalized =
					'#' +
					normalized[1] +
					normalized[1] +
					normalized[2] +
					normalized[2] +
					normalized[3] +
					normalized[3]
			}
			setBaseColor(normalized.toUpperCase())
		}
	}, [])

	/**
	 * Export tokens as CSS variables
	 * 
	 * @returns {string} CSS variables string
	 */
	const exportCSS = useCallback((): string => {
		if (!tokens) return ''
		return exportAsCSSVariables(tokens)
	}, [tokens])

	/**
	 * Export tokens as Tailwind config
	 * 
	 * @returns {string} Tailwind config snippet
	 */
	const exportTailwind = useCallback((): string => {
		if (!tokens) return ''
		return exportAsTailwindConfig(tokens)
	}, [tokens])

	/**
	 * Export tokens as JSON
	 * 
	 * @returns {string} JSON string
	 */
	const exportJSON = useCallback((): string => {
		if (!tokens) return ''
		return exportAsJSON(tokens)
	}, [tokens])

	/**
	 * Get text color for primary (white or black based on luminance)
	 * 
	 * @returns {string} Text color (#FFFFFF or #000000)
	 */
	const getPrimaryTextColor = useCallback((): string => {
		if (!tokens) return '#FFFFFF'
		const rgb = hexToRgb(tokens.primary.base)
		if (!rgb) return '#FFFFFF'

		// Calculate relative luminance
		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
		return luminance > 0.5 ? '#000000' : '#FFFFFF'
	}, [tokens])

	return {
		baseColor,
		setBaseColor: handleColorChange,
		tokens,
		isValidColor,
		exportCSS,
		exportTailwind,
		exportJSON,
		getPrimaryTextColor,
	}
}

