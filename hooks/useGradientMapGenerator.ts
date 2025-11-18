/**
 * Gradient Map Generator Hook
 * 
 * Manages state and logic for the Gradient Map Generator tool.
 * 
 * @module hooks/useGradientMapGenerator
 */

'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import type { GradientStop } from '@/lib/gradient-map/interpolateColors'
import type { BlendMode } from '@/lib/gradient-map/applyGradientMap'
import { applyGradientMap } from '@/lib/gradient-map/applyGradientMap'
import { gradientPresets } from '@/lib/gradient-map/gradientPresets'

/**
 * Preview mode
 */
export type PreviewMode = 'before' | 'after' | 'split'

/**
 * Gradient Map Generator Hook
 * 
 * @returns {Object} Hook return object
 */
export function useGradientMapGenerator() {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [imageData, setImageData] = useState<ImageData | null>(null)
	const [processedImageData, setProcessedImageData] = useState<ImageData | null>(null)
	const [previewMode, setPreviewMode] = useState<PreviewMode>('after')
	const [splitPosition, setSplitPosition] = useState<number>(50) // 0-100
	const [gradientStops, setGradientStops] = useState<GradientStop[]>([
		{ position: 0, color: '#000000' },
		{ position: 1, color: '#FFFFFF' },
	])
	const [intensity, setIntensity] = useState<number>(1.0)
	const [blendMode, setBlendMode] = useState<BlendMode>('normal')
	const [useLAB, setUseLAB] = useState<boolean>(true)
	const inputCanvasRef = useRef<HTMLCanvasElement>(null)
	const outputCanvasRef = useRef<HTMLCanvasElement>(null)

	/**
	 * Handle image file upload
	 */
	const handleImageUpload = useCallback((file: File) => {
		setImageFile(file)
		const url = URL.createObjectURL(file)
		setImageUrl(url)

		// Load image and extract image data
		const img = new Image()
		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			// Limit canvas size for performance
			const maxSize = 1000
			const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
			canvas.width = img.width * scale
			canvas.height = img.height * scale

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
			const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
			setImageData(data)
		}
		img.src = url
	}, [])

	/**
	 * Process image with gradient map
	 */
	const processImage = useCallback(() => {
		if (!imageData || gradientStops.length < 2) return

		const processed = applyGradientMap(imageData, gradientStops, intensity, blendMode, useLAB)
		setProcessedImageData(processed)
	}, [imageData, gradientStops, intensity, blendMode, useLAB])

	/**
	 * Process image when settings change
	 */
	useMemo(() => {
		if (imageData) {
			processImage()
		}
	}, [imageData, gradientStops, intensity, blendMode, useLAB, processImage])

	/**
	 * Add gradient stop
	 */
	const addGradientStop = useCallback((position: number, color: string = '#808080') => {
		setGradientStops((prev) => {
			const newStops = [...prev, { position, color }]
			return newStops.sort((a, b) => a.position - b.position)
		})
	}, [])

	/**
	 * Remove gradient stop
	 */
	const removeGradientStop = useCallback((index: number) => {
		setGradientStops((prev) => {
			if (prev.length <= 2) return prev // Keep at least 2 stops
			return prev.filter((_, i) => i !== index)
		})
	}, [])

	/**
	 * Update gradient stop
	 */
	const updateGradientStop = useCallback(
		(index: number, updates: Partial<GradientStop>) => {
			setGradientStops((prev) => {
				const newStops = [...prev]
				newStops[index] = { ...newStops[index], ...updates }
				return newStops.sort((a, b) => a.position - b.position)
			})
		},
		[]
	)

	/**
	 * Apply preset
	 */
	const applyPreset = useCallback((presetName: string) => {
		const preset = gradientPresets.find((p) => p.name === presetName)
		if (preset) {
			setGradientStops(preset.stops)
		}
	}, [])

	/**
	 * Export processed image as PNG
	 */
	const exportImage = useCallback(() => {
		if (!outputCanvasRef.current || !processedImageData) return

		const canvas = outputCanvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = processedImageData.width
		canvas.height = processedImageData.height
		ctx.putImageData(processedImageData, 0, 0)

		canvas.toBlob((blob) => {
			if (!blob) return
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'gradient-map-result.png'
			a.click()
			URL.revokeObjectURL(url)
		}, 'image/png')
	}, [processedImageData])

	/**
	 * Export preset as JSON
	 */
	const exportPreset = useCallback(() => {
		const preset = {
			name: 'Custom Gradient',
			stops: gradientStops,
			intensity,
			blendMode,
		}
		const json = JSON.stringify(preset, null, 2)
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'gradient-preset.json'
		a.click()
		URL.revokeObjectURL(url)
	}, [gradientStops, intensity, blendMode])

	/**
	 * Copy CSS gradient
	 */
	const copyCSSGradient = useCallback(async () => {
		const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position)
		const cssStops = sortedStops
			.map((stop) => `${stop.color} ${Math.round(stop.position * 100)}%`)
			.join(', ')
		const css = `linear-gradient(to right, ${cssStops})`
		await navigator.clipboard.writeText(css)
	}, [gradientStops])

	return {
		imageFile,
		imageUrl,
		imageData,
		processedImageData,
		previewMode,
		splitPosition,
		gradientStops,
		intensity,
		blendMode,
		useLAB,
		inputCanvasRef,
		outputCanvasRef,
		handleImageUpload,
		setPreviewMode,
		setSplitPosition,
		addGradientStop,
		removeGradientStop,
		updateGradientStop,
		setIntensity,
		setBlendMode,
		setUseLAB,
		applyPreset,
		exportImage,
		exportPreset,
		copyCSSGradient,
		processImage,
	}
}

