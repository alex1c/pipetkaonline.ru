/**
 * Language Switcher Component
 * 
 * Interactive component that allows users to switch between available locales.
 * Preserves the current page path when changing languages, ensuring users
 * stay on the same content in their preferred language.
 * 
 * Features:
 * - Visual flag indicators for each language
 * - Active state highlighting
 * - Smooth transitions and hover effects
 * - Accessible button labels
 * - Path preservation on locale change
 * 
 * @component
 * @example
 * ```tsx
 * <LanguageSwitcher />
 * ```
 */

'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { locales } from '@/i18n'

/**
 * Language display information mapping
 * 
 * Maps locale codes to their visual representation (flag emoji and label).
 * Used for displaying language options in the switcher UI.
 * 
 * @constant
 * @type {Record<string, { flag: string; label: string }>}
 */
const languageInfo = {
	ru: { flag: '🇷🇺', label: 'RU' },
	en: { flag: '🇬🇧', label: 'EN' },
	de: { flag: '🇩🇪', label: 'DE' },
	es: { flag: '🇪🇸', label: 'ES' },
}

/**
 * Language Switcher Component
 * 
 * Renders a button group for switching between available locales.
 * Each button shows a flag emoji and language code. The active locale
 * is highlighted with different styling.
 * 
 * When a language is clicked:
 * 1. Extracts the current pathname
 * 2. Removes the current locale prefix
 * 3. Adds the new locale prefix
 * 4. Navigates to the new URL
 * 
 * This preserves the page structure (e.g., /ru/tools/color-lab becomes /en/tools/color-lab)
 * 
 * @returns {JSX.Element} Language switcher button group
 */
export function LanguageSwitcher() {
	const router = useRouter()
	const params = useParams()
	const pathname = usePathname()
	const currentLocale = params.locale as string

	/**
	 * Handles locale change event
	 * 
	 * When a user clicks a language button, this function:
	 * 1. Checks if the new locale is different from current
	 * 2. Removes the current locale prefix from the pathname
	 * 3. Constructs a new path with the selected locale
	 * 4. Navigates to the new path using Next.js router
	 * 
	 * Example:
	 * - Current: /ru/tools/color-lab
	 * - Click EN: /en/tools/color-lab
	 * 
	 * @param {string} newLocale - The locale code to switch to (e.g., 'en', 'ru')
	 * @returns {void}
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



