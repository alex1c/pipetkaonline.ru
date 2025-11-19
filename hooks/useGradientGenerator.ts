import { useState, useCallback, useMemo, useEffect } from 'react'
import { parseColorToRgb, rgbToHex } from '@/lib/color-utils'

export type GradientType = 'linear' | 'radial'
export type LinearDirection =
	| 'to top'
	| 'to right'
	| 'to bottom'
	| 'to left'
	| 'to top right'
	| 'to bottom right'
	| 'to bottom left'
	| 'to top left'
export type RadialShape = 'circle' | 'ellipse'

export interface GradientStop {
	id: string
	color: string
	position: number
}

export interface SavedGradient {
	id: string
	type: GradientType
	direction?: LinearDirection
	shape?: RadialShape
	stops: GradientStop[]
	createdAt: number
}

/**
 * Hook for generating CSS gradients
 * Manages gradient stops, type, direction, and localStorage history
 */
export function useGradientGenerator() {
	const [type, setType] = useState<GradientType>('linear')
	const [direction, setDirection] = useState<LinearDirection>('to right')
	const [shape, setShape] = useState<RadialShape>('ellipse')
	const [stops, setStops] = useState<GradientStop[]>([
		{ id: '1', color: '#3498db', position: 0 },
		{ id: '2', color: '#e74c3c', position: 100 },
	])
	const [savedGradients, setSavedGradients] = useState<SavedGradient[]>([])

	// Load saved gradients from localStorage on mount
	useEffect(() => {
		try {
			const saved = localStorage.getItem('gradient-generator-history')
			if (saved) {
				const parsed = JSON.parse(saved)
				if (Array.isArray(parsed)) {
					setSavedGradients(parsed)
				}
			}
		} catch (err) {
			console.error('Failed to load saved gradients:', err)
		}
	}, [])

	/**
	 * Add a new gradient stop
	 */
	const addStop = useCallback(() => {
		const newStop: GradientStop = {
			id: Date.now().toString(),
			color: '#ffffff',
			position: 50,
		}
		setStops((prev) => [...prev, newStop].sort((a, b) => a.position - b.position))
	}, [])

	/**
	 * Remove a gradient stop
	 */
	const removeStop = useCallback((id: string) => {
		setStops((prev) => {
			if (prev.length <= 2) return prev // Keep at least 2 stops
			return prev.filter((stop) => stop.id !== id)
		})
	}, [])

	/**
	 * Update a gradient stop
	 */
	const updateStop = useCallback((id: string, updates: Partial<GradientStop>) => {
		setStops((prev) =>
			prev
				.map((stop) => (stop.id === id ? { ...stop, ...updates } : stop))
				.sort((a, b) => a.position - b.position)
		)
	}, [])

	/**
	 * Generate random gradient
	 */
	const generateRandom = useCallback(() => {
		const randomType: GradientType = Math.random() > 0.5 ? 'linear' : 'radial'
		const directions: LinearDirection[] = [
			'to top',
			'to right',
			'to bottom',
			'to left',
			'to top right',
			'to bottom right',
			'to bottom left',
			'to top left',
		]
		const randomDirection = directions[Math.floor(Math.random() * directions.length)]
		const randomShape: RadialShape = Math.random() > 0.5 ? 'circle' : 'ellipse'

		// Generate random colors
		const numStops = Math.floor(Math.random() * 3) + 2 // 2-4 stops
		const newStops: GradientStop[] = []
		for (let i = 0; i < numStops; i++) {
			const r = Math.floor(Math.random() * 256)
			const g = Math.floor(Math.random() * 256)
			const b = Math.floor(Math.random() * 256)
			newStops.push({
				id: (i + 1).toString(),
				color: rgbToHex(r, g, b),
				position: (i / (numStops - 1)) * 100,
			})
		}

		setType(randomType)
		if (randomType === 'linear') {
			setDirection(randomDirection)
		} else {
			setShape(randomShape)
		}
		setStops(newStops)
	}, [])

	/**
	 * Smooth step distribution - evenly distribute stop positions
	 */
	const smoothDistribution = useCallback(() => {
		setStops((prev) => {
			const sorted = [...prev].sort((a, b) => a.position - b.position)
			const step = 100 / (sorted.length - 1)
			return sorted.map((stop, index) => ({
				...stop,
				position: index * step,
			}))
		})
	}, [])

	/**
	 * Reverse gradient - reverse stop order
	 */
	const reverseGradient = useCallback(() => {
		setStops((prev) => {
			const sorted = [...prev].sort((a, b) => a.position - b.position)
			return sorted.map((stop, index) => ({
				...stop,
				position: 100 - stop.position,
			}))
		})
	}, [])

	/**
	 * Generate CSS gradient string
	 */
	const generateCss = useMemo(() => {
		const sortedStops = [...stops].sort((a, b) => a.position - b.position)
		const stopsString = sortedStops
			.map((stop) => `${stop.color} ${stop.position}%`)
			.join(', ')

		if (type === 'linear') {
			return `linear-gradient(${direction}, ${stopsString})`
		} else {
			return `radial-gradient(${shape}, ${stopsString})`
		}
	}, [type, direction, shape, stops])

	/**
	 * Generate full CSS
	 */
	const generateFullCss = useMemo(() => {
		return `.gradient {\n  background: ${generateCss};\n}`
	}, [generateCss])

	/**
	 * Generate TailwindCSS classes
	 */
	const generateTailwind = useMemo(() => {
		if (type === 'radial') {
			return `bg-gradient-radial ${stops
				.map((stop, index) => {
					const colorName = `[${stop.color}]`
					if (index === 0) return `from${colorName}`
					if (index === stops.length - 1) return `to${colorName}`
					return `via${colorName}`
				})
				.join(' ')}`
		}

		// Map linear directions to Tailwind classes
		const directionMap: Record<LinearDirection, string> = {
			'to top': 'bg-gradient-to-t',
			'to right': 'bg-gradient-to-r',
			'to bottom': 'bg-gradient-to-b',
			'to left': 'bg-gradient-to-l',
			'to top right': 'bg-gradient-to-tr',
			'to bottom right': 'bg-gradient-to-br',
			'to bottom left': 'bg-gradient-to-bl',
			'to top left': 'bg-gradient-to-tl',
		}

		const baseClass = directionMap[direction] || 'bg-gradient-to-r'
		const colorClasses = stops
			.map((stop, index) => {
				const colorName = `[${stop.color}]`
				if (index === 0) return `from${colorName}`
				if (index === stops.length - 1) return `to${colorName}`
				return `via${colorName}`
			})
			.join(' ')

		return `${baseClass} ${colorClasses}`
	}, [type, direction, stops])

	/**
	 * Save current gradient to localStorage
	 */
	const saveGradient = useCallback(() => {
		const newGradient: SavedGradient = {
			id: Date.now().toString(),
			type,
			direction: type === 'linear' ? direction : undefined,
			shape: type === 'radial' ? shape : undefined,
			stops: [...stops],
			createdAt: Date.now(),
		}

		const updated = [newGradient, ...savedGradients].slice(0, 20) // Keep last 20
		setSavedGradients(updated)

		try {
			localStorage.setItem('gradient-generator-history', JSON.stringify(updated))
		} catch (err) {
			console.error('Failed to save gradient:', err)
		}
	}, [type, direction, shape, stops, savedGradients])

	/**
	 * Load a saved gradient
	 */
	const loadGradient = useCallback((gradient: SavedGradient) => {
		setType(gradient.type)
		if (gradient.direction) {
			setDirection(gradient.direction)
		}
		if (gradient.shape) {
			setShape(gradient.shape)
		}
		setStops(gradient.stops)
	}, [])

	/**
	 * Delete a saved gradient
	 */
	const deleteSavedGradient = useCallback((id: string) => {
		const updated = savedGradients.filter((g) => g.id !== id)
		setSavedGradients(updated)

		try {
			localStorage.setItem('gradient-generator-history', JSON.stringify(updated))
		} catch (err) {
			console.error('Failed to delete gradient:', err)
		}
	}, [savedGradients])

	return {
		type,
		setType,
		direction,
		setDirection,
		shape,
		setShape,
		stops,
		addStop,
		removeStop,
		updateStop,
		generateRandom,
		smoothDistribution,
		reverseGradient,
		generateCss,
		generateFullCss,
		generateTailwind,
		saveGradient,
		savedGradients,
		loadGradient,
		deleteSavedGradient,
	}
}



