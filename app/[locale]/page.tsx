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

/**
 * Generate Metadata for Home Page
 * 
 * Creates dynamic metadata (title, description) based on the current locale.
 * This metadata is used for:
 * - Browser tab title
 * - Search engine results (SEO)
 * - Social media sharing previews
 * 
 * The function is async because it needs to fetch translations from the server.
 * 
 * @param {Object} params - Route parameters
 * @param {string} params.locale - Current locale code
 * @returns {Promise<Metadata>} Metadata object with title and description
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

	return {
		title: t('title'),
		description: t('subtitle'),
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
export default function HomePage() {
	// Get translations for 'home' namespace
	// This hook works in Server Components in Next.js 14+
	const t = useTranslations('home')

	return (
		<div className='space-y-12'>
			{/* Hero section */}
			<section className='text-center space-y-6 pt-12'>
				<h1 className='text-4xl md:text-5xl font-bold text-slate-900 leading-tight'>
					{t('title')}
				</h1>
				<p className='text-xl text-slate-600 max-w-2xl mx-auto'>
					{t('subtitle')}
				</p>
			</section>

			{/* Call to action buttons */}
			<section className='grid md:grid-cols-3 gap-6 pt-8'>
				<CTACard
					title={t('cta.detect')}
					description={t('cta.detectDesc')}
					icon='🎨'
				/>
				<CTACard
					title={t('cta.palette')}
					description={t('cta.paletteDesc')}
					icon='🌈'
				/>
				<CTACard
					title={t('cta.learn')}
					description={t('cta.learnDesc')}
					icon='📚'
				/>
			</section>

			{/* Features section */}
			<section className='bg-white rounded-xl shadow-md p-8 space-y-6'>
				<h2 className='text-2xl font-bold text-slate-900'>
					{t('features.title')}
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
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
		</div>
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
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title text
 * @param {string} props.description - Card description text
 * @param {string} props.icon - Emoji or icon to display
 * 
 * @returns {JSX.Element} Styled CTA card with hover effects
 */
function CTACard({
	title,
	description,
	icon,
}: {
	title: string
	description: string
	icon: string
}) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
			{/* Icon with scale animation on hover */}
			<div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>
				{icon}
			</div>
			<h3 className='text-lg font-semibold text-slate-900 mb-2'>{title}</h3>
			<p className='text-slate-600 text-sm'>{description}</p>
		</div>
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



