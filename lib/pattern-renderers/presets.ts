/**
 * Pattern Presets
 * 
 * Predefined pattern presets for quick access.
 * 
 * @module lib/pattern-renderers/presets
 */

import type { PatternPreset } from './types'

/**
 * Pattern presets library
 */
export const patternPresets: PatternPreset[] = [
	// Minimalistic
	{
		name: 'Minimalistic',
		settings: {
			type: 'polka-dots',
			tileSize: 256,
			backgroundColor: '#FFFFFF',
			elementColor: '#E5E5E5',
			density: 30,
			elementSize: 50,
			rotation: 0,
			randomness: 10,
			additional: { shape: 'circle' },
		},
	},
	// Pastel
	{
		name: 'Pastel',
		settings: {
			type: 'waves',
			tileSize: 256,
			backgroundColor: '#FFF5F5',
			elementColor: '#FFB6C1',
			density: 50,
			elementSize: 60,
			rotation: 0,
			randomness: 20,
			additional: { amplitude: 15, frequency: 0.03 },
		},
	},
	// Bright
	{
		name: 'Bright',
		settings: {
			type: 'triangles',
			tileSize: 256,
			backgroundColor: '#000000',
			elementColor: '#FF6B6B',
			density: 60,
			elementSize: 70,
			rotation: 0,
			randomness: 30,
		},
	},
	// Monochrome
	{
		name: 'Monochrome',
		settings: {
			type: 'grid',
			tileSize: 256,
			backgroundColor: '#FFFFFF',
			elementColor: '#000000',
			density: 40,
			elementSize: 50,
			rotation: 0,
			randomness: 0,
			additional: { lineWidth: 2 },
		},
	},
	// Scandinavian
	{
		name: 'Scandinavian',
		settings: {
			type: 'stripes',
			tileSize: 256,
			backgroundColor: '#F5F5F5',
			elementColor: '#4A90E2',
			density: 35,
			elementSize: 40,
			rotation: 0,
			randomness: 5,
			additional: { direction: 'horizontal' },
		},
	},
	// Retro
	{
		name: 'Retro',
		settings: {
			type: 'zigzag',
			tileSize: 256,
			backgroundColor: '#FFE5B4',
			elementColor: '#FF6B35',
			density: 50,
			elementSize: 60,
			rotation: 0,
			randomness: 15,
		},
	},
	// Memphis
	{
		name: 'Memphis',
		settings: {
			type: 'minimalistic-shapes',
			tileSize: 256,
			backgroundColor: '#FFF9E6',
			elementColor: '#FF6B9D',
			density: 45,
			elementSize: 55,
			rotation: 0,
			randomness: 40,
		},
	},
	// Geometry
	{
		name: 'Geometry',
		settings: {
			type: 'triangles',
			tileSize: 256,
			backgroundColor: '#1A1A2E',
			elementColor: '#0F3460',
			density: 55,
			elementSize: 65,
			rotation: 45,
			randomness: 10,
		},
	},
	// Business UI
	{
		name: 'Business UI',
		settings: {
			type: 'grid',
			tileSize: 256,
			backgroundColor: '#F8F9FA',
			elementColor: '#495057',
			density: 30,
			elementSize: 40,
			rotation: 0,
			randomness: 0,
			additional: { lineWidth: 1 },
		},
	},
	// Dark Theme
	{
		name: 'Dark Theme',
		settings: {
			type: 'crosses',
			tileSize: 256,
			backgroundColor: '#1E1E1E',
			elementColor: '#4A4A4A',
			density: 35,
			elementSize: 45,
			rotation: 0,
			randomness: 20,
		},
	},
	// Kids
	{
		name: 'Kids',
		settings: {
			type: 'polka-dots',
			tileSize: 256,
			backgroundColor: '#FFF9C4',
			elementColor: '#FF6B9D',
			density: 50,
			elementSize: 60,
			rotation: 0,
			randomness: 25,
			additional: { shape: 'circle' },
		},
	},
	// Tech
	{
		name: 'Tech',
		settings: {
			type: 'noise',
			tileSize: 256,
			backgroundColor: '#0A0A0A',
			elementColor: '#00FF88',
			density: 15,
			elementSize: 50,
			rotation: 0,
			randomness: 50,
		},
	},
]

