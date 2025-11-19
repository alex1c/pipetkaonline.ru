/**
 * Color Picker Hook
 * 
 * Custom React hook for extracting colors from canvas/image elements.
 * Allows users to pick colors by clicking or hovering over an image.
 * 
 * Features:
 * - Real-time color preview on mouse move
 * - Color selection on click
 * - Automatic conversion to HEX, RGB, and HSL formats
 * - Canvas-based color extraction using ImageData API
 * - Coordinate transformation for responsive canvas
 * 
 * Use cases:
 * - Color extraction from uploaded images
 * - Interactive color picking tools
 * - Image color analysis
 * 
 * @module hooks/useColorPicker
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import { rgbToHex, formatRgb, formatHsl, rgbToHsl } from '@/lib/color-utils'

/**
 * Color picker state interface
 * Contains the selected color in all formats
 */
interface ColorPickerState {
	/** Selected color in RGB format (0-255) */
	selectedColor: { r: number; g: number; b: number } | null
	/** Color in HEX format (e.g., "#FF5733") */
	hex: string
	/** Color in RGB CSS format (e.g., "rgb(255, 87, 51)") */
	rgb: string
	/** Color in HSL CSS format (e.g., "hsl(9, 100%, 60%)") */
	hsl: string
}

/**
 * Color Picker Hook
 * 
 * Manages color picking functionality from a canvas element.
 * Provides ref for canvas, event handlers, and selected color state.
 * 
 * How it works:
 * 1. Canvas ref is attached to a canvas element with an image
 * 2. On mouse move/click, calculates pixel coordinates
 * 3. Uses getImageData to extract RGB values from that pixel
 * 4. Converts to all formats and updates state
 * 
 * Coordinate transformation:
 * - Mouse coordinates are relative to viewport
 * - Canvas coordinates are relative to canvas size
 * - Handles responsive canvas (scaled display vs actual size)
 * 
 * @returns {Object} Hook return object containing:
 *   - color: Current selected color in all formats
 *   - canvasRef: Ref to attach to canvas element
 *   - handleMouseMove: Mouse move handler for preview
 *   - handleClick: Click handler for selection
 *   - pickColor: Direct color picking function
 * 
 * @example
 * ```tsx
 * const { color, canvasRef, handleMouseMove, handleClick } = useColorPicker()
 * 
 * <canvas
 *   ref={canvasRef}
 *   onMouseMove={handleMouseMove}
 *   onClick={handleClick}
 * />
 * 
 * {color.hex && <div>Selected: {color.hex}</div>}
 * ```
 */
export function useColorPicker() {
	/**
	 * State for selected color in all formats
	 * Initialized as empty/null until a color is picked
	 */
	const [color, setColor] = useState<ColorPickerState>({
		selectedColor: null,
		hex: '',
		rgb: '',
		hsl: '',
	})

	/**
	 * Ref to the canvas element
	 * Must be attached to a canvas that has an image drawn on it
	 */
	const canvasRef = useRef<HTMLCanvasElement>(null)

	/**
	 * Extract color from canvas at specific pixel coordinates
	 * 
	 * Uses the Canvas 2D API getImageData method to read pixel data.
	 * Extracts RGB values and converts to all color formats.
	 * 
	 * Process:
	 * 1. Get 2D rendering context with willReadFrequently optimization
	 * 2. Use getImageData to read 1x1 pixel at coordinates
	 * 3. Extract R, G, B values from ImageData array
	 * 4. Convert to HEX, RGB string, and HSL string formats
	 * 5. Update state with all formats
	 * 
	 * @param {number} x - X coordinate in canvas pixels (0 to canvas.width)
	 * @param {number} y - Y coordinate in canvas pixels (0 to canvas.height)
	 * @returns {void}
	 */
	const pickColor = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current
			if (!canvas) return

			// Get 2D context with optimization for frequent reads
			// willReadFrequently: true optimizes for getImageData calls
			const ctx = canvas.getContext('2d', { willReadFrequently: true })
			if (!ctx) return

			// Read pixel data at the specified coordinates
			// getImageData(x, y, width, height) returns ImageData object
                        // data property is Uint8ClampedArray: [R, G, B, A, R, G, B, A, ...]
                        const imageData = ctx.getImageData(x, y, 1, 1)
                        // Extract RGB (ignore alpha channel) - use indexing instead of destructuring for TypeScript compatibility
                        const r = imageData.data[0]
                        const g = imageData.data[1]
                        const b = imageData.data[2]

			// Convert to all formats
			const hex = rgbToHex(r, g, b)
			const rgb = formatRgb(r, g, b)
			const hslObj = rgbToHsl(r, g, b)
			const hsl = `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`

			// Update state with all color formats
			setColor({
				selectedColor: { r, g, b },
				hex,
				rgb,
				hsl,
			})
		},
		[]
	)

	/**
	 * Handle mouse move event for real-time color preview
	 * 
	 * Converts mouse coordinates (viewport-relative) to canvas coordinates
	 * (canvas-relative) accounting for canvas scaling/display size.
	 * 
	 * Coordinate transformation:
	 * - e.clientX/Y: Mouse position relative to viewport
	 * - rect.left/top: Canvas position relative to viewport
	 * - e.clientX - rect.left: Mouse position relative to canvas display
	 * - canvas.width / rect.width: Scale factor (actual size / display size)
	 * - Result: Actual pixel coordinates in canvas
	 * 
	 * This handles cases where canvas is scaled (e.g., responsive images)
	 * 
	 * @param {React.MouseEvent<HTMLCanvasElement>} e - Mouse move event
	 * @returns {void}
	 */
	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current
			if (!canvas) return

			// Get canvas bounding rectangle (display size and position)
			const rect = canvas.getBoundingClientRect()
			
			// Transform mouse coordinates to canvas pixel coordinates
			// Accounts for canvas scaling (display size vs actual size)
			const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
			const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))

			// Extract and update color
			pickColor(x, y)
		},
		[pickColor]
	)

	/**
	 * Handle click event to "lock" selected color
	 * 
	 * Same coordinate transformation as handleMouseMove.
	 * Used when user wants to fix/select a color (not just preview).
	 * 
	 * @param {React.MouseEvent<HTMLCanvasElement>} e - Click event
	 * @returns {void}
	 */
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current
			if (!canvas) return

			// Same coordinate transformation as mouse move
			const rect = canvas.getBoundingClientRect()
			const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
			const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))

			// Extract and update color (same as preview, but on click)
			pickColor(x, y)
		},
		[pickColor]
	)

	return {
		color,
		canvasRef,
		handleMouseMove,
		handleClick,
		pickColor,
	}
}


