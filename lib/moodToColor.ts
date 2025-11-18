/**
 * Mood to Color Mapping
 * 
 * Maps emotions/moods to color palettes with explanations.
 * Each emotion has key colors, secondary accents, soft colors, and HSL ranges.
 * 
 * @module lib/moodToColor
 */

import { hslToRgb, rgbToHex } from './color-utils'

/**
 * Color palette for an emotion
 */
export interface EmotionPalette {
	keyColors: string[] // Main colors (HEX)
	secondary: string[] // Secondary accents (HEX)
	softColors: string[] // Supporting shades (HEX)
	explanation: string // Why these colors work
	textStyle: string // Descriptive text style
}

/**
 * HSL range for color generation
 */
export interface HslRange {
	h: { min: number; max: number } // Hue range (0-360)
	s: { min: number; max: number } // Saturation range (0-100)
	l: { min: number; max: number } // Lightness range (0-100)
}

/**
 * Emotion color data
 */
export interface EmotionData {
	palette: EmotionPalette
	hslRanges: HslRange[]
}

/**
 * Generate random color from HSL range
 * 
 * @param {HslRange} range - HSL range
 * @returns {string} Color in HEX
 */
function generateColorFromRange(range: HslRange): string {
	const h = Math.random() * (range.h.max - range.h.min) + range.h.min
	const s = Math.random() * (range.s.max - range.s.min) + range.s.min
	const l = Math.random() * (range.l.max - range.l.min) + range.l.min

	const rgb = hslToRgb(h, s, l)
	return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * Generate palette from HSL ranges
 * 
 * @param {HslRange[]} ranges - HSL ranges
 * @param {number} count - Number of colors to generate
 * @returns {string[]} Array of HEX colors
 */
function generatePaletteFromRanges(ranges: HslRange[], count: number): string[] {
	const colors: string[] = []
	for (let i = 0; i < count; i++) {
		const range = ranges[Math.floor(Math.random() * ranges.length)]
		colors.push(generateColorFromRange(range))
	}
	return colors
}

/**
 * Emotion to color mapping
 */
const emotionMap: Record<string, EmotionData> = {
	joy: {
		palette: {
			keyColors: ['#FFD700', '#FFA500', '#FFB6C1'],
			secondary: ['#FFF4A3', '#FFC27A', '#FF7F9F'],
			softColors: ['#FFE5B4', '#FFDAB9', '#FFE4E1', '#FFF8DC', '#FFEFD5'],
			explanation:
				'Тёплые оттенки традиционно ассоциируются с солнечным светом и ощущением жизненной энергии. Это лёгкие, живые цвета, которые исторически используются для передачи праздника, тепла и открытости.',
			textStyle: 'Яркий, жизнерадостный, солнечный',
		},
		hslRanges: [
			{ h: { min: 40, max: 60 }, s: { min: 70, max: 100 }, l: { min: 50, max: 90 } }, // Warm yellows
			{ h: { min: 15, max: 35 }, s: { min: 80, max: 100 }, l: { min: 50, max: 80 } }, // Oranges
			{ h: { min: 330, max: 350 }, s: { min: 50, max: 80 }, l: { min: 70, max: 90 } }, // Soft pinks
		],
	},
	calm: {
		palette: {
			keyColors: ['#A3D5FF', '#C7CEEA', '#CFF1CF'],
			secondary: ['#74B9FF', '#B299E9', '#A6E3A1'],
			softColors: ['#E0F2F1', '#E8F5E9', '#E3F2FD', '#F1F8FF', '#F0F4F8'],
			explanation:
				'Холодные и приглушённые тона визуально снижают напряжение. Голубой традиционно ассоциируется со стабильностью и ясностью — как чистое небо или вода. Зелёный — с природой, гармонией и медленным ритмом.',
			textStyle: 'Умиротворённый, свежий, гармоничный',
		},
		hslRanges: [
			{ h: { min: 190, max: 210 }, s: { min: 50, max: 80 }, l: { min: 60, max: 85 } }, // Blues
			{ h: { min: 250, max: 270 }, s: { min: 30, max: 60 }, l: { min: 70, max: 90 } }, // Lavenders
			{ h: { min: 120, max: 150 }, s: { min: 30, max: 60 }, l: { min: 70, max: 90 } }, // Soft greens
		],
	},
	energy: {
		palette: {
			keyColors: ['#FF4D4D', '#FF5FD2', '#FF6F00'],
			secondary: ['#D72638', '#FF2BC2', '#FF8C42'],
			softColors: ['#FF6B6B', '#FF8E8E', '#FFA07A', '#FFB347', '#FFD700'],
			explanation:
				'Эти оттенки обладают высокой визуальной активностью. Красный веками использовался как символ страсти и решительности. Яркие, насыщенные цвета естественно подталкивают взгляд вперёд, усиливая чувство движения.',
			textStyle: 'Динамичный, страстный, решительный',
		},
		hslRanges: [
			{ h: { min: 0, max: 15 }, s: { min: 70, max: 100 }, l: { min: 40, max: 70 } }, // Reds
			{ h: { min: 310, max: 330 }, s: { min: 80, max: 100 }, l: { min: 50, max: 80 } }, // Neon pinks
			{ h: { min: 15, max: 30 }, s: { min: 90, max: 100 }, l: { min: 50, max: 70 } }, // Bright oranges
		],
	},
	nostalgia: {
		palette: {
			keyColors: ['#E7DCD2', '#A3B9B2', '#C7A27C'],
			secondary: ['#D8C3A5', '#8FA7A3', '#A67C52'],
			softColors: ['#F5E6D3', '#E8DCC6', '#D4C4B0', '#C9B99B', '#B8A082'],
			explanation:
				'Приглушённые, слегка «припылённые» тона вызывают ассоциации с фотографиями прошлого, винтажными материалами и природными текстурами. Это цвета, которые ощущаются мягкими, тёплыми и знакомыми.',
			textStyle: 'Тёплый, винтажный, уютный',
		},
		hslRanges: [
			{ h: { min: 25, max: 40 }, s: { min: 20, max: 40 }, l: { min: 70, max: 90 } }, // Dusty pastels
			{ h: { min: 160, max: 180 }, s: { min: 15, max: 35 }, l: { min: 60, max: 75 } }, // Faded teals
			{ h: { min: 25, max: 35 }, s: { min: 30, max: 50 }, l: { min: 50, max: 70 } }, // Retro browns
		],
	},
	confidence: {
		palette: {
			keyColors: ['#1D3557', '#5A3E85', '#6C757D'],
			secondary: ['#264653', '#3C1D6B', '#495057'],
			softColors: ['#2C3E50', '#34495E', '#4A5568', '#5D6D7E', '#6E7F8F'],
			explanation:
				'Тёмные и насыщенные цвета традиционно использовали в гербах, костюмах, корпоративных идентиках — они символизируют серьёзность, структуру и надёжность. Синий ассоциируется с авторитетом и стабильностью.',
			textStyle: 'Солидный, авторитетный, надёжный',
		},
		hslRanges: [
			{ h: { min: 200, max: 220 }, s: { min: 50, max: 80 }, l: { min: 20, max: 40 } }, // Deep blues
			{ h: { min: 260, max: 280 }, s: { min: 40, max: 70 }, l: { min: 25, max: 45 } }, // Dark purples
			{ h: { min: 0, max: 0 }, s: { min: 0, max: 10 }, l: { min: 30, max: 50 } }, // Solid grays
		],
	},
	anxiety: {
		palette: {
			keyColors: ['#D9D9D9', '#3A5A78', '#FFED4A'],
			secondary: ['#A3A3A3', '#1F3A52', '#FFC800'],
			softColors: ['#E5E5E5', '#C0C0C0', '#4A6FA5', '#5B7FA3', '#F5F5DC'],
			explanation:
				'Тревожные палитры часто строятся на контрастах и холодных оттенках. Глубокие, «закрытые» синие передают внутреннее напряжение, а резкие жёлтые акценты усиливают чувство хрупкости равновесия.',
			textStyle: 'Напряжённый, контрастный, неустойчивый',
		},
		hslRanges: [
			{ h: { min: 0, max: 0 }, s: { min: 0, max: 5 }, l: { min: 60, max: 85 } }, // Cold grays
			{ h: { min: 200, max: 210 }, s: { min: 40, max: 60 }, l: { min: 30, max: 50 } }, // Blue-greens
			{ h: { min: 50, max: 60 }, s: { min: 90, max: 100 }, l: { min: 60, max: 80 } }, // Contrast yellows
		],
	},
	romance: {
		palette: {
			keyColors: ['#F2C9CE', '#D96767', '#FFF1E6'],
			secondary: ['#E8AEB7', '#C34949', '#FDEDE4'],
			softColors: ['#FFE4E1', '#FFB6C1', '#FFC0CB', '#FFDAB9', '#FFE5B4'],
			explanation:
				'Исторически романтическая эстетика всегда тяготела к мягким розовым и кремовым оттенкам — от классических живописных традиций до современных свадебных палитр. Тёплые тона создают ощущение близости и нежности.',
			textStyle: 'Нежный, тёплый, интимный',
		},
		hslRanges: [
			{ h: { min: 340, max: 355 }, s: { min: 30, max: 60 }, l: { min: 75, max: 90 } }, // Powder pinks
			{ h: { min: 0, max: 10 }, s: { min: 50, max: 70 }, l: { min: 50, max: 70 } }, // Warm reds
			{ h: { min: 25, max: 35 }, s: { min: 10, max: 30 }, l: { min: 90, max: 98 } }, // Light creams
		],
	},
	inspiration: {
		palette: {
			keyColors: ['#3A86FF', '#9D4EDD', '#4EDFD2'],
			secondary: ['#2667FF', '#7B2CBF', '#47C1BD'],
			softColors: ['#5B9FFF', '#6BA3FF', '#B19CD9', '#A8D5E2', '#7FCDCD'],
			explanation:
				'Синий и фиолетовый часто символизируют идеи, воображение и интеллектуальную активность. Бирюзовый добавляет ощущение новизны и лёгкого ветра перемен — всё вместе создаёт бодрящую, творческую атмосферу.',
			textStyle: 'Творческий, свежий, вдохновляющий',
		},
		hslRanges: [
			{ h: { min: 210, max: 230 }, s: { min: 80, max: 100 }, l: { min: 50, max: 70 } }, // Rich blues
			{ h: { min: 270, max: 290 }, s: { min: 60, max: 80 }, l: { min: 50, max: 70 } }, // Creative purples
			{ h: { min: 175, max: 185 }, s: { min: 60, max: 80 }, l: { min: 60, max: 80 } }, // Refreshing turquoises
		],
	},
}

/**
 * Get emotion data by key
 * 
 * @param {string} emotionKey - Emotion key
 * @returns {EmotionData | null} Emotion data or null
 */
export function getEmotionData(emotionKey: string): EmotionData | null {
	return emotionMap[emotionKey] || null
}

/**
 * Generate palette for emotion
 * 
 * @param {string} emotionKey - Emotion key
 * @param {Object} options - Generation options
 * @param {boolean} options.warm - Prefer warm colors
 * @param {boolean} options.bright - Prefer bright colors
 * @param {boolean} options.natural - Prefer natural colors
 * @returns {EmotionPalette} Generated palette
 */
export function generateEmotionPalette(
	emotionKey: string,
	options: { warm?: boolean; bright?: boolean; natural?: boolean } = {}
): EmotionPalette {
	const emotionData = getEmotionData(emotionKey)

	if (!emotionData) {
		// Fallback to calm if emotion not found
		return emotionMap.calm.palette
	}

	// Adjust HSL ranges based on options
	let adjustedRanges = [...emotionData.hslRanges]

	if (options.warm) {
		adjustedRanges = adjustedRanges.map((range) => ({
			...range,
			h: { min: Math.max(0, range.h.min - 20), max: Math.min(360, range.h.max + 20) },
		}))
	}

	if (options.bright) {
		adjustedRanges = adjustedRanges.map((range) => ({
			...range,
			s: { min: Math.max(0, range.s.min - 10), max: Math.min(100, range.s.max + 10) },
			l: { min: Math.max(0, range.l.min - 10), max: Math.min(100, range.l.max + 10) },
		}))
	}

	// Generate new colors from ranges
	const keyColors = generatePaletteFromRanges(adjustedRanges, 3)
	const secondary = generatePaletteFromRanges(adjustedRanges, 2)
	const softColors = generatePaletteFromRanges(adjustedRanges, 5)

	return {
		keyColors,
		secondary,
		softColors,
		explanation: emotionData.palette.explanation,
		textStyle: emotionData.palette.textStyle,
	}
}

/**
 * Find similar emotions for custom input
 * 
 * @param {string} customEmotion - Custom emotion text
 * @returns {string[]} Array of similar emotion keys
 */
export function findSimilarEmotions(customEmotion: string): string[] {
	// Simple keyword matching (can be enhanced with NLP)
	const lower = customEmotion.toLowerCase()

	const keywords: Record<string, string[]> = {
		joy: ['радость', 'счастье', 'веселье', 'joy', 'happy', 'happiness', 'cheerful'],
		calm: ['спокойствие', 'умиротворение', 'покой', 'calm', 'peace', 'tranquil', 'serene'],
		energy: ['энергия', 'активность', 'динамика', 'energy', 'active', 'dynamic', 'vibrant'],
		nostalgia: ['ностальгия', 'воспоминания', 'прошлое', 'nostalgia', 'memories', 'vintage'],
		confidence: ['уверенность', 'сила', 'решимость', 'confidence', 'strength', 'determined'],
		anxiety: ['тревога', 'беспокойство', 'напряжение', 'anxiety', 'worry', 'tension'],
		romance: ['романтика', 'любовь', 'нежность', 'romance', 'love', 'tender'],
		inspiration: ['вдохновение', 'творчество', 'идеи', 'inspiration', 'creative', 'ideas'],
	}

	const matches: { key: string; score: number }[] = []

	for (const [key, words] of Object.entries(keywords)) {
		const score = words.filter((word) => lower.includes(word)).length
		if (score > 0) {
			matches.push({ key, score })
		}
	}

	matches.sort((a, b) => b.score - a.score)
	return matches.slice(0, 3).map((m) => m.key)
}

