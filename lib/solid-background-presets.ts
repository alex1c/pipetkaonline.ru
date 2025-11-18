/**
 * Solid Background Presets
 * 
 * Predefined color presets for solid background generator.
 * 
 * @module lib/solid-background-presets
 */

/**
 * Color preset category
 */
export interface ColorPreset {
	name: string
	color: string
}

/**
 * Preset categories
 */
export interface PresetCategory {
	category: string
	colors: ColorPreset[]
}

/**
 * Neutral colors (grays)
 */
export const neutralPresets: ColorPreset[] = [
	{ name: 'White', color: '#FFFFFF' },
	{ name: 'Light Gray', color: '#F5F5F5' },
	{ name: 'Gray', color: '#808080' },
	{ name: 'Dark Gray', color: '#404040' },
	{ name: 'Black', color: '#000000' },
	{ name: 'Warm Gray', color: '#8B8B8B' },
	{ name: 'Cool Gray', color: '#6B6B6B' },
	{ name: 'Charcoal', color: '#2C2C2C' },
]

/**
 * Pastel colors
 */
export const pastelPresets: ColorPreset[] = [
	{ name: 'Soft Pink', color: '#FFB6C1' },
	{ name: 'Lavender', color: '#E6E6FA' },
	{ name: 'Mint', color: '#BDFCC9' },
	{ name: 'Peach', color: '#FFDAB9' },
	{ name: 'Sky Blue', color: '#87CEEB' },
	{ name: 'Lemon', color: '#FFFACD' },
	{ name: 'Lilac', color: '#DDA0DD' },
	{ name: 'Powder Blue', color: '#B0E0E6' },
]

/**
 * Bright colors
 */
export const brightPresets: ColorPreset[] = [
	{ name: 'Red', color: '#FF0000' },
	{ name: 'Orange', color: '#FFA500' },
	{ name: 'Yellow', color: '#FFFF00' },
	{ name: 'Green', color: '#00FF00' },
	{ name: 'Blue', color: '#0000FF' },
	{ name: 'Purple', color: '#800080' },
	{ name: 'Cyan', color: '#00FFFF' },
	{ name: 'Magenta', color: '#FF00FF' },
]

/**
 * Dark colors
 */
export const darkPresets: ColorPreset[] = [
	{ name: 'Navy', color: '#000080' },
	{ name: 'Dark Green', color: '#006400' },
	{ name: 'Maroon', color: '#800000' },
	{ name: 'Dark Purple', color: '#4B0082' },
	{ name: 'Dark Blue', color: '#00008B' },
	{ name: 'Dark Red', color: '#8B0000' },
	{ name: 'Dark Orange', color: '#FF8C00' },
	{ name: 'Dark Gray', color: '#2F2F2F' },
]

/**
 * All preset categories
 */
export const allPresets: PresetCategory[] = [
	{ category: 'neutral', colors: neutralPresets },
	{ category: 'pastel', colors: pastelPresets },
	{ category: 'bright', colors: brightPresets },
	{ category: 'dark', colors: darkPresets },
]

/**
 * Get all presets as flat array
 * 
 * @returns {ColorPreset[]} All presets
 */
export function getAllPresets(): ColorPreset[] {
	return allPresets.flatMap((category) => category.colors)
}

