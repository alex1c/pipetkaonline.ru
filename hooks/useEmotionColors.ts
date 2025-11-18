/**
 * Emotion Colors Hook
 * 
 * Manages state and logic for the Emotion Colors tool.
 * 
 * @module hooks/useEmotionColors
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import {
	generateEmotionPalette,
	findSimilarEmotions,
	type EmotionPalette,
} from '@/lib/moodToColor'
import { hexToRgb, hexToHsl } from '@/lib/color-utils'

/**
 * Emotion option
 */
export interface EmotionOption {
	key: string
	label: string
}

/**
 * Generation options
 */
export interface GenerationOptions {
	warm?: boolean
	bright?: boolean
	natural?: boolean
}

/**
 * Color with formats
 */
export interface ColorFormats {
	hex: string
	rgb: string
	hsl: string
}

/**
 * Emotion Colors Hook
 * 
 * @returns {Object} Hook return object
 */
export function useEmotionColors() {
	const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
	const [customEmotion, setCustomEmotion] = useState<string>('')
	const [options, setOptions] = useState<GenerationOptions>({})
	const [currentPalette, setCurrentPalette] = useState<EmotionPalette | null>(null)
	const [savedPalettes, setSavedPalettes] = useState<EmotionPalette[]>([])

	/**
	 * Generate palette for selected emotion
	 */
	const generatePalette = useCallback(() => {
		if (!selectedEmotion) return

		const palette = generateEmotionPalette(selectedEmotion, options)
		setCurrentPalette(palette)
	}, [selectedEmotion, options])

	/**
	 * Handle emotion selection
	 */
	const handleEmotionSelect = useCallback(
		(emotionKey: string) => {
			setSelectedEmotion(emotionKey)
			setCustomEmotion('')
		},
		[]
	)

	/**
	 * Handle custom emotion input
	 */
	const handleCustomEmotion = useCallback((text: string) => {
		setCustomEmotion(text)
		if (text.trim()) {
			const similar = findSimilarEmotions(text)
			if (similar.length > 0) {
				// Use first similar emotion as base
				const palette = generateEmotionPalette(similar[0], options)
				setCurrentPalette(palette)
				setSelectedEmotion('custom')
			}
		}
	}, [options])

	/**
	 * Generate new variation
	 */
	const generateVariation = useCallback(() => {
		if (!selectedEmotion) return

		const palette = generateEmotionPalette(selectedEmotion, options)
		setCurrentPalette(palette)
	}, [selectedEmotion, options])

	/**
	 * Get color formats
	 */
	const getColorFormats = useCallback((hex: string): ColorFormats => {
		const rgb = hexToRgb(hex)
		const hsl = hexToHsl(hex)

		if (!rgb || !hsl) {
			return { hex, rgb: 'N/A', hsl: 'N/A' }
		}

		return {
			hex,
			rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
		}
	}, [])

	/**
	 * Copy color to clipboard
	 */
	const copyColor = useCallback(async (hex: string) => {
		await navigator.clipboard.writeText(hex)
	}, [])

	/**
	 * Export palette as JSON
	 */
	const exportJSON = useCallback(() => {
		if (!currentPalette) return

		const json = JSON.stringify(currentPalette, null, 2)
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `emotion-palette-${selectedEmotion || 'custom'}.json`
		a.click()
		URL.revokeObjectURL(url)
	}, [currentPalette, selectedEmotion])

	/**
	 * Export palette as CSS variables
	 */
	const exportCSS = useCallback(async () => {
		if (!currentPalette) return

		const css = `:root {
  /* Key Colors */
  --emotion-key-1: ${currentPalette.keyColors[0]};
  --emotion-key-2: ${currentPalette.keyColors[1]};
  --emotion-key-3: ${currentPalette.keyColors[2]};
  
  /* Secondary Colors */
  --emotion-secondary-1: ${currentPalette.secondary[0]};
  --emotion-secondary-2: ${currentPalette.secondary[1]};
  
  /* Soft Colors */
  --emotion-soft-1: ${currentPalette.softColors[0]};
  --emotion-soft-2: ${currentPalette.softColors[1]};
  --emotion-soft-3: ${currentPalette.softColors[2]};
  --emotion-soft-4: ${currentPalette.softColors[3]};
  --emotion-soft-5: ${currentPalette.softColors[4]};
}`

		await navigator.clipboard.writeText(css)
	}, [currentPalette])

	/**
	 * Save palette to collection
	 */
	const saveToCollection = useCallback(() => {
		if (!currentPalette) return

		const newPalettes = [...savedPalettes, currentPalette]
		setSavedPalettes(newPalettes)

		// Save to localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem('emotionPalettes', JSON.stringify(newPalettes))
		}
	}, [currentPalette, savedPalettes])

	/**
	 * Load saved palettes from localStorage
	 */
	useMemo(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('emotionPalettes')
			if (saved) {
				try {
					setSavedPalettes(JSON.parse(saved))
				} catch (e) {
					console.error('Failed to load saved palettes', e)
				}
			}
		}
	}, [])

	return {
		selectedEmotion,
		customEmotion,
		options,
		currentPalette,
		savedPalettes,
		handleEmotionSelect,
		handleCustomEmotion,
		setOptions,
		generatePalette,
		generateVariation,
		getColorFormats,
		copyColor,
		exportJSON,
		exportCSS,
		saveToCollection,
	}
}

