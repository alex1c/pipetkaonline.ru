/**
 * Image Color Extraction
 * 
 * Functions for extracting colors from brand images (logos, brandbooks).
 * 
 * @module lib/brand-analysis/imageExtraction
 */

import { rgbToHex } from '@/lib/color-utils'
import { colorDistance } from '@/lib/colorMath'

/**
 * K-means clustering algorithm
 * 
 * @param {Array} pixels - Array of RGB pixels
 * @param {number} k - Number of clusters
 * @returns {Array} Array of cluster centers (dominant colors)
 */
function kMeansClustering(
	pixels: { r: number; g: number; b: number }[],
	k: number
): { r: number; g: number; b: number }[] {
	if (pixels.length === 0 || k === 0) return []

	// Initialize centroids randomly
	const centroids: { r: number; g: number; b: number }[] = []
	for (let i = 0; i < k; i++) {
		const randomIndex = Math.floor(Math.random() * pixels.length)
		centroids.push({ ...pixels[randomIndex] })
	}

	// Iterate until convergence (max 10 iterations)
	for (let iter = 0; iter < 10; iter++) {
		// Assign pixels to nearest centroid
		const clusters: { r: number; g: number; b: number }[][] = Array(k)
			.fill(null)
			.map(() => [])

		for (const pixel of pixels) {
			let minDist = Infinity
			let nearestCluster = 0

			for (let i = 0; i < centroids.length; i++) {
				const dist = colorDistance(pixel, centroids[i])
				if (dist < minDist) {
					minDist = dist
					nearestCluster = i
				}
			}

			clusters[nearestCluster].push(pixel)
		}

		// Update centroids
		let converged = true
		for (let i = 0; i < k; i++) {
			if (clusters[i].length === 0) continue

			const sum = clusters[i].reduce(
				(acc, p) => ({
					r: acc.r + p.r,
					g: acc.g + p.g,
					b: acc.b + p.b,
				}),
				{ r: 0, g: 0, b: 0 }
			)

			const newCentroid = {
				r: Math.round(sum.r / clusters[i].length),
				g: Math.round(sum.g / clusters[i].length),
				b: Math.round(sum.b / clusters[i].length),
			}

			if (colorDistance(centroids[i], newCentroid) > 1) {
				converged = false
			}

			centroids[i] = newCentroid
		}

		if (converged) break
	}

	return centroids
}

/**
 * Extract colors from image file
 * 
 * @param {File} file - Image file
 * @param {number} colorCount - Number of colors to extract
 * @returns {Promise<string[]>} Array of extracted color hex codes
 */
export async function extractColorsFromImage(
	file: File,
	colorCount: number = 5
): Promise<string[]> {
	return new Promise((resolve, reject) => {
		const img = new Image()
		const url = URL.createObjectURL(file)

		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) {
				reject(new Error('Could not get canvas context'))
				return
			}

			// Limit canvas size for performance
			const maxSize = 500
			const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
			canvas.width = img.width * scale
			canvas.height = img.height * scale

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

			// Extract pixel data
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const pixels: { r: number; g: number; b: number }[] = []

			// Sample pixels (every 4th pixel for performance)
			for (let i = 0; i < imageData.data.length; i += 16) {
				pixels.push({
					r: imageData.data[i],
					g: imageData.data[i + 1],
					b: imageData.data[i + 2],
				})
			}

			// Cluster colors using K-means
			const clusters = kMeansClustering(pixels, colorCount)

			// Convert to hex
			const colors = clusters.map((c) => rgbToHex(c.r, c.g, c.b))

			URL.revokeObjectURL(url)
			resolve(colors)
		}

		img.onerror = () => {
			URL.revokeObjectURL(url)
			reject(new Error('Failed to load image'))
		}

		img.src = url
	})
}

