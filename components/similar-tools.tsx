/**
 * Similar Tools Component
 * 
 * Displays related/similar tools with links to other tool pages.
 * Used on each tool page to help users discover related functionality.
 * 
 * @component
 */

'use client'

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
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'tools.extractColorsV2.title' },
		{ slug: 'color-name-finder', icon: '🏷️', titleKey: 'tools.colorNameFinder.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'tools.converter.title' },
	],
	'palette-generator': [
		{ slug: 'color-harmony', icon: '💡', titleKey: 'tools.harmony.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
		{ slug: 'emotion-colors', icon: '💭', titleKey: 'tools.emotionColors.title' },
	],
	'contrast-checker': [
		{ slug: 'text-image-accessibility', icon: '📝', titleKey: 'tools.textImageAccessibility.title' },
		{ slug: 'color-blindness-simulator', icon: '👁️', titleKey: 'colorBlindnessSimulator.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'tools.converter.title' },
	],
	'color-converter': [
		{ slug: 'color-name-finder', icon: '🏷️', titleKey: 'tools.colorNameFinder.title' },
		{ slug: 'color-lab', icon: '🎨', titleKey: 'tools.picker.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'tools.harmony.title' },
	],
	'color-harmony': [
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
		{ slug: 'emotion-colors', icon: '💭', titleKey: 'tools.emotionColors.title' },
	],
	'gradient-generator': [
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'tools.gradientMapGenerator.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'tools.harmony.title' },
	],
	'ui-tokens-generator': [
		{ slug: 'ui-theme-generator', icon: '🎨', titleKey: 'tools.uiThemeGenerator.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
	],
	'extract-colors-v2': [
		{ slug: 'color-lab', icon: '🎨', titleKey: 'tools.picker.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
	],
	'color-name-finder': [
		{ slug: 'color-converter', icon: '🔄', titleKey: 'tools.converter.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'tools.harmony.title' },
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'tools.extractColorsV2.title' },
	],
	'brand-color-analyzer': [
		{ slug: 'ui-theme-generator', icon: '🎨', titleKey: 'tools.uiThemeGenerator.title' },
		{ slug: 'ui-tokens-generator', icon: '🎨', titleKey: 'tools.uiTokensGenerator.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
	],
	'ui-theme-generator': [
		{ slug: 'ui-tokens-generator', icon: '🎨', titleKey: 'tools.uiTokensGenerator.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
	],
	'text-image-accessibility': [
		{ slug: 'contrast-checker', icon: '🎯', titleKey: 'tools.contrast.title' },
		{ slug: 'color-blindness-simulator', icon: '👁️', titleKey: 'colorBlindnessSimulator.title' },
		{ slug: 'extract-colors-v2', icon: '🔬', titleKey: 'tools.extractColorsV2.title' },
	],
	'gradient-map-generator': [
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'tools.gradient.title' },
		{ slug: 'pattern-generator', icon: '🔷', titleKey: 'tools.patternGenerator.title' },
		{ slug: 'solid-background', icon: '🎨', titleKey: 'tools.solidBackground.title' },
	],
	'emotion-colors': [
		{ slug: 'palette-generator', icon: '🌈', titleKey: 'tools.palette.title' },
		{ slug: 'color-harmony', icon: '💡', titleKey: 'tools.harmony.title' },
		{ slug: 'brand-color-analyzer', icon: '🎯', titleKey: 'tools.brandColorAnalyzer.title' },
	],
	'solid-background': [
		{ slug: 'pattern-generator', icon: '🔷', titleKey: 'tools.patternGenerator.title' },
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'tools.gradient.title' },
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'tools.gradientMapGenerator.title' },
	],
	'pattern-generator': [
		{ slug: 'solid-background', icon: '🎨', titleKey: 'tools.solidBackground.title' },
		{ slug: 'gradient-map-generator', icon: '🌈', titleKey: 'tools.gradientMapGenerator.title' },
		{ slug: 'gradient-generator', icon: '🎭', titleKey: 'tools.gradient.title' },
	],
	'color-blindness-simulator': [
		{ slug: 'contrast-checker', icon: '🎯', titleKey: 'tools.contrast.title' },
		{ slug: 'text-image-accessibility', icon: '📝', titleKey: 'tools.textImageAccessibility.title' },
		{ slug: 'color-converter', icon: '🔄', titleKey: 'tools.converter.title' },
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
export function SimilarTools({ currentTool }: SimilarToolsProps) {
	const t = useTranslations('tools')
	const tColorBlindness = useTranslations('colorBlindnessSimulator')
	const params = useParams()
	const locale = params.locale as string

	const similarTools = similarToolsMap[currentTool]

	if (!similarTools || similarTools.length === 0) {
		return null
	}

	/**
	 * Get translation for tool title
	 * Handles different namespaces for different tools
	 */
	const getToolTitle = (titleKey: string): string => {
		if (titleKey.startsWith('colorBlindnessSimulator.')) {
			return tColorBlindness(titleKey.replace('colorBlindnessSimulator.', ''))
		}
		return t(titleKey)
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
}

