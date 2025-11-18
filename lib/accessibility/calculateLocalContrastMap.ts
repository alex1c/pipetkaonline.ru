/**
 * Local Contrast Map Calculation
 * 
 * Functions for calculating contrast map for text overlay on images.
 * Analyzes each pixel area to determine readability.
 * 
 * @module lib/accessibility/calculateLocalContrastMap
 */

import { calculateContrastRatioRGB } from './calculateContrast'

/**
 * Contrast level classification
 */
export type ContrastLevel = 'high' | 'medium' | 'low'

/**
 * Contrast map result
 */
export interface ContrastMapResult {
	level: ContrastLevel
	ratio: number
	r: number
	g: number
	b: number
}

/**
 * Calculate contrast map for a region of image
 * 
 * Analyzes pixels in a region and calculates average contrast with text color.
 * 
 * @param {ImageData} imageData - Image data from canvas
 * @param {number} x - Start X coordinate
 * @param {number} y - Start Y coordinate
 * @param {number} width - Region width
 * @param {number} height - Region height
 * @param {number} textR - Text color red component (0-255)
 * @param {number} textG - Text color green component (0-255)
 * @param {number} textB - Text color blue component (0-255)
 * @returns {ContrastMapResult} Contrast analysis result
 */
export function calculateLocalContrast(
	imageData: ImageData,
	x: number,
	y: number,
	width: number,
	height: number,
	textR: number,
	textG: number,
	textB: number
): ContrastMapResult {
	const data = imageData.data
	const imgWidth = imageData.width
	const imgHeight = imageData.height

	// Clamp coordinates
	const startX = Math.max(0, Math.floor(x))
	const startY = Math.max(0, Math.floor(y))
	const endX = Math.min(imgWidth, Math.floor(x + width))
	const endY = Math.min(imgHeight, Math.floor(y + height))

	// Sample pixels (every 4th pixel for performance)
	let totalR = 0
	let totalG = 0
	let totalB = 0
	let count = 0

	for (let py = startY; py < endY; py += 2) {
		for (let px = startX; px < endX; px += 2) {
			const index = (py * imgWidth + px) * 4
			totalR += data[index]
			totalG += data[index + 1]
			totalB += data[index + 2]
			count++
		}
	}

	if (count === 0) {
		return {
			level: 'low',
			ratio: 1,
			r: 0,
			g: 0,
			b: 0,
		}
	}

	// Calculate average background color
	const avgR = Math.round(totalR / count)
	const avgG = Math.round(totalG / count)
	const avgB = Math.round(totalB / count)

	// Calculate contrast ratio
	const ratio = calculateContrastRatioRGB(textR, textG, textB, avgR, avgG, avgB)

	// Classify contrast level
	let level: ContrastLevel = 'low'
	if (ratio >= 4.5) {
		level = 'high'
	} else if (ratio >= 3.0) {
		level = 'medium'
	}

	return {
		level,
		ratio,
		r: avgR,
		g: avgG,
		b: avgB,
	}
}

/**
 * Generate heatmap data for entire image
 * 
 * Creates a grid of contrast measurements across the image.
 * 
 * @param {ImageData} imageData - Image data from canvas
 * @param {number} textR - Text color red component (0-255)
 * @param {number} textG - Text color green component (0-255)
 * @param {number} textB - Text color blue component (0-255)
 * @param {number} gridSize - Size of grid cells (default: 20)
 * @returns {ContrastMapResult[][]} 2D array of contrast results
 */
export function generateHeatmapData(
	imageData: ImageData,
	textR: number,
	textG: number,
	textB: number,
	gridSize: number = 20
): ContrastMapResult[][] {
	const width = imageData.width
	const height = imageData.height
	const cols = Math.ceil(width / gridSize)
	const rows = Math.ceil(height / gridSize)

	const heatmap: ContrastMapResult[][] = []

	for (let row = 0; row < rows; row++) {
		const rowData: ContrastMapResult[] = []
		for (let col = 0; col < cols; col++) {
			const x = col * gridSize
			const y = row * gridSize
			const result = calculateLocalContrast(imageData, x, y, gridSize, gridSize, textR, textG, textB)
			rowData.push(result)
		}
		heatmap.push(rowData)
	}

	return heatmap
}

