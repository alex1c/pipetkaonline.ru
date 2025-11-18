/**
 * Theme Presets
 * 
 * Predefined theme templates for quick selection.
 * 
 * @module lib/theme-generator/themePresets
 */

export interface ThemePreset {
	name: string
	baseColor: string
	mode: 'light' | 'dark'
	description: string
}

/**
 * Predefined theme presets
 */
export const themePresets: ThemePreset[] = [
	{
		name: 'Light',
		baseColor: '#3B82F6',
		mode: 'light',
		description: 'Classic light theme with blue primary',
	},
	{
		name: 'Dark',
		baseColor: '#3B82F6',
		mode: 'dark',
		description: 'Dark theme with blue primary',
	},
	{
		name: 'Vibrant',
		baseColor: '#EC4899',
		mode: 'light',
		description: 'Vibrant pink theme',
	},
	{
		name: 'Pastel',
		baseColor: '#A78BFA',
		mode: 'light',
		description: 'Soft pastel purple theme',
	},
	{
		name: 'Minimal',
		baseColor: '#6B7280',
		mode: 'light',
		description: 'Minimal gray theme',
	},
	{
		name: 'Corporate',
		baseColor: '#1E40AF',
		mode: 'light',
		description: 'Professional blue corporate theme',
	},
	{
		name: 'Warm',
		baseColor: '#F97316',
		mode: 'light',
		description: 'Warm orange theme',
	},
	{
		name: 'Cool',
		baseColor: '#06B6D4',
		mode: 'light',
		description: 'Cool cyan theme',
	},
	{
		name: 'Nature',
		baseColor: '#10B981',
		mode: 'light',
		description: 'Natural green theme',
	},
	{
		name: 'Sunset',
		baseColor: '#F59E0B',
		mode: 'light',
		description: 'Sunset amber theme',
	},
]

