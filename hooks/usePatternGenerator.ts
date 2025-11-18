/**
 * Pattern Generator Hook
 * 
 * Manages state and logic for the Pattern Generator tool.
 * 
 * @module hooks/usePatternGenerator
 */

'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import type { PatternSettings, PatternType } from '@/lib/pattern-renderers/types'
import { renderPattern } from '@/lib/pattern-renderers/base'
import { patternPresets } from '@/lib/pattern-renderers/presets'

/**
 * Pattern Generator Hook
 * 
 * @returns {Object} Hook return object
 */
export function usePatternGenerator() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [settings, setSettings] = useState<PatternSettings>({
		type: 'polka-dots',
		tileSize: 256,
		backgroundColor: '#FFFFFF',
		elementColor: '#000000',
		density: 50,
		elementSize: 50,
		rotation: 0,
		randomness: 20,
		additional: {
			shape: 'circle',
			direction: 'vertical',
			amplitude: 20,
			frequency: 0.02,
			lineWidth: 2,
		},
	})

	const [history, setHistory] = useState<PatternSettings[]>([])

	/**
	 * Load history from localStorage
	 */
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('patternGeneratorHistory')
			if (saved) {
				try {
					const parsed = JSON.parse(saved)
					setHistory(Array.isArray(parsed) ? parsed : [])
				} catch (e) {
					console.error('Failed to load history', e)
				}
			}
		}
	}, [])

	/**
	 * Save history to localStorage
	 */
	useEffect(() => {
		if (typeof window !== 'undefined' && history.length > 0) {
			localStorage.setItem('patternGeneratorHistory', JSON.stringify(history))
		}
	}, [history])

	/**
	 * Update settings
	 */
	const updateSettings = useCallback((updates: Partial<PatternSettings>) => {
		setSettings((prev) => ({ ...prev, ...updates }))
	}, [])

	/**
	 * Apply preset
	 */
	const applyPreset = useCallback((preset: typeof patternPresets[0]) => {
		setSettings(preset.settings)
	}, [])

	/**
	 * Load from history
	 */
	const loadFromHistory = useCallback((historyItem: PatternSettings) => {
		setSettings(historyItem)
	}, [])

	/**
	 * Save to history
	 */
	const saveToHistory = useCallback(() => {
		setHistory((prev) => {
			// Remove duplicates
			const filtered = prev.filter(
				(item) => JSON.stringify(item) !== JSON.stringify(settings)
			)
			return [settings, ...filtered].slice(0, 10)
		})
	}, [settings])

	/**
	 * Render pattern to canvas
	 */
	const render = useCallback(() => {
		if (!canvasRef.current) return
		renderPattern(canvasRef.current, settings)
	}, [settings])

	/**
	 * Auto-render when settings change
	 */
	useEffect(() => {
		render()
	}, [render])

	/**
	 * Download pattern
	 */
	const downloadPattern = useCallback(
		async (format: 'png' | 'jpg' | 'webp') => {
			if (!canvasRef.current) return

			// Ensure canvas is rendered
			render()

			const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`
			canvasRef.current.toBlob(
				(blob) => {
					if (!blob) return
					const url = URL.createObjectURL(blob)
					const a = document.createElement('a')
					a.href = url
					a.download = `pattern-${settings.type}-${settings.tileSize}x${settings.tileSize}.${format}`
					a.click()
					URL.revokeObjectURL(url)
				},
				mimeType,
				format === 'jpg' ? 0.92 : 1.0
			)
		},
		[settings, render]
	)

	/**
	 * Get file size estimate
	 */
	const fileSize = useMemo(() => {
		// Rough estimate based on tile size and format
		const baseSize = settings.tileSize * settings.tileSize * 4 // RGBA
		return Math.round(baseSize / 1024) // KB
	}, [settings.tileSize])

	/**
	 * Reset to defaults
	 */
	const reset = useCallback(() => {
		setSettings({
			type: 'polka-dots',
			tileSize: 256,
			backgroundColor: '#FFFFFF',
			elementColor: '#000000',
			density: 50,
			elementSize: 50,
			rotation: 0,
			randomness: 20,
			additional: {
				shape: 'circle',
				direction: 'vertical',
				amplitude: 20,
				frequency: 0.02,
				lineWidth: 2,
			},
		})
	}, [])

	return {
		canvasRef,
		settings,
		history,
		presets: patternPresets,
		fileSize,
		updateSettings,
		applyPreset,
		loadFromHistory,
		saveToHistory,
		downloadPattern,
		reset,
		render,
	}
}

