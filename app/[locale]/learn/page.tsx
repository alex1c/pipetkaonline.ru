import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

/**
 * Generate metadata for the learn page
 * 
 * Creates comprehensive SEO metadata including:
 * - Title and description
 * - Keywords
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URL and hreflang alternates
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}): Promise<Metadata> {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn' })
	const baseUrl = 'https://pipetkaonline.ru'

	return {
		title: t('title'),
		description: t('description'),
		keywords: 'color theory, color harmony, color psychology, color accessibility, color formats, RGB, HEX, HSL, color wheel, design education, web design tutorial',
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `${baseUrl}/${locale}/learn`,
			siteName: 'PipetkaOnline',
			images: [
				{
					url: `${baseUrl}/og-learn.jpg`,
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
			images: [`${baseUrl}/og-learn.jpg`],
		},
		alternates: {
			canonical: `${baseUrl}/${locale}/learn`,
			languages: {
				ru: `${baseUrl}/ru/learn`,
				en: `${baseUrl}/en/learn`,
				de: `${baseUrl}/de/learn`,
				es: `${baseUrl}/es/learn`,
				'x-default': `${baseUrl}/ru/learn`,
			},
		},
	}
}

/**
 * Learn page component
 * Educational content about color theory and design
 */
export default async function LearnPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn' })
	const baseUrl = 'https://pipetkaonline.ru'

	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: t('title'),
		description: t('description'),
		url: `${baseUrl}/${locale}/learn`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [
				{
					'@type': 'Article',
					name: t('topics.fundamentals.title'),
					description: t('topics.fundamentals.desc'),
				},
				{
					'@type': 'Article',
					name: t('topics.harmony.title'),
					description: t('topics.harmony.desc'),
				},
				{
					'@type': 'Article',
					name: t('topics.psychology.title'),
					description: t('topics.psychology.desc'),
				},
				{
					'@type': 'Article',
					name: t('topics.accessibility.title'),
					description: t('topics.accessibility.desc'),
				},
				{
					'@type': 'Article',
					name: t('topics.formats.title'),
					description: t('topics.formats.desc'),
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

			{/* Learning topics */}
			<div className='space-y-6'>
				<TopicCard
					icon='🎨'
					title={t('topics.fundamentals.title')}
					description={t('topics.fundamentals.desc')}
					topics={[
						{ label: t('topics.fundamentals.items.0'), href: `/${locale}/learn/fundamentals/rgb-cmyk` },
						{ label: t('topics.fundamentals.items.1'), href: `/${locale}/learn/fundamentals/color-wheel` },
						{ label: t('topics.fundamentals.items.2'), href: `/${locale}/learn/fundamentals/warm-cool-colors` },
						{ label: t('topics.fundamentals.items.3'), href: `/${locale}/learn/fundamentals/saturation-brightness` },
					]}
				/>

				<TopicCard
					icon='🌈'
					title={t('topics.harmony.title')}
					description={t('topics.harmony.desc')}
					topics={[
						{ label: t('topics.harmony.items.0'), href: `/${locale}/learn/harmony/complementary` },
						{ label: t('topics.harmony.items.1'), href: `/${locale}/learn/harmony/analogous` },
						{ label: t('topics.harmony.items.2'), href: `/${locale}/learn/harmony/triadic` },
						{ label: t('topics.harmony.items.3'), href: `/${locale}/learn/harmony/split-complementary` },
					]}
				/>

				<TopicCard
					icon='🧠'
					title={t('topics.psychology.title')}
					description={t('topics.psychology.desc')}
					topics={[
						{ label: t('topics.psychology.items.0'), href: `/${locale}/learn/psychology/cultural` },
						{ label: t('topics.psychology.items.1'), href: `/${locale}/learn/psychology/emotions` },
						{ label: t('topics.psychology.items.2'), href: `/${locale}/learn/psychology/branding` },
						{ label: t('topics.psychology.items.3'), href: `/${locale}/learn/psychology/marketing` },
					]}
				/>

				<TopicCard
					icon='♿'
					title={t('topics.accessibility.title')}
					description={t('topics.accessibility.desc')}
					topics={[
						{ label: t('topics.accessibility.items.0'), href: `/${locale}/learn/accessibility/wcag` },
						{ label: t('topics.accessibility.items.1'), href: `/${locale}/learn/accessibility/color-blindness` },
						{ label: t('topics.accessibility.items.2'), href: `/${locale}/learn/accessibility/readability` },
						{ label: t('topics.accessibility.items.3'), href: `/${locale}/learn/accessibility/alternatives` },
					]}
				/>

				<TopicCard
					icon='💻'
					title={t('topics.formats.title')}
					description={t('topics.formats.desc')}
					topics={[
						{ label: t('topics.formats.items.0'), href: `/${locale}/learn/formats/hex` },
						{ label: t('topics.formats.items.1'), href: `/${locale}/learn/formats/rgb` },
						{ label: t('topics.formats.items.2'), href: `/${locale}/learn/formats/hsl` },
						{ label: t('topics.formats.items.3'), href: `/${locale}/learn/formats/css` },
					]}
				/>
			</div>
		</div>
		</>
	)
}

/**
 * Topic card component
 * Displays a learning topic with subtopics
 */
function TopicCard({
	icon,
	title,
	description,
	topics,
}: {
	icon: string
	title: string
	description: string
	topics: Array<{ label: string; href: string }>
}) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
			<div className='flex items-start gap-4'>
				<div className='text-4xl'>{icon}</div>
				<div className='flex-1'>
					<h3 className='text-xl font-semibold text-slate-900 mb-2'>{title}</h3>
					<p className='text-slate-600 mb-4'>{description}</p>
					<ul className='space-y-2'>
						{topics.map((topic, index) => (
							<li key={index}>
								<Link
									href={topic.href}
									className='flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group'
								>
									<span className='text-slate-400 group-hover:text-slate-600'>•</span>
									<span className='group-hover:underline'>{topic.label}</span>
									<span className='text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity'>
										→
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}



