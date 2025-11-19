/**
 * Similar Tools Component
 * 
 * Displays related/similar tools with links to other tool pages.
 * Used on each tool page to help users discover related functionality.
 * 
 * @component
 */

'use client'

import { memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Tool information structure
 */
interface ToolInfo {
	slug: string
	icon: string
	titleKey: string
}

/**
 * Similar tools mapping
 * Each tool has 3 related tools
 */
const similarToolsMap: Record<string, ToolInfo[]> = {
	'color-lab': [
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'extractColorsV2.title' },
		{ slug: 'color-name-finder', icon: '🏷️', titleKey: 'colorNameFinder.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'converter.title' },
	],
	'palette-generator': [
		{ slug: 'color-harmony', icon: '💡', titleKey: 'harmony.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
		{ slug: 'emotion-colors', icon: '💭', titleKey: 'emotionColors.title' },
	],
	'contrast-checker': [
		{ slug: 'text-image-accessibility', icon: '📝', titleKey: 'textImageAccessibility.title' },
		{ slug: 'color-blindness-simulator', icon: '👁️', titleKey: 'colorBlindnessSimulator.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'converter.title' },
	],
	'color-converter': [
		{ slug: 'color-name-finder', icon: '🏷️', titleKey: 'colorNameFinder.title' },
		{ slug: 'color-lab', icon: '🎨', titleKey: 'picker.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'harmony.title' },
	],
	'color-harmony': [
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
		{ slug: 'emotion-colors', icon: '💭', titleKey: 'emotionColors.title' },
	],
	'gradient-generator': [
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'gradientMapGenerator.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'harmony.title' },
	],
	'ui-tokens-generator': [
		{ slug: 'ui-theme-generator', icon: '🎨', titleKey: 'uiThemeGenerator.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
	],
	'extract-colors-v2': [
		{ slug: 'color-lab', icon: '🎨', titleKey: 'picker.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
	],
	'color-name-finder': [
		{ slug: 'color-converter', icon: '🔄', titleKey: 'converter.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'harmony.title' },
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'extractColorsV2.title' },
	],
	'brand-color-analyzer': [
		{ slug: 'ui-theme-generator', icon: '🎨', titleKey: 'uiThemeGenerator.title' },
		{ slug: 'ui-tokens-generator', icon: '🎨', titleKey: 'uiTokensGenerator.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
	],
	'ui-theme-generator': [
		{ slug: 'ui-tokens-generator', icon: '🎨', titleKey: 'uiTokensGenerator.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
	],
	'text-image-accessibility': [
		{ slug: 'contrast-checker', icon: '🎯', titleKey: 'contrast.title' },
		{ slug: 'color-blindness-simulator', icon: '👁️', titleKey: 'colorBlindnessSimulator.title' },
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'extractColorsV2.title' },
	],
	'gradient-map-generator': [
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'gradient.title' },
		{ slug: 'pattern-generator', icon: '🔷', titleKey: 'patternGenerator.title' },
		{ slug: 'solid-background', icon: '🎨', titleKey: 'solidBackground.title' },
	],
	'emotion-colors': [
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'palette.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'harmony.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'brandColorAnalyzer.title' },
	],
	'solid-background': [
		{ slug: 'pattern-generator', icon: '🔷', titleKey: 'patternGenerator.title' },
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'gradient.title' },
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'gradientMapGenerator.title' },
	],
	'pattern-generator': [
		{ slug: 'solid-background', icon: '🎨', titleKey: 'solidBackground.title' },
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'gradientMapGenerator.title' },
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'gradient.title' },
	],
	'color-blindness-simulator': [
		{ slug: 'contrast-checker', icon: '🎯', titleKey: 'contrast.title' },
		{ slug: 'text-image-accessibility', icon: '📝', titleKey: 'textImageAccessibility.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'converter.title' },
	],
}

interface SimilarToolsProps {
	/** Current tool slug */
	currentTool: string
}

/**
 * Similar Tools Component
 * 
 * Displays 3 related tools with icons and links.
 * 
 * @param {SimilarToolsProps} props - Component props
 * @returns {JSX.Element} Similar tools section
 */
export const SimilarTools = memo(function SimilarTools({ currentTool }: SimilarToolsProps) {
	const t = useTranslations('tools')
	const params = useParams()
	const locale = params.locale as string

	const similarTools = useMemo(() => similarToolsMap[currentTool], [currentTool])

	/**
	 * Get translation for tool title
	 * All tools use the 'tools' namespace
	 * Uses translation function directly to ensure server/client consistency
	 */
	const getToolTitle = useCallback(
		(titleKey: string): string => {
			try {
				// Use translation function directly - it handles the 'tools' namespace correctly
				return t(titleKey)
			} catch (error) {
				// Fallback to key if translation fails
				return titleKey
			}
		},
		[t]
	)

	// Early return after all hooks
	if (!similarTools || similarTools.length === 0) {
		return null
	}

	return (
		<section className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 space-y-6'>
			<div className='text-center space-y-2'>
				<h2 className='text-2xl md:text-3xl font-bold text-slate-900'>
					{t('similarTools.title')}
				</h2>
				<p className='text-slate-600'>{t('similarTools.description')}</p>
			</div>

			<div className='grid md:grid-cols-3 gap-6'>
				{similarTools.map((tool) => (
					<Link
						key={tool.slug}
						href={`/${locale}/tools/${tool.slug}`}
						className='block group'
					>
						<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 h-full'>
							<div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>
								{tool.icon}
							</div>
							<h3 className='text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors'>
								{getToolTitle(tool.titleKey)}
							</h3>
							<div className='text-sm text-blue-600 font-medium group-hover:underline'>
								{t('similarTools.viewTool')} →
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
})

