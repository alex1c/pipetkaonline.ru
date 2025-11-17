import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the tools page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'tools' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Tools page component
 * Displays available color tools and utilities
 */
export default function ToolsPage() {
	const t = useTranslations('tools')

	return (
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
					status='coming-soon'
					t={t}
				/>
				<ToolCard
					icon='🌈'
					title={t('tools.palette.title')}
					description={t('tools.palette.desc')}
					status='coming-soon'
					t={t}
				/>
				<ToolCard
					icon='🎯'
					title={t('tools.contrast.title')}
					description={t('tools.contrast.desc')}
					status='coming-soon'
					t={t}
				/>
				<ToolCard
					icon='🔄'
					title={t('tools.converter.title')}
					description={t('tools.converter.desc')}
					status='coming-soon'
					t={t}
				/>
				<ToolCard
					icon='💡'
					title={t('tools.harmony.title')}
					description={t('tools.harmony.desc')}
					status='coming-soon'
					t={t}
				/>
				<ToolCard
					icon='🎭'
					title={t('tools.gradient.title')}
					description={t('tools.gradient.desc')}
					status='coming-soon'
					t={t}
				/>
			</div>
		</div>
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
	t,
}: {
	icon: string
	title: string
	description: string
	status?: 'available' | 'coming-soon'
	t: any
}) {
	return (
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
}



