'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'

/**
 * Navigation bar component
 * Displays site navigation links and language switcher
 * Uses sticky positioning and smooth transitions
 */
export function Navbar() {
	const t = useTranslations()
	const params = useParams()
	const locale = params.locale as string

	return (
		<nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				<div className='flex items-center justify-between h-20 gap-4'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<Logo locale={locale} />
					</div>

					{/* Navigation links */}
					<div className='hidden md:flex items-center gap-1 flex-shrink-0'>
						<NavLink href={`/${locale}`} label={t('nav.home')} />
						<NavLink href={`/${locale}/tools`} label={t('nav.tools')} />
						<NavLink href={`/${locale}/learn`} label={t('nav.learn')} />
					</div>

					{/* Language switcher */}
					<div className='flex items-center gap-4 flex-shrink-0'>
						<LanguageSwitcher />
					</div>
				</div>

				{/* Mobile navigation */}
				<div className='md:hidden pb-4 flex flex-col gap-2'>
					<NavLink href={`/${locale}`} label={t('nav.home')} mobile />
					<NavLink href={`/${locale}/tools`} label={t('nav.tools')} mobile />
					<NavLink href={`/${locale}/learn`} label={t('nav.learn')} mobile />
				</div>
			</div>
		</nav>
	)
}

/**
 * Navigation link component
 * Handles hover effects and active state styling
 */
function NavLink({
	href,
	label,
	mobile = false,
}: {
	href: string
	label: string
	mobile?: boolean
}) {
	return (
		<Link
			href={href}
			className={`
				${mobile ? 'block py-2 px-4 rounded-md' : 'px-4 py-2 rounded-md'}
				text-slate-700 hover:bg-slate-100 hover:text-slate-900 
				transition-all duration-200 font-medium
			`}
		>
			{label}
		</Link>
	)
}



