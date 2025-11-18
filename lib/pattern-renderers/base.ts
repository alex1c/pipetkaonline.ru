/**
 * Base Pattern Renderer
 * 
 * Base utilities for pattern rendering.
 * 
 * @module lib/pattern-renderers/base
 */

import type { PatternSettings } from './types'

/**
 * Render pattern to canvas
 * 
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {PatternSettings} settings - Pattern settings
 */
export function renderPattern(
	canvas: HTMLCanvasElement,
	settings: PatternSettings
): void {
	const ctx = canvas.getContext('2d')
	if (!ctx) return

	// Set canvas size
	canvas.width = settings.tileSize
	canvas.height = settings.tileSize

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// Fill background
	ctx.fillStyle = settings.backgroundColor
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// Render based on type
	switch (settings.type) {
		case 'polka-dots':
			renderPolkaDots(ctx, settings)
			break
		case 'stripes':
			renderStripes(ctx, settings)
			break
		case 'grid':
			renderGrid(ctx, settings)
			break
		case 'triangles':
			renderTriangles(ctx, settings)
			break
		case 'zigzag':
			renderZigzag(ctx, settings)
			break
		case 'waves':
			renderWaves(ctx, settings)
			break
		case 'crosses':
			renderCrosses(ctx, settings)
			break
		case 'noise':
			renderNoise(ctx, settings)
			break
		case 'minimalistic-shapes':
			renderMinimalisticShapes(ctx, settings)
			break
	}
}

/**
 * Render polka dots pattern
 */
function renderPolkaDots(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density, elementSize, randomness } = settings
	const shape = settings.additional?.shape || 'circle'
	const spacing = Math.max(20, 200 - density * 1.5)
	const size = (elementSize / 100) * spacing * 0.4

	ctx.fillStyle = elementColor

	for (let y = 0; y < tileSize; y += spacing) {
		for (let x = 0; x < tileSize; x += spacing) {
			const offsetX = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const offsetY = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const posX = x + spacing / 2 + offsetX
			const posY = y + spacing / 2 + offsetY

			if (shape === 'circle') {
				ctx.beginPath()
				ctx.arc(posX, posY, size, 0, Math.PI * 2)
				ctx.fill()
			} else {
				ctx.fillRect(posX - size, posY - size, size * 2, size * 2)
			}
		}
	}
}

/**
 * Render stripes pattern
 */
function renderStripes(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density, randomness } = settings
	const direction = settings.additional?.direction || 'vertical'
	const spacing = Math.max(10, 200 - density * 1.5)
	const width = (settings.elementSize / 100) * spacing * 0.3

	ctx.strokeStyle = elementColor
	ctx.lineWidth = width

	if (direction === 'vertical') {
		for (let x = 0; x < tileSize; x += spacing) {
			const offset = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.2
			ctx.beginPath()
			ctx.moveTo(x + offset, 0)
			ctx.lineTo(x + offset, tileSize)
			ctx.stroke()
		}
	} else if (direction === 'horizontal') {
		for (let y = 0; y < tileSize; y += spacing) {
			const offset = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.2
			ctx.beginPath()
			ctx.moveTo(0, y + offset)
			ctx.lineTo(tileSize, y + offset)
			ctx.stroke()
		}
	} else {
		// Diagonal
		const angle = Math.PI / 4
		for (let i = -tileSize; i < tileSize * 2; i += spacing) {
			const offset = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.2
			ctx.beginPath()
			ctx.moveTo(i + offset, 0)
			ctx.lineTo(i + offset + tileSize * Math.cos(angle), tileSize * Math.sin(angle))
			ctx.stroke()
		}
	}
}

/**
 * Render grid pattern
 */
function renderGrid(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density } = settings
	const lineWidth = settings.additional?.lineWidth || 2
	const spacing = Math.max(20, 200 - density * 1.5)

	ctx.strokeStyle = elementColor
	ctx.lineWidth = lineWidth

	// Vertical lines
	for (let x = 0; x <= tileSize; x += spacing) {
		ctx.beginPath()
		ctx.moveTo(x, 0)
		ctx.lineTo(x, tileSize)
		ctx.stroke()
	}

	// Horizontal lines
	for (let y = 0; y <= tileSize; y += spacing) {
		ctx.beginPath()
		ctx.moveTo(0, y)
		ctx.lineTo(tileSize, y)
		ctx.stroke()
	}
}

/**
 * Render triangles pattern
 */
function renderTriangles(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density, elementSize, randomness } = settings
	const spacing = Math.max(30, 200 - density * 1.5)
	const size = (elementSize / 100) * spacing * 0.5

	ctx.fillStyle = elementColor

	for (let y = 0; y < tileSize + spacing; y += spacing) {
		for (let x = 0; x < tileSize + spacing; x += spacing) {
			const offsetX = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const offsetY = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const posX = x + offsetX
			const posY = y + offsetY

			ctx.beginPath()
			ctx.moveTo(posX, posY)
			ctx.lineTo(posX + size, posY + size * 1.732)
			ctx.lineTo(posX - size, posY + size * 1.732)
			ctx.closePath()
			ctx.fill()
		}
	}
}

/**
 * Render zigzag pattern
 */
function renderZigzag(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density, elementSize } = settings
	const spacing = Math.max(20, 200 - density * 1.5)
	const amplitude = (elementSize / 100) * spacing * 0.5

	ctx.strokeStyle = elementColor
	ctx.lineWidth = 2

	for (let y = 0; y < tileSize; y += spacing) {
		ctx.beginPath()
		ctx.moveTo(0, y)
		for (let x = 0; x < tileSize; x += spacing / 2) {
			const zigY = y + amplitude * Math.sin((x / spacing) * Math.PI * 2)
			ctx.lineTo(x, zigY)
		}
		ctx.stroke()
	}
}

/**
 * Render waves pattern
 */
function renderWaves(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density } = settings
	const amplitude = settings.additional?.amplitude || 20
	const frequency = settings.additional?.frequency || 0.02

	ctx.strokeStyle = elementColor
	ctx.lineWidth = 2

	for (let y = 0; y < tileSize; y += 50) {
		ctx.beginPath()
		ctx.moveTo(0, y)
		for (let x = 0; x < tileSize; x++) {
			const waveY = y + amplitude * Math.sin(x * frequency)
			ctx.lineTo(x, waveY)
		}
		ctx.stroke()
	}
}

/**
 * Render crosses pattern
 */
function renderCrosses(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density, elementSize, randomness } = settings
	const spacing = Math.max(30, 200 - density * 1.5)
	const size = (elementSize / 100) * spacing * 0.3

	ctx.strokeStyle = elementColor
	ctx.lineWidth = 2

	for (let y = 0; y < tileSize; y += spacing) {
		for (let x = 0; x < tileSize; x += spacing) {
			const offsetX = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const offsetY = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const posX = x + spacing / 2 + offsetX
			const posY = y + spacing / 2 + offsetY

			// Horizontal line
			ctx.beginPath()
			ctx.moveTo(posX - size, posY)
			ctx.lineTo(posX + size, posY)
			ctx.stroke()

			// Vertical line
			ctx.beginPath()
			ctx.moveTo(posX, posY - size)
			ctx.lineTo(posX, posY + size)
			ctx.stroke()
		}
	}
}

/**
 * Render noise pattern
 */
function renderNoise(ctx: CanvasRenderingContext2D, settings: PatternSettings): void {
	const { tileSize, elementColor, density } = settings
	const imageData = ctx.createImageData(tileSize, tileSize)
	const data = imageData.data
	const intensity = density / 100

	for (let i = 0; i < data.length; i += 4) {
		if (Math.random() < intensity) {
			const rgb = hexToRgb(elementColor)
			if (rgb) {
				data[i] = rgb.r
				data[i + 1] = rgb.g
				data[i + 2] = rgb.b
				data[i + 3] = 255
			}
		}
	}

	ctx.putImageData(imageData, 0, 0)
}

/**
 * Render minimalistic shapes pattern
 */
function renderMinimalisticShapes(
	ctx: CanvasRenderingContext2D,
	settings: PatternSettings
): void {
	const { tileSize, elementColor, density, elementSize, randomness } = settings
	const spacing = Math.max(40, 200 - density * 1.5)
	const size = (elementSize / 100) * spacing * 0.3

	ctx.fillStyle = elementColor

	const shapes = ['circle', 'square', 'triangle']

	for (let y = 0; y < tileSize; y += spacing) {
		for (let x = 0; x < tileSize; x += spacing) {
			const offsetX = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const offsetY = (randomness / 100) * (Math.random() - 0.5) * spacing * 0.3
			const posX = x + spacing / 2 + offsetX
			const posY = y + spacing / 2 + offsetY
			const shape = shapes[Math.floor(Math.random() * shapes.length)]

			if (shape === 'circle') {
				ctx.beginPath()
				ctx.arc(posX, posY, size, 0, Math.PI * 2)
				ctx.fill()
			} else if (shape === 'square') {
				ctx.fillRect(posX - size, posY - size, size * 2, size * 2)
			} else {
				ctx.beginPath()
				ctx.moveTo(posX, posY - size)
				ctx.lineTo(posX + size, posY + size)
				ctx.lineTo(posX - size, posY + size)
				ctx.closePath()
				ctx.fill()
			}
		}
	}
}

/**
 * Convert HEX to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null
}

