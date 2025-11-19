import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

/**
 * Generate metadata for the tools page
 * 
 * Creates comprehensive SEO metadata including:
 * - Title and description
 * - Keywords
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL and hreflang alternates
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'tools' })
	const baseUrl = 'https://pipetkaonline.ru'

	return {
		title: t('title'),
		description: t('description'),
		keywords: 'color tools, palette generator, color converter, contrast checker, color harmony, gradient generator, color picker, design tools, web design, color theory',
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `${baseUrl}/${locale}/tools`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/og-tools.jpg`,
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
			locale: locale,
			alternateLocale: ['ru', 'en', 'de', 'es'].filter(l => l !== locale),
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: [`${baseUrl}/og-tools.jpg`],
		},
		alternates: {
			canonical: `${baseUrl}/${locale}/tools`,
			languages: {
				ru: `${baseUrl}/ru/tools`,
				en: `${baseUrl}/en/tools`,
				de: `${baseUrl}/de/tools`,
				es: `${baseUrl}/es/tools`,
				'x-default': `${baseUrl}/ru/tools`,
			},
		},
	}
}

/**
 * Tools page component
 * Displays available color tools and utilities
 */
export default async function ToolsPage({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale: params.locale, namespace: 'tools' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${params.locale}/tools`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [
				{
					'@type': 'SoftwareApplication',
					name: t('tools.picker.title'),
					description: t('tools.picker.desc'),
					applicationCategory: 'DesignApplication',
					operatingSystem: 'Web',
				},
				{
					'@type': 'SoftwareApplication',
					name: t('tools.palette.title'),
					description: t('tools.palette.desc'),
					applicationCategory: 'DesignApplication',
					operatingSystem: 'Web',
				},
			],
		},
	}

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<div className='space-y-8'>
			{/* Page header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Tools grid */}
			<div className='grid md:grid-cols-2 gap-6'>
				<ToolCard
					icon='🎨'
					title={t('tools.picker.title')}
					description={t('tools.picker.desc')}
					href={`/${params.locale}/tools/color-lab`}
					t={t}
				/>
				<ToolCard
					icon='🌈'
					title={t('tools.palette.title')}
					description={t('tools.palette.desc')}
					href={`/${params.locale}/tools/palette-generator`}
					t={t}
				/>
					<ToolCard
						icon='🎯'
						title={t('tools.contrast.title')}
						description={t('tools.contrast.desc')}
						href={`/${params.locale}/tools/contrast-checker`}
						t={t}
					/>
				<ToolCard
					icon='🔄'
					title={t('tools.converter.title')}
					description={t('tools.converter.desc')}
					href={`/${params.locale}/tools/color-converter`}
					t={t}
				/>
				<ToolCard
					icon='💡'
					title={t('tools.harmony.title')}
					description={t('tools.harmony.desc')}
					href={`/${params.locale}/tools/color-harmony`}
					t={t}
				/>
				<ToolCard
					icon='🎭'
					title={t('tools.gradient.title')}
					description={t('tools.gradient.desc')}
					href={`/${params.locale}/tools/gradient-generator`}
					t={t}
				/>
				<ToolCard
					icon='🎨'
					title={t('tools.uiTokensGenerator.title')}
					description={t('tools.uiTokensGenerator.desc')}
					href={`/${params.locale}/tools/ui-tokens-generator`}
					t={t}
				/>
				<ToolCard
					icon='🔬'
					title={t('tools.extractColorsV2.title')}
					description={t('tools.extractColorsV2.desc')}
					href={`/${params.locale}/tools/extract-colors-v2`}
					t={t}
				/>
				<ToolCard
					icon='🏷️'
					title={t('tools.colorNameFinder.title')}
					description={t('tools.colorNameFinder.desc')}
					href={`/${params.locale}/tools/color-name-finder`}
					t={t}
				/>
				<ToolCard
					icon='🎯'
					title={t('tools.brandColorAnalyzer.title')}
					description={t('tools.brandColorAnalyzer.desc')}
					href={`/${params.locale}/tools/brand-color-analyzer`}
					t={t}
				/>
				<ToolCard
					icon='🎨'
					title={t('tools.uiThemeGenerator.title')}
					description={t('tools.uiThemeGenerator.desc')}
					href={`/${params.locale}/tools/ui-theme-generator`}
					t={t}
				/>
				<ToolCard
					icon='📝'
					title={t('tools.textImageAccessibility.title')}
					description={t('tools.textImageAccessibility.desc')}
					href={`/${params.locale}/tools/text-image-accessibility`}
					t={t}
				/>
				<ToolCard
					icon='🌈'
					title={t('tools.gradientMapGenerator.title')}
					description={t('tools.gradientMapGenerator.desc')}
					href={`/${params.locale}/tools/gradient-map-generator`}
					t={t}
				/>
				<ToolCard
					icon='💭'
					title={t('tools.emotionColors.title')}
					description={t('tools.emotionColors.desc')}
					href={`/${params.locale}/tools/emotion-colors`}
					t={t}
				/>
				<ToolCard
					icon='🎨'
					title={t('tools.solidBackground.title')}
					description={t('tools.solidBackground.desc')}
					href={`/${params.locale}/tools/solid-background`}
					t={t}
				/>
				<ToolCard
					icon='🔷'
					title={t('tools.patternGenerator.title')}
					description={t('tools.patternGenerator.desc')}
					href={`/${params.locale}/tools/pattern-generator`}
					t={t}
				/>
				<ToolCard
					icon='👁️'
					title={t('colorBlindnessSimulator.title')}
					description={t('colorBlindnessSimulator.description')}
					href={`/${params.locale}/tools/color-blindness-simulator`}
					t={t}
				/>
			</div>
		</div>
		</>
	)
}

/**
 * Tool card component
 * Displays a single tool with status indicator
 */
function ToolCard({
	icon,
	title,
	description,
	status,
	href,
	t,
}: {
	icon: string
	title: string
	description: string
	status?: 'available' | 'coming-soon'
	href?: string
	t: any
}) {
	const content = (
		<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden'>
			{/* Status badge */}
			{status === 'coming-soon' && (
				<div className='absolute top-4 right-4 bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full'>
					{t('comingSoon')}
				</div>
			)}

			<div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>
				{icon}
			</div>
			<h3 className='text-xl font-semibold text-slate-900 mb-2'>{title}</h3>
			<p className='text-slate-600'>{description}</p>

			{/* Hover effect overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />
		</div>
	)

	if (href) {
		return (
			<Link href={href} className='block'>
				{content}
			</Link>
		)
	}

	return content
}



