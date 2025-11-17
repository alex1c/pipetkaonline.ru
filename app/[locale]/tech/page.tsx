import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the tech page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'tech' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Tech page component
 * Technical and administrative content area
 */
export default function TechPage() {
	const t = useTranslations('tech')

	return (
		<div className='space-y-8'>
			{/* Page header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Technical sections */}
			<div className='grid md:grid-cols-2 gap-6'>
				<TechSection
					icon='📊'
					title='Analytics & Metrics'
					description='Site performance and user analytics data'
				/>
				<TechSection
					icon='💰'
					title='AdSense Integration'
					description='Advertising and monetization information'
				/>
				<TechSection
					icon='🔧'
					title='API Documentation'
					description='Technical API references and guides'
				/>
				<TechSection
					icon='🌐'
					title='SEO & Meta'
					description='Search engine optimization content'
				/>
			</div>

			{/* Additional info */}
			<div className='bg-slate-100 rounded-xl p-8 text-center'>
				<p className='text-slate-600'>
					This section is reserved for technical content, administrative tools,
					and third-party integrations.
				</p>
			</div>
		</div>
	)
}

/**
 * Tech section component
 * Displays a technical content area
 */
function TechSection({
	icon,
	title,
	description,
}: {
	icon: string
	title: string
	description: string
}) {
	return (
		<div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
			<div className='text-4xl mb-4'>{icon}</div>
			<h3 className='text-xl font-semibold text-slate-900 mb-2'>{title}</h3>
			<p className='text-slate-600'>{description}</p>
		</div>
	)
}



