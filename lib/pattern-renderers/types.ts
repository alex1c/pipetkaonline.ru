/**
 * Pattern Generator Types
 * 
 * Type definitions for pattern generator.
 * 
 * @module lib/pattern-renderers/types
 */

/**
 * Pattern type
 */
export type PatternType =
	| 'polka-dots'
	| 'stripes'
	| 'grid'
	| 'triangles'
	| 'zigzag'
	| 'waves'
	| 'crosses'
	| 'noise'
	| 'minimalistic-shapes'

/**
 * Pattern settings
 */
export interface PatternSettings {
	/** Pattern type */
	type: PatternType
	/** Tile size in pixels */
	tileSize: number
	/** Background color (HEX) */
	backgroundColor: string
	/** Element color (HEX) */
	elementColor: string
	/** Density (0-100) */
	density: number
	/** Element size (0-100) */
	elementSize: number
	/** Rotation in degrees */
	rotation: number
	/** Randomness (0-100) */
	randomness: number
	/** Additional settings for specific patterns */
	additional?: {
		/** For stripes: direction */
		direction?: 'vertical' | 'horizontal' | 'diagonal'
		/** For waves: amplitude */
		amplitude?: number
		/** For waves: frequency */
		frequency?: number
		/** For polka dots: shape */
		shape?: 'circle' | 'square'
		/** For grid: line width */
		lineWidth?: number
	}
}

/**
 * Pattern preset
 */
export interface PatternPreset {
	name: string
	settings: PatternSettings
}

