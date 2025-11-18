/**
 * Gradient Presets
 * 
 * Predefined gradient maps for quick selection.
 * 
 * @module lib/gradient-map/gradientPresets
 */

import type { GradientStop } from './interpolateColors'

/**
 * Gradient preset
 */
export interface GradientPreset {
	name: string
	stops: GradientStop[]
	description: string
}

/**
 * Predefined gradient presets
 */
export const gradientPresets: GradientPreset[] = [
	{
		name: 'Duotone',
		description: 'Classic two-color duotone',
		stops: [
			{ position: 0, color: '#000000' },
			{ position: 1, color: '#FFFFFF' },
		],
	},
	{
		name: 'Cinematic',
		description: 'Cinematic blue-orange look',
		stops: [
			{ position: 0, color: '#1A1A2E' },
			{ position: 0.5, color: '#16213E' },
			{ position: 1, color: '#E94560' },
		],
	},
	{
		name: 'Warm',
		description: 'Warm tones',
		stops: [
			{ position: 0, color: '#2C1810' },
			{ position: 1, color: '#F4A460' },
		],
	},
	{
		name: 'Cold',
		description: 'Cold blue tones',
		stops: [
			{ position: 0, color: '#0A1929' },
			{ position: 1, color: '#64B5F6' },
		],
	},
	{
		name: 'Gold / Blue',
		description: 'Gold highlights, blue shadows',
		stops: [
			{ position: 0, color: '#1E3A5F' },
			{ position: 0.5, color: '#2D5F8F' },
			{ position: 1, color: '#FFD700' },
		],
	},
	{
		name: 'Cyber Neon',
		description: 'Neon cyberpunk style',
		stops: [
			{ position: 0, color: '#0D0D0D' },
			{ position: 0.3, color: '#1A0033' },
			{ position: 0.7, color: '#330066' },
			{ position: 1, color: '#00FFFF' },
		],
	},
	{
		name: 'Pastel',
		description: 'Soft pastel colors',
		stops: [
			{ position: 0, color: '#E8D5C4' },
			{ position: 1, color: '#F5C2E0' },
		],
	},
	{
		name: 'Black & White',
		description: 'Classic black and white',
		stops: [
			{ position: 0, color: '#000000' },
			{ position: 1, color: '#FFFFFF' },
		],
	},
	{
		name: 'Retro Film',
		description: 'Vintage film look',
		stops: [
			{ position: 0, color: '#2D1B0E' },
			{ position: 0.3, color: '#5D4E37' },
			{ position: 0.7, color: '#8B7355' },
			{ position: 1, color: '#D4C5A9' },
		],
	},
]

