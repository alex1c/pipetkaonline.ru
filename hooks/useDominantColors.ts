'use client'

import { useState, useCallback } from 'react'
import { rgbToHex } from '@/lib/color-utils'

interface DominantColor {
	hex: string
	rgb: { r: number; g: number; b: number }
	percentage: number
}

/**
 * Simple K-Means clustering for dominant colors
 */
function kMeansClustering(
	pixels: { r: number; g: number; b: number }[],
	k: number = 5,
	iterations: number = 10
): DominantColor[] {
	if (pixels.length === 0) return []

	// Initialize centroids randomly
	let centroids: { r: number; g: number; b: number }[] = []
	for (let i = 0; i < k; i++) {
		const randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
		centroids.push({ ...randomPixel })
	}

	// K-Means iterations
	for (let iter = 0; iter < iterations; iter++) {
		// Assign pixels to nearest centroid
		const clusters: { r: number; g: number; b: number }[][] = Array(k)
			.fill(null)
			.map(() => [])

		pixels.forEach((pixel) => {
			let minDist = Infinity
			let nearestCluster = 0

			centroids.forEach((centroid, idx) => {
				const dist =
					Math.pow(pixel.r - centroid.r, 2) +
					Math.pow(pixel.g - centroid.g, 2) +
					Math.pow(pixel.b - centroid.b, 2)

				if (dist < minDist) {
					minDist = dist
					nearestCluster = idx
				}
			})

			clusters[nearestCluster].push(pixel)
		})

		// Update centroids
		centroids = clusters.map((cluster) => {
			if (cluster.length === 0) return centroids[clusters.indexOf(cluster)]

			const sum = cluster.reduce(
				(acc, pixel) => ({
					r: acc.r + pixel.r,
					g: acc.g + pixel.g,
					b: acc.b + pixel.b,
				}),
				{ r: 0, g: 0, b: 0 }
			)

			return {
				r: Math.round(sum.r / cluster.length),
				g: Math.round(sum.g / cluster.length),
				b: Math.round(sum.b / cluster.length),
			}
		})
	}

	// Calculate percentages and format results
	const totalPixels = pixels.length
	return centroids
		.map((centroid, idx) => {
			// Count pixels in this cluster (approximate)
			const clusterSize = Math.max(1, Math.floor(totalPixels / k))
			return {
				hex: rgbToHex(centroid.r, centroid.g, centroid.b),
				rgb: centroid,
				percentage: Math.round((clusterSize / totalPixels) * 100),
			}
		})
		.sort((a, b) => b.percentage - a.percentage)
}

/**
 * Hook for extracting dominant colors from image
 */
export function useDominantColors() {
	const [dominantColors, setDominantColors] = useState<DominantColor[]>([])
	const [isProcessing, setIsProcessing] = useState(false)

	/**
	 * Extract dominant colors from image
	 */
	const extractDominantColors = useCallback(
		(imageUrl: string, k: number = 5) => {
			setIsProcessing(true)

			const img = new Image()
			img.crossOrigin = 'anonymous'

			img.onload = () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				if (!ctx) {
					setIsProcessing(false)
					return
				}

				// Resize image to 100x100 for faster processing
				canvas.width = 100
				canvas.height = 100
				ctx.drawImage(img, 0, 0, 100, 100)

				// Get pixel data
				const imageData = ctx.getImageData(0, 0, 100, 100)
				const pixels: { r: number; g: number; b: number }[] = []

				for (let i = 0; i < imageData.data.length; i += 4) {
					pixels.push({
						r: imageData.data[i],
						g: imageData.data[i + 1],
						b: imageData.data[i + 2],
					})
				}

				// Run K-Means clustering
				const colors = kMeansClustering(pixels, k)
				setDominantColors(colors)
				setIsProcessing(false)
			}

			img.onerror = () => {
				setIsProcessing(false)
			}

			img.src = imageUrl
		},
		[]
	)

	return {
		dominantColors,
		isProcessing,
		extractDominantColors,
	}
}


