import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the home page
 * Uses translations for dynamic title and description
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'home' })

	return {
		title: t('title'),
		description: t('subtitle'),
	}
}

/**
 * Home page component
 * Displays welcome message and call-to-action buttons
 */
export default function HomePage() {
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
 * Call-to-action card component
 * Displays a feature with icon, title, and description
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
			<div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>
				{icon}
			</div>
			<h3 className='text-lg font-semibold text-slate-900 mb-2'>{title}</h3>
			<p className='text-slate-600 text-sm'>{description}</p>
		</div>
	)
}

/**
 * Feature item component
 * Displays a single feature in a list
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
			<div className='text-2xl'>{icon}</div>
			<div>
				<h4 className='font-semibold text-slate-900 mb-1'>{title}</h4>
				<p className='text-slate-600 text-sm'>{description}</p>
			</div>
		</div>
	)
}



