/**
 * Color Name Utilities
 * 
 * Advanced utilities for color naming, LAB/LCH conversions, and color matching.
 * Provides functions for:
 * - RGB to LAB/LCH conversions
 * - CIEDE2000 delta E calculation
 * - Color name matching from dictionaries
 * - Algorithmic color naming
 * 
 * @module lib/color-name-utils
 */

import { hexToRgb, rgbToHex, rgbToHsl } from './color-utils'

/**
 * RGB to XYZ color space conversion
 * 
 * Converts RGB to XYZ using D65 illuminant (standard daylight).
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {{ x: number; y: number; z: number }} XYZ color values
 */
function rgbToXyz(r: number, g: number, b: number): { x: number; y: number; z: number } {
	// Normalize RGB to 0-1
	let rNorm = r / 255
	let gNorm = g / 255
	let bNorm = b / 255

	// Apply gamma correction
	rNorm = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92
	gNorm = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92
	bNorm = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92

	// Convert to XYZ using D65 illuminant
	const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375
	const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.072175
	const z = rNorm * 0.0193339 + gNorm * 0.119192 + bNorm * 0.9503041

	return { x: x * 100, y: y * 100, z: z * 100 }
}

/**
 * XYZ to LAB color space conversion
 * 
 * Converts XYZ to LAB using D65 white point reference.
 * 
 * @param {number} x - X component
 * @param {number} y - Y component
 * @param {number} z - Z component
 * @returns {{ l: number; a: number; b: number }} LAB color values
 */
function xyzToLab(x: number, y: number, z: number): { l: number; a: number; b: number } {
	// D65 white point
	const xn = 95.047
	const yn = 100.0
	const zn = 108.883

	// Normalize by white point
	let xNorm = x / xn
	let yNorm = y / yn
	let zNorm = z / zn

	// Apply f function
	const f = (t: number) => {
		return t > 0.008856 ? Math.pow(t, 1 / 3) : (7.787 * t + 16 / 116)
	}

	const fx = f(xNorm)
	const fy = f(yNorm)
	const fz = f(zNorm)

	const l = 116 * fy - 16
	const a = 500 * (fx - fy)
	const b = 200 * (fy - fz)

	return { l, a, b }
}

/**
 * Convert RGB to LAB color space
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {{ l: number; a: number; b: number }} LAB color values
 */
export function rgbToLab(r: number, g: number, b: number): { l: number; a: number; b: number } {
	const xyz = rgbToXyz(r, g, b)
	return xyzToLab(xyz.x, xyz.y, xyz.z)
}

/**
 * LAB to LCH color space conversion
 * 
 * Converts LAB to LCH (Lightness, Chroma, Hue).
 * 
 * @param {number} l - Lightness (0-100)
 * @param {number} a - A component
 * @param {number} b - B component
 * @returns {{ l: number; c: number; h: number }} LCH color values
 */
export function labToLch(l: number, a: number, b: number): { l: number; c: number; h: number } {
	const c = Math.sqrt(a * a + b * b)
	let h = Math.atan2(b, a) * (180 / Math.PI)
	if (h < 0) h += 360
	return { l, c, h }
}

/**
 * Calculate CIEDE2000 color difference (ΔE)
 * 
 * Advanced color difference formula that better matches human perception.
 * 
 * @param {Object} lab1 - First LAB color
 * @param {number} lab1.l - Lightness
 * @param {number} lab1.a - A component
 * @param {number} lab1.b - B component
 * @param {Object} lab2 - Second LAB color
 * @param {number} lab2.l - Lightness
 * @param {number} lab2.a - A component
 * @param {number} lab2.b - B component
 * @returns {number} Delta E value (lower = more similar)
 */
export function deltaE2000(
	lab1: { l: number; a: number; b: number },
	lab2: { l: number; a: number; b: number }
): number {
	// Simplified CIEDE2000 calculation
	// Full implementation would be more complex
	const dl = lab1.l - lab2.l
	const da = lab1.a - lab2.a
	const db = lab1.b - lab2.b

	// Weighted Euclidean distance (simplified)
	const c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b)
	const c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b)
	const dc = c1 - c2

	// Calculate hue difference
	const h1 = Math.atan2(lab1.b, lab1.a) * (180 / Math.PI)
	const h2 = Math.atan2(lab2.b, lab2.a) * (180 / Math.PI)
	let dh = Math.abs(h1 - h2)
	if (dh > 180) dh = 360 - dh

	const sl = 1 + (0.015 * Math.pow((lab1.l + lab2.l) / 2 - 50, 2)) / Math.sqrt(20 + Math.pow((lab1.l + lab2.l) / 2 - 50, 2))
	const sc = 1 + 0.045 * ((c1 + c2) / 2)
	const sh = 1 + 0.015 * ((c1 + c2) / 2) * (1 - 0.17 * Math.cos((h1 + h2) / 2 * (Math.PI / 180)))

	const rt = -2 * Math.sqrt(Math.pow((c1 + c2) / 2, 7) / (Math.pow((c1 + c2) / 2, 7) + Math.pow(25, 7))) * Math.sin(60 * Math.exp(-Math.pow((dh + 180) / 25, 2)) * (Math.PI / 180))

	const kl = 1
	const kc = 1
	const kh = 1

	const deltaE = Math.sqrt(
		Math.pow(dl / (kl * sl), 2) +
			Math.pow(dc / (kc * sc), 2) +
			Math.pow(dh / (kh * sh), 2) +
			rt * (dc / (kc * sc)) * (dh / (kh * sh))
	)

	return deltaE
}

/**
 * CSS Color Names Dictionary
 * 
 * Standard CSS color names with their HEX values.
 */
export const cssColorNames: Record<string, string> = {
	aliceblue: '#F0F8FF',
	aquamarine: '#7FFFD4',
	azure: '#F0FFFF',
	beige: '#F5F5DC',
	bisque: '#FFE4C4',
	black: '#000000',
	blanchedalmond: '#FFEBCD',
	blue: '#0000FF',
	blueviolet: '#8A2BE2',
	brown: '#A52A2A',
	burlywood: '#DEB887',
	cadetblue: '#5F9EA0',
	chartreuse: '#7FFF00',
	chocolate: '#D2691E',
	coral: '#FF7F50',
	cornflowerblue: '#6495ED',
	cornsilk: '#FFF8DC',
	crimson: '#DC143C',
	cyan: '#00FFFF',
	darkblue: '#00008B',
	darkcyan: '#008B8B',
	darkgoldenrod: '#B8860B',
	darkgray: '#A9A9A9',
	darkgreen: '#006400',
	darkkhaki: '#BDB76B',
	darkmagenta: '#8B008B',
	darkolivegreen: '#556B2F',
	darkorange: '#FF8C00',
	darkorchid: '#9932CC',
	darkred: '#8B0000',
	darksalmon: '#FA8072',
	darkseagreen: '#8FBC8F',
	darkslateblue: '#1E3A8A',
	darkslategray: '#2F4F4F',
	darkturquoise: '#00CED1',
	darkviolet: '#9400D3',
	deeppink: '#FF1493',
	deepskyblue: '#00BFFF',
	dimgray: '#696969',
	dodgerblue: '#1E90FF',
	firebrick: '#B22222',
	floralwhite: '#FFFAF0',
	forestgreen: '#228B22',
	fuchsia: '#FF00FF',
	gainsboro: '#DCDCDC',
	ghostwhite: '#F8F8FF',
	gold: '#FFD700',
	goldenrod: '#DAA520',
	gray: '#808080',
	green: '#008000',
	greenyellow: '#ADFF2F',
	honeydew: '#F0FFF0',
	hotpink: '#FF69B4',
	indianred: '#CD5C5C',
	indigo: '#4B0082',
	ivory: '#FFFFF0',
	khaki: '#F0E68C',
	lavender: '#E6E6FA',
	lavenderblush: '#FFF0F5',
	lawngreen: '#7CFC00',
	lemonchiffon: '#FFFACD',
	lightblue: '#ADD8E6',
	lightcoral: '#F08080',
	lightcyan: '#F0FFFF',
	lightgoldenrodyellow: '#FAFAD2',
	lightgray: '#D3D3D3',
	lightgreen: '#90EE90',
	lightpink: '#FFB6C1',
	lightsalmon: '#FFA07A',
	lightseagreen: '#20B2AA',
	lightskyblue: '#87CEFA',
	lightslategray: '#778899',
	lightsteelblue: '#B0C4DE',
	lightyellow: '#FFFFE0',
	lime: '#00FF00',
	limegreen: '#32CD32',
	linen: '#FAF0E6',
	magenta: '#FF00FF',
	maroon: '#800000',
	mediumaquamarine: '#66CDAA',
	mediumblue: '#0000CD',
	mediumorchid: '#BA55D3',
	mediumpurple: '#9370DB',
	mediumseagreen: '#3CB371',
	mediumslateblue: '#7B68EE',
	mediumspringgreen: '#00FA9A',
	mediumturquoise: '#48D1CC',
	mediumvioletred: '#C71585',
	midnightblue: '#191970',
	mintcream: '#F5FFFA',
	mistyrose: '#FFE4E1',
	moccasin: '#FFE4B5',
	navajowhite: '#FFDEAD',
	navy: '#000080',
	oldlace: '#FDF5E6',
	olive: '#808000',
	olivedrab: '#6B8E23',
	orange: '#FFA500',
	orangered: '#FF4500',
	orchid: '#DA70D6',
	palegoldenrod: '#EEE8AA',
	palegreen: '#98FB98',
	paleturquoise: '#AEDEE6',
	palevioletred: '#DB7093',
	papayawhip: '#FFEFD5',
	peachpuff: '#FFDAB9',
	peru: '#CD853F',
	pink: '#FFC0CB',
	plum: '#DDA0DD',
	powderblue: '#B0E0E6',
	purple: '#800080',
	rebeccapurple: '#663399',
	red: '#FF0000',
	rosybrown: '#A0522D',
	royalblue: '#4169E1',
	saddlebrown: '#8B4513',
	salmon: '#FA8072',
	sandybrown: '#F4A460',
	seagreen: '#2E8B57',
	seashell: '#FFF5EE',
	sienna: '#A0522D',
	silver: '#C0C0C0',
	skyblue: '#87CEEB',
	slateblue: '#6A5ACD',
	slategray: '#708090',
	snow: '#FFFAFA',
	springgreen: '#00FF7F',
	steelblue: '#4682B4',
	tan: '#D2B48C',
	teal: '#008080',
	thistle: '#D8BFD8',
	tomato: '#FF6347',
	turquoise: '#40E0D0',
	violet: '#EE82EE',
	wheat: '#F5DEB3',
	white: '#FFFFFF',
	whitesmoke: '#F5F5F5',
	yellow: '#FFFF00',
	yellowgreen: '#9ACD32',
}

/**
 * Find closest color name from dictionary
 * 
 * @param {string} hexColor - Color in HEX format
 * @param {Record<string, string>} dictionary - Color name dictionary
 * @param {number} maxResults - Maximum number of results
 * @returns {Array} Array of closest color matches with names and distances
 */
export function findClosestColorNames(
	hexColor: string,
	dictionary: Record<string, string> = cssColorNames,
	maxResults: number = 6
): Array<{ name: string; hex: string; distance: number }> {
	const rgb = hexToRgb(hexColor)
	if (!rgb) return []

	const lab1 = rgbToLab(rgb.r, rgb.g, rgb.b)
	const matches: Array<{ name: string; hex: string; distance: number }> = []

	for (const [name, hex] of Object.entries(dictionary)) {
		const rgb2 = hexToRgb(hex)
		if (!rgb2) continue

		const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b)
		const distance = deltaE2000(lab1, lab2)

		matches.push({ name, hex, distance })
	}

	// Sort by distance and return top results
	return matches.sort((a, b) => a.distance - b.distance).slice(0, maxResults)
}

/**
 * Generate algorithmic color name
 * 
 * Creates a descriptive color name based on HSL values.
 * 
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Algorithmic color name
 */
export function algorithmicColorNaming(h: number, s: number, l: number): string {
	// Determine saturation descriptor
	let saturationDesc = ''
	if (s < 20) {
		saturationDesc = 'Muted'
	} else if (s < 50) {
		saturationDesc = 'Soft'
	} else if (s < 80) {
		saturationDesc = 'Vivid'
	} else {
		saturationDesc = 'Intense'
	}

	// Determine temperature
	let temperatureDesc = ''
	if ((h >= 0 && h <= 60) || (h >= 330 && h <= 360)) {
		temperatureDesc = 'Warm'
	} else if (h >= 180 && h <= 270) {
		temperatureDesc = 'Cool'
	} else {
		temperatureDesc = 'Neutral'
	}

	// Determine lightness descriptor
	let lightnessDesc = ''
	if (l < 20) {
		lightnessDesc = 'Deep'
	} else if (l < 40) {
		lightnessDesc = 'Dark'
	} else if (l < 60) {
		lightnessDesc = 'Mid'
	} else if (l < 80) {
		lightnessDesc = 'Light'
	} else {
		lightnessDesc = 'Pale'
	}

	// Determine hue name
	let hueName = ''
	if (h < 15 || h >= 345) {
		hueName = 'Red'
	} else if (h < 45) {
		hueName = 'Orange'
	} else if (h < 75) {
		hueName = 'Yellow'
	} else if (h < 150) {
		hueName = 'Green'
	} else if (h < 210) {
		hueName = 'Cyan'
	} else if (h < 270) {
		hueName = 'Blue'
	} else if (h < 300) {
		hueName = 'Violet'
	} else {
		hueName = 'Magenta'
	}

	return `${saturationDesc} ${temperatureDesc} ${hueName}`
}

/**
 * Generate marketing color name
 * 
 * Creates a poetic/marketing-style color name.
 * 
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Marketing color name
 */
export function generateMarketingName(h: number, s: number, l: number): string {
	const marketingNames = [
		'Sunset Ember',
		'Ocean Whisper',
		'Steel Dawn',
		'Forest Mist',
		'Golden Hour',
		'Midnight Blue',
		'Rose Petal',
		'Emerald Dream',
		'Silver Moon',
		'Crimson Tide',
		'Lavender Sky',
		'Copper Sunset',
		'Ice Blue',
		'Charcoal Night',
		'Peach Blossom',
		'Turquoise Wave',
		'Plum Velvet',
		'Sage Green',
		'Coral Reef',
		'Amber Glow',
	]

	// Use hue to select a name
	const index = Math.floor((h / 360) * marketingNames.length)
	return marketingNames[index] || 'Mystic Shade'
}

/**
 * Get color tags
 * 
 * Determines semantic tags for a color (warm/cold, saturated/muted, dark/light).
 * 
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {Array<string>} Array of color tags
 */
export function getColorTags(h: number, s: number, l: number): string[] {
	const tags: string[] = []

	// Temperature
	if ((h >= 0 && h <= 60) || (h >= 330 && h <= 360)) {
		tags.push('warm')
	} else if (h >= 180 && h <= 270) {
		tags.push('cold')
	}

	// Saturation
	if (s >= 70) {
		tags.push('saturated')
	} else if (s < 30) {
		tags.push('muted')
	}

	// Lightness
	if (l >= 70) {
		tags.push('light')
	} else if (l < 30) {
		tags.push('dark')
	}

	return tags
}

