import { useState, useCallback, useRef } from 'react'

export type ColorBlindnessType =
	| 'none'
	| 'protanopia'
	| 'protanomaly'
	| 'deuteranopia'
	| 'deuteranomaly'
	| 'tritanopia'
	| 'tritanomaly'
	| 'achromatopsia'
	| 'achromatomaly'

/**
 * Color transformation matrices for different types of color blindness
 * Based on standard color vision deficiency simulation algorithms
 */
const COLOR_MATRICES: Record<ColorBlindnessType, number[][]> = {
	none: [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	],
	protanopia: [
		[0.567, 0.433, 0],
		[0.558, 0.442, 0],
		[0, 0.242, 0.758],
	],
	protanomaly: [
		[0.817, 0.183, 0],
		[0.333, 0.667, 0],
		[0, 0.125, 0.875],
	],
	deuteranopia: [
		[0.625, 0.375, 0],
		[0.7, 0.3, 0],
		[0, 0.3, 0.7],
	],
	deuteranomaly: [
		[0.8, 0.2, 0],
		[0.258, 0.742, 0],
		[0, 0.142, 0.858],
	],
	tritanopia: [
		[0.95, 0.05, 0],
		[0, 0.433, 0.567],
		[0, 0.475, 0.525],
	],
	tritanomaly: [
		[0.967, 0.033, 0],
		[0, 0.733, 0.267],
		[0, 0.183, 0.817],
	],
	achromatopsia: [
		[0.299, 0.587, 0.114],
		[0.299, 0.587, 0.114],
		[0.299, 0.587, 0.114],
	],
	achromatomaly: [
		[0.618, 0.32, 0.062],
		[0.163, 0.775, 0.062],
		[0.163, 0.32, 0.516],
	],
}

/**
 * Apply color transformation matrix to RGB values
 */
function applyColorMatrix(r: number, g: number, b: number, matrix: number[][]): {
	r: number
	g: number
	b: number
} {
	const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b
	const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b
	const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b

	return {
		r: Math.max(0, Math.min(255, Math.round(newR))),
		g: Math.max(0, Math.min(255, Math.round(newG))),
		b: Math.max(0, Math.min(255, Math.round(newB))),
	}
}

/**
 * Hook for color blindness simulation
 * Manages image loading, color transformation, and export functionality
 */
export function useColorBlindness() {
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [type, setType] = useState<ColorBlindnessType>('none')
	const [splitView, setSplitView] = useState(false)
	const [compareMode, setCompareMode] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const originalCanvasRef = useRef<HTMLCanvasElement>(null)

	/**
	 * Load image from file
	 */
	const loadImage = useCallback((file: File) => {
		if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
			throw new Error('Invalid file type. Please upload JPG, PNG, or WEBP image.')
		}

		const reader = new FileReader()
		reader.onload = (e) => {
			const url = e.target?.result as string
			setImageUrl(url)
			setImageFile(file)
		}
		reader.readAsDataURL(file)
	}, [])

	/**
	 * Reset to initial state
	 */
	const reset = useCallback(() => {
		setImageUrl(null)
		setImageFile(null)
		setType('none')
		setSplitView(false)
		setCompareMode(false)
	}, [])

	/**
	 * Apply color blindness simulation to canvas
	 */
	const applySimulation = useCallback(
		(
			canvas: HTMLCanvasElement,
			image: HTMLImageElement,
			blindnessType: ColorBlindnessType
		) => {
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			// Set canvas size to match image
			canvas.width = image.naturalWidth
			canvas.height = image.naturalHeight

			// Draw original image
			ctx.drawImage(image, 0, 0)

			// If type is 'none', no transformation needed
			if (blindnessType === 'none') {
				return
			}

			// Get image data
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const data = imageData.data
			const matrix = COLOR_MATRICES[blindnessType]

			// Apply color transformation to each pixel
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i]
				const g = data[i + 1]
				const b = data[i + 2]

				const transformed = applyColorMatrix(r, g, b, matrix)

				data[i] = transformed.r
				data[i + 1] = transformed.g
				data[i + 2] = transformed.b
				// data[i + 3] is alpha, keep it unchanged
			}

			// Put transformed image data back
			ctx.putImageData(imageData, 0, 0)
		},
		[]
	)

	/**
	 * Download result as PNG
	 */
	const downloadResult = useCallback(() => {
		if (!canvasRef.current) return

		const canvas = canvasRef.current
		const link = document.createElement('a')
		link.download = `color-blindness-simulation-${type}-${Date.now()}.png`
		link.href = canvas.toDataURL('image/png')
		link.click()
	}, [type])

	/**
	 * Get current transformation matrix
	 */
	const getMatrix = useCallback(
		(blindnessType: ColorBlindnessType) => {
			return COLOR_MATRICES[blindnessType]
		},
		[]
	)

	return {
		imageUrl,
		imageFile,
		type,
		setType,
		splitView,
		setSplitView,
		compareMode,
		setCompareMode,
		loadImage,
		reset,
		applySimulation,
		downloadResult,
		getMatrix,
		canvasRef,
		originalCanvasRef,
	}
}



