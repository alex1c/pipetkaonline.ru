/**
 * Home Page Component
 * 
 * The main landing page of the application. Displays:
 * - Hero section with site title and description
 * - Call-to-action cards for main features
 * - Features grid showcasing key capabilities
 * 
 * This is a Server Component that uses translations for all text content.
 * Metadata is generated dynamically based on the current locale.
 * 
 * @module app/[locale]/page
 */

import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Generate Metadata for Home Page
 * 
 * Creates dynamic metadata (title, description, keywords, Open Graph) based on the current locale.
 * This metadata is used for:
 * - Browser tab title
 * - Search engine results (SEO)
 * - Social media sharing previews
 * 
 * The function is async because it needs to fetch translations from the server.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Metadata object with title, description, keywords, and Open Graph
 * 
 * @example
 * For locale 'ru':
 * - title: "PipetkaOnline — Онлайн-инструменты для работы с цветом"
 * - description: "Определи цвет, создай палитру и узнай всё о цветовых сочетаниях."
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	// Get translations from 'home' namespace for the current locale
	const t = await getTranslations({ locale, namespace: 'home' })
	const baseUrl = 'https://pipetkaonline.ru'

	return {
		title: t('title'),
		description: t('subtitle'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('subtitle'),
			type: 'website',
			url: `${baseUrl}/${locale}`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/og-image.jpg`,
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('subtitle'),
			images: [`${baseUrl}/og-image.jpg`],
		},
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				ru: `${baseUrl}/ru`,
				en: `${baseUrl}/en`,
				de: `${baseUrl}/de`,
				es: `${baseUrl}/es`,
			},
		},
	}
}

/**
 * Home Page Component
 * 
 * Main landing page that introduces the application and its features.
 * 
 * Structure:
 * 1. Hero Section - Large title and subtitle
 * 2. CTA Cards - Three main action cards (Detect, Palette, Learn)
 * 3. Features Section - Grid of key features with icons
 * 
 * All text content is internationalized using the 'home' translation namespace.
 * 
 * @returns {JSX.Element} Home page with hero, CTAs, and features
 */
export default async function HomePage({
	params,
}: {
	params: { locale: string }
}) {
	// Get translations for 'home' namespace
	const t = await getTranslations({ locale: params.locale, namespace: 'home' })
	const tTools = await getTranslations({ locale: params.locale, namespace: 'tools' })

	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'PipetkaOnline',
		description: t('subtitle'),
		applicationCategory: 'DesignApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '150',
		},
	}

	// Popular tools to showcase on homepage
	const popularTools = [
		{
			icon: '🎨',
			title: tTools('tools.picker.title'),
			description: tTools('tools.picker.desc'),
			href: `/${params.locale}/tools/color-lab`,
		},
		{
			icon: '🌈',
			title: tTools('tools.palette.title'),
			description: tTools('tools.palette.desc'),
			href: `/${params.locale}/tools/palette-generator`,
		},
		{
			icon: '🎯',
			title: tTools('tools.contrast.title'),
			description: tTools('tools.contrast.desc'),
			href: `/${params.locale}/tools/contrast-checker`,
		},
		{
			icon: '🔄',
			title: tTools('tools.converter.title'),
			description: tTools('tools.converter.desc'),
			href: `/${params.locale}/tools/color-converter`,
		},
		{
			icon: '🎨',
			title: tTools('tools.uiTokensGenerator.title'),
			description: tTools('tools.uiTokensGenerator.desc'),
			href: `/${params.locale}/tools/ui-tokens-generator`,
		},
		{
			icon: '🔬',
			title: tTools('tools.extractColorsV2.title'),
			description: tTools('tools.extractColorsV2.desc'),
			href: `/${params.locale}/tools/extract-colors-v2`,
		},
		{
			icon: '🎨',
			title: tTools('tools.uiThemeGenerator.title'),
			description: tTools('tools.uiThemeGenerator.desc'),
			href: `/${params.locale}/tools/ui-theme-generator`,
		},
		{
			icon: '🔷',
			title: tTools('tools.patternGenerator.title'),
			description: tTools('tools.patternGenerator.desc'),
			href: `/${params.locale}/tools/pattern-generator`,
		},
	]

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<div className='space-y-16'>
				{/* Hero section */}
				<section className='text-center space-y-6 pt-8'>
					<div className='inline-block mb-4'>
						<div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg'>
							{t('hero.badge')}
						</div>
					</div>
					<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight'>
						{t('title')}
					</h1>
					<p className='text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light'>
						{t('subtitle')}
					</p>
					<div className='flex flex-wrap justify-center gap-4 pt-4'>
						<Link
							href={`/${params.locale}/tools`}
							className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
						>
							{t('hero.cta')}
						</Link>
						<Link
							href={`/${params.locale}/learn`}
							className='px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-md hover:shadow-lg'
						>
							{t('hero.learn')}
						</Link>
					</div>
				</section>

				{/* Call to action cards */}
				<section className='grid md:grid-cols-3 gap-6'>
					<CTACard
						title={t('cta.detect')}
						description={t('cta.detectDesc')}
						icon='🎨'
						href={`/${params.locale}/tools/color-lab`}
					/>
					<CTACard
						title={t('cta.palette')}
						description={t('cta.paletteDesc')}
						icon='🌈'
						href={`/${params.locale}/tools/palette-generator`}
					/>
					<CTACard
						title={t('cta.learn')}
						description={t('cta.learnDesc')}
						icon='📚'
						href={`/${params.locale}/learn`}
					/>
				</section>

				{/* Popular Tools Section */}
				<section className='bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8'>
					<div className='text-center space-y-3'>
						<h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
							{t('tools.title')}
						</h2>
						<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
							{t('tools.description')}
						</p>
					</div>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{popularTools.map((tool, index) => (
							<ToolCard
								key={index}
								icon={tool.icon}
								title={tool.title}
								description={tool.description}
								href={tool.href}
							/>
						))}
					</div>
					<div className='text-center pt-4'>
						<Link
							href={`/${params.locale}/tools`}
							className='inline-block px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors'
						>
							{t('tools.viewAll')} →
						</Link>
					</div>
				</section>

				{/* Features section */}
				<section className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 space-y-8'>
					<div className='text-center space-y-3'>
						<h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
							{t('features.title')}
						</h2>
						<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
							{t('features.subtitle')}
						</p>
					</div>
					<div className='grid md:grid-cols-2 gap-8'>
						<FeatureItem
							icon='✨'
							title={t('features.detection.title')}
							description={t('features.detection.desc')}
						/>
						<FeatureItem
							icon='🎯'
							title={t('features.contrast.title')}
							description={t('features.contrast.desc')}
						/>
						<FeatureItem
							icon='🔄'
							title={t('features.conversion.title')}
							description={t('features.conversion.desc')}
						/>
						<FeatureItem
							icon='💡'
							title={t('features.harmony.title')}
							description={t('features.harmony.desc')}
						/>
					</div>
				</section>

				{/* Stats Section */}
				<section className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
					<div className='grid md:grid-cols-3 gap-8 text-center'>
						<div>
							<div className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
								{t('stats.tools')}
							</div>
							<div className='text-slate-600 font-medium'>{t('stats.toolsLabel')}</div>
						</div>
						<div>
							<div className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
								{t('stats.formats')}
							</div>
							<div className='text-slate-600 font-medium'>{t('stats.formatsLabel')}</div>
						</div>
						<div>
							<div className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
								{t('stats.languages')}
							</div>
							<div className='text-slate-600 font-medium'>{t('stats.languagesLabel')}</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

/**
 * Call-to-Action Card Component
 * 
 * Displays a feature card with icon, title, and description.
 * Used in the main CTA section to highlight key features.
 * 
 * Features:
 * - Hover effects (shadow increase, icon scale)
 * - Group hover for coordinated animations
 * - Responsive design
 * - Accessible structure
 * - Gradient accents
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title text
 * @param {string} props.description - Card description text
 * @param {string} props.icon - Emoji or icon to display
 * @param {string} props.href - Optional link URL
 * 
 * @returns {JSX.Element} Styled CTA card with hover effects
 */
function CTACard({
	title,
	description,
	icon,
	href,
}: {
	title: string
	description: string
	icon: string
	href?: string
}) {
	const content = (
		<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-200 relative overflow-hidden'>
			{/* Gradient overlay on hover */}
			<div className='absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300' />
			
			{/* Icon with scale animation on hover */}
			<div className='text-4xl mb-4 group-hover:scale-110 transition-transform relative z-10'>
				{icon}
			</div>
			<h3 className='text-lg font-semibold text-slate-900 mb-2 relative z-10'>{title}</h3>
			<p className='text-slate-600 text-sm relative z-10'>{description}</p>
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

/**
 * Tool Card Component
 * 
 * Displays a tool card for the popular tools section.
 * 
 * @param {Object} props - Component props
 * @param {string} props.icon - Emoji or icon
 * @param {string} props.title - Tool title
 * @param {string} props.description - Tool description
 * @param {string} props.href - Tool URL
 * 
 * @returns {JSX.Element} Tool card component
 */
function ToolCard({
	icon,
	title,
	description,
	href,
}: {
	icon: string
	title: string
	description: string
	href: string
}) {
	return (
		<Link href={href} className='block'>
			<div className='bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-300 group h-full'>
				<div className='text-3xl mb-3 group-hover:scale-110 transition-transform'>
					{icon}
				</div>
				<h3 className='font-semibold text-slate-900 mb-2 text-sm'>{title}</h3>
				<p className='text-slate-600 text-xs leading-relaxed'>{description}</p>
			</div>
		</Link>
	)
}

/**
 * Feature Item Component
 * 
 * Displays a single feature in the features grid section.
 * Shows an icon alongside title and description in a horizontal layout.
 * 
 * Used to showcase key application features like:
 * - Color detection
 * - Contrast checking
 * - Color conversion
 * - Color harmony
 * 
 * @param {Object} props - Component props
 * @param {string} props.icon - Emoji or icon to display
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * 
 * @returns {JSX.Element} Feature item with icon and text
 */
function FeatureItem({
	icon,
	title,
	description,
}: {
	icon: string
	title: string
	description: string
}) {
	return (
		<div className='flex gap-4'>
			{/* Icon column */}
			<div className='text-2xl'>{icon}</div>
			{/* Text column */}
			<div>
				<h4 className='font-semibold text-slate-900 mb-1'>{title}</h4>
				<p className='text-slate-600 text-sm'>{description}</p>
			</div>
		</div>
	)
}



