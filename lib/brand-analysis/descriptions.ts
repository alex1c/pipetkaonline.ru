/**
 * Description Generation Utilities
 * 
 * Functions for generating brand color palette descriptions.
 * 
 * @module lib/brand-analysis/descriptions
 */

import type { ClusteredColor } from './colorClustering'
import type { PaletteCharacteristics, HarmonyAnalysis } from './paletteAnalysis'

/**
 * Brand descriptions
 */
export interface BrandDescriptions {
	short: string
	marketing: string
	technical: string
	recommendations: string
}

/**
 * Generate brand color descriptions
 * 
 * @param {ClusteredColor[]} colors - Clustered colors
 * @param {PaletteCharacteristics} characteristics - Palette characteristics
 * @param {HarmonyAnalysis} harmony - Harmony analysis
 * @returns {BrandDescriptions} Generated descriptions
 */
export function generateDescriptions(
	colors: ClusteredColor[],
	characteristics: PaletteCharacteristics,
	harmony: HarmonyAnalysis
): BrandDescriptions {
	const primary = colors.filter((c) => c.cluster === 'primary')
	const secondary = colors.filter((c) => c.cluster === 'secondary')
	const accent = colors.filter((c) => c.cluster === 'accent')
	const neutral = colors.filter((c) => c.cluster === 'neutral')

	// Short description
	const short = `A ${characteristics.style} ${characteristics.temperature} palette with ${colors.length} colors, featuring ${primary.length} primary, ${secondary.length} secondary, and ${accent.length} accent colors.`

	// Marketing description
	const marketing = `This brand palette embodies a ${characteristics.style} identity with ${characteristics.temperature} undertones. The ${characteristics.saturation} color scheme creates a ${characteristics.brightness} visual presence that ${characteristics.style === 'energetic' ? 'energizes and motivates' : characteristics.style === 'corporate' ? 'conveys professionalism and trust' : characteristics.style === 'minimalistic' ? 'speaks with clarity and simplicity' : 'engages and delights'} audiences. The ${harmony.type !== 'none' ? harmony.type : 'carefully balanced'} color harmony ensures visual coherence while maintaining ${harmony.contrastLevel} contrast for optimal readability and impact.`

	// Technical description
	const technical = `Technical Palette Analysis:
- Color Count: ${colors.length} (${primary.length} primary, ${secondary.length} secondary, ${accent.length} accent, ${neutral.length} neutral)
- Temperature: ${characteristics.temperature}
- Brightness: ${characteristics.brightness}
- Saturation: ${characteristics.saturation}
- Style: ${characteristics.style}
- Harmony: ${harmony.type !== 'none' ? harmony.type : 'custom arrangement'}
- Contrast Level: ${harmony.contrastLevel}
${harmony.hasConflict ? '- Warning: Potential color conflicts detected' : ''}
- Tags: ${characteristics.tags.join(', ') || 'none'}`

	// Recommendations
	const recommendations: string[] = []
	// Note: WCAG check would need contrast analysis integration
	if (harmony.hasConflict) {
		recommendations.push('Resolve color conflicts by adjusting hue, saturation, or lightness values')
	}
	if (harmony.contrastLevel === 'low') {
		recommendations.push('Increase contrast between primary colors for better visual hierarchy')
	}
	if (characteristics.saturation === 'muted' && characteristics.style === 'energetic') {
		recommendations.push('Consider increasing saturation to better match the energetic style')
	}
	if (colors.length > 5) {
		recommendations.push('Consider reducing color count for a more focused brand identity')
	}
	if (recommendations.length === 0) {
		recommendations.push('Palette is well-balanced and ready for brand implementation')
	}

	return {
		short,
		marketing,
		technical,
		recommendations: recommendations.join('\n'),
	}
}

