/**
 * UI Theme Generator Hook
 * 
 * Manages state and logic for the UI Theme Generator tool.
 * 
 * @module hooks/useUIThemeGenerator
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'
import { generateSemanticTokens, type UIThemeTokens } from '@/lib/theme-generator/semanticTokens'
import { themePresets, type ThemePreset } from '@/lib/theme-generator/themePresets'
import { extractColorsFromImage } from '@/lib/brand-analysis/imageExtraction'
import { calculateLuma } from '@/lib/colorMath'

/**
 * Contrast check result
 */
export interface ContrastCheck {
	color1: string
	color2: string
	ratio: number
	wcagAA: boolean
	wcagAAA: boolean
	wcagAALarge: boolean
	recommendation?: string
}

/**
 * UI Theme Generator Hook
 * 
 * @returns {Object} Hook return object
 */
export function useUIThemeGenerator() {
	const [baseColor, setBaseColor] = useState<string>('#3B82F6')
	const [mode, setMode] = useState<'light' | 'dark' | 'auto'>('auto')
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
	const [isProcessing, setIsProcessing] = useState(false)

	/**
	 * Parse and validate base color
	 */
	const parsedBaseColor = useMemo(() => {
		const rgb = parseColorToRgb(baseColor)
		return rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : baseColor
	}, [baseColor])

	/**
	 * Determine actual mode
	 */
	const actualMode = useMemo<'light' | 'dark'>(() => {
		if (mode !== 'auto') return mode

		const rgb = parseColorToRgb(parsedBaseColor)
		if (!rgb) return 'light'

		const luma = calculateLuma(rgb.r, rgb.g, rgb.b)
		return luma >= 0.5 ? 'light' : 'dark'
	}, [mode, parsedBaseColor])

	/**
	 * Generate UI theme tokens
	 */
	const tokens = useMemo<UIThemeTokens>(() => {
		return generateSemanticTokens(parsedBaseColor, actualMode)
	}, [parsedBaseColor, actualMode])

	/**
	 * Calculate contrast checks
	 */
	const contrastChecks = useMemo<ContrastCheck[]>(() => {
		const checks: ContrastCheck[] = []

		// Primary vs primary-foreground
		const primaryContrast = calculateContrast(tokens.primary.base, tokens.primary.foreground)
		checks.push({
			color1: tokens.primary.base,
			color2: tokens.primary.foreground,
			ratio: primaryContrast,
			wcagAA: primaryContrast >= 4.5,
			wcagAAA: primaryContrast >= 7.0,
			wcagAALarge: primaryContrast >= 3.0,
			recommendation: primaryContrast < 4.5 ? 'Increase contrast for better readability' : undefined,
		})

		// Secondary vs secondary-foreground
		const secondaryContrast = calculateContrast(tokens.secondary.base, tokens.secondary.foreground)
		checks.push({
			color1: tokens.secondary.base,
			color2: tokens.secondary.foreground,
			ratio: secondaryContrast,
			wcagAA: secondaryContrast >= 4.5,
			wcagAAA: secondaryContrast >= 7.0,
			wcagAALarge: secondaryContrast >= 3.0,
			recommendation: secondaryContrast < 4.5 ? 'Increase contrast for better readability' : undefined,
		})

		// Text vs background
		const textContrast = calculateContrast(tokens.neutral.background, tokens.neutral.foreground)
		checks.push({
			color1: tokens.neutral.background,
			color2: tokens.neutral.foreground,
			ratio: textContrast,
			wcagAA: textContrast >= 4.5,
			wcagAAA: textContrast >= 7.0,
			wcagAALarge: textContrast >= 3.0,
			recommendation: textContrast < 4.5 ? 'Increase contrast for better readability' : undefined,
		})

		// Card vs background
		const cardContrast = calculateContrast(tokens.neutral.background, tokens.neutral.card)
		checks.push({
			color1: tokens.neutral.background,
			color2: tokens.neutral.card,
			ratio: cardContrast,
			wcagAA: cardContrast >= 4.5,
			wcagAAA: cardContrast >= 7.0,
			wcagAALarge: cardContrast >= 3.0,
			recommendation: cardContrast < 1.2 ? 'Increase card contrast for better visibility' : undefined,
		})

		return checks
	}, [tokens])

	/**
	 * Calculate contrast ratio
	 */
	function calculateContrast(color1: string, color2: string): number {
		const rgb1 = parseColorToRgb(color1)
		const rgb2 = parseColorToRgb(color2)

		if (!rgb1 || !rgb2) return 0

		const luma1 = calculateLuma(rgb1.r, rgb1.g, rgb1.b)
		const luma2 = calculateLuma(rgb2.r, rgb2.g, rgb2.b)

		const lighter = Math.max(luma1, luma2)
		const darker = Math.min(luma1, luma2)

		return (lighter + 0.05) / (darker + 0.05)
	}

	/**
	 * Handle base color change
	 */
	const handleBaseColorChange = useCallback((newColor: string) => {
		setBaseColor(newColor)
		setSelectedPreset(null)
	}, [])

	/**
	 * Handle preset selection
	 */
	const handlePresetSelect = useCallback((presetName: string) => {
		const preset = themePresets.find((p) => p.name === presetName)
		if (preset) {
			setBaseColor(preset.baseColor)
			setMode(preset.mode)
			setSelectedPreset(presetName)
		}
	}, [])

	/**
	 * Handle image upload
	 */
	const handleImageUpload = useCallback(async (file: File) => {
		setIsProcessing(true)
		try {
			const extractedColors = await extractColorsFromImage(file, 1)
			if (extractedColors.length > 0) {
				setBaseColor(extractedColors[0])
				setSelectedPreset(null)
			}
		} catch (error) {
			console.error('Failed to extract colors:', error)
		} finally {
			setIsProcessing(false)
		}
	}, [])

	/**
	 * Export as CSS variables
	 */
	const exportCSS = useCallback((): string => {
		let css = ':root {\n'
		css += '  /* Primary Colors */\n'
		css += `  --color-primary: ${tokens.primary.base};\n`
		css += `  --color-primary-hover: ${tokens.primary.hover};\n`
		css += `  --color-primary-active: ${tokens.primary.active};\n`
		css += `  --color-primary-foreground: ${tokens.primary.foreground};\n`
		css += '\n  /* Secondary Colors */\n'
		css += `  --color-secondary: ${tokens.secondary.base};\n`
		css += `  --color-secondary-hover: ${tokens.secondary.hover};\n`
		css += `  --color-secondary-foreground: ${tokens.secondary.foreground};\n`
		css += '\n  /* Neutral Colors */\n'
		css += `  --color-background: ${tokens.neutral.background};\n`
		css += `  --color-foreground: ${tokens.neutral.foreground};\n`
		css += `  --color-card: ${tokens.neutral.card};\n`
		css += `  --color-muted: ${tokens.neutral.muted};\n`
		css += '\n  /* Status Colors */\n'
		css += `  --color-success: ${tokens.status.success};\n`
		css += `  --color-warning: ${tokens.status.warning};\n`
		css += `  --color-error: ${tokens.status.error};\n`
		css += `  --color-info: ${tokens.status.info};\n`
		css += '\n  /* Borders */\n'
		css += `  --color-border: ${tokens.borders.base};\n`
		css += `  --color-border-strong: ${tokens.borders.strong};\n`
		css += `  --color-ring: ${tokens.borders.ring};\n`
		css += '\n  /* Shadows */\n'
		css += `  --shadow-sm: ${tokens.shadows.sm};\n`
		css += `  --shadow-md: ${tokens.shadows.md};\n`
		css += `  --shadow-lg: ${tokens.shadows.lg};\n`
		css += '}\n'
		return css
	}, [tokens])

	/**
	 * Export as Tailwind config
	 */
	const exportTailwind = useCallback((): string => {
		let config = 'module.exports = {\n'
		config += '  theme: {\n'
		config += '    extend: {\n'
		config += '      colors: {\n'
		config += '        primary: {\n'
		config += `          DEFAULT: '${tokens.primary.base}',\n`
		config += `          hover: '${tokens.primary.hover}',\n`
		config += `          active: '${tokens.primary.active}',\n`
		config += `          foreground: '${tokens.primary.foreground}',\n`
		config += '        },\n'
		config += '        secondary: {\n'
		config += `          DEFAULT: '${tokens.secondary.base}',\n`
		config += `          hover: '${tokens.secondary.hover}',\n`
		config += `          foreground: '${tokens.secondary.foreground}',\n`
		config += '        },\n'
		config += '        neutral: {\n'
		config += `          background: '${tokens.neutral.background}',\n`
		config += `          foreground: '${tokens.neutral.foreground}',\n`
		config += `          card: '${tokens.neutral.card}',\n`
		config += `          muted: '${tokens.neutral.muted}',\n`
		config += '        },\n'
		config += '        status: {\n'
		config += `          success: '${tokens.status.success}',\n`
		config += `          warning: '${tokens.status.warning}',\n`
		config += `          error: '${tokens.status.error}',\n`
		config += `          info: '${tokens.status.info}',\n`
		config += '        },\n'
		config += '        border: {\n'
		config += `          DEFAULT: '${tokens.borders.base}',\n`
		config += `          strong: '${tokens.borders.strong}',\n`
		config += `          ring: '${tokens.borders.ring}',\n`
		config += '        },\n'
		config += '      },\n'
		config += '      boxShadow: {\n'
		config += `        sm: '0 1px 2px 0 ${tokens.shadows.sm}',\n`
		config += `        md: '0 4px 6px -1px ${tokens.shadows.md}',\n`
		config += `        lg: '0 10px 15px -3px ${tokens.shadows.lg}',\n`
		config += '      },\n'
		config += '    },\n'
		config += '  },\n'
		config += '}\n'
		return config
	}, [tokens])

	/**
	 * Export as JSON tokens
	 */
	const exportJSON = useCallback((): string => {
		const json = {
			$schema: 'https://schemas.figma.com/tokens/1.0',
			tokens: {
				color: {
					primary: {
						base: { value: tokens.primary.base },
						hover: { value: tokens.primary.hover },
						active: { value: tokens.primary.active },
						foreground: { value: tokens.primary.foreground },
					},
					secondary: {
						base: { value: tokens.secondary.base },
						hover: { value: tokens.secondary.hover },
						foreground: { value: tokens.secondary.foreground },
					},
					neutral: {
						background: { value: tokens.neutral.background },
						foreground: { value: tokens.neutral.foreground },
						card: { value: tokens.neutral.card },
						muted: { value: tokens.neutral.muted },
					},
					status: {
						success: { value: tokens.status.success },
						warning: { value: tokens.status.warning },
						error: { value: tokens.status.error },
						info: { value: tokens.status.info },
					},
					border: {
						base: { value: tokens.borders.base },
						strong: { value: tokens.borders.strong },
						ring: { value: tokens.borders.ring },
					},
					shadow: {
						sm: { value: tokens.shadows.sm },
						md: { value: tokens.shadows.md },
						lg: { value: tokens.shadows.lg },
					},
				},
			},
		}
		return JSON.stringify(json, null, 2)
	}, [tokens])

	/**
	 * Export as Figma Tokens format
	 */
	const exportFigma = useCallback((): string => {
		return exportJSON() // Figma uses same format as JSON tokens
	}, [exportJSON])

	return {
		baseColor,
		parsedBaseColor,
		mode,
		actualMode,
		tokens,
		contrastChecks,
		selectedPreset,
		isProcessing,
		themePresets,
		handleBaseColorChange,
		handlePresetSelect,
		handleImageUpload,
		setMode,
		exportCSS,
		exportTailwind,
		exportJSON,
		exportFigma,
	}
}

