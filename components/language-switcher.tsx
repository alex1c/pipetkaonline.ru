'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { locales } from '@/i18n'

/**
 * Language information for display
 */
const languageInfo = {
	ru: { flag: '🇷🇺', label: 'RU' },
	en: { flag: '🇬🇧', label: 'EN' },
	de: { flag: '🇩🇪', label: 'DE' },
	es: { flag: '🇪🇸', label: 'ES' },
}

/**
 * Language switcher component
 * Allows users to change the interface language
 * Preserves the current path when switching locales
 */
export function LanguageSwitcher() {
	const router = useRouter()
	const params = useParams()
	const pathname = usePathname()
	const currentLocale = params.locale as string

	/**
	 * Handles language change by updating the URL locale
	 * Maintains the current page path in the new locale
	 */
	function handleLocaleChange(newLocale: string) {
		if (newLocale === currentLocale) return

		// Remove current locale from pathname and add new one
		const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
		const newPath = `/${newLocale}${pathWithoutLocale}`

		router.push(newPath)
	}

	return (
		<div className='flex items-center gap-2 p-1 bg-slate-100 rounded-lg'>
			{locales.map((locale) => {
				const info = languageInfo[locale]
				const isActive = locale === currentLocale

				return (
					<button
						key={locale}
						onClick={() => handleLocaleChange(locale)}
						className={`
							flex items-center gap-1 px-3 py-1.5 rounded-md
							text-sm font-medium transition-all duration-200
							${
								isActive
									? 'bg-white text-slate-900 shadow-sm'
									: 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
							}
						`}
						aria-label={`Switch to ${info.label}`}
					>
						<span className='text-base'>{info.flag}</span>
						<span>{info.label}</span>
					</button>
				)
			})}
		</div>
	)
}



