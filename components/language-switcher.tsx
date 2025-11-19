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

import { useState, useEffect, useRef } from 'react'
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
const languageInfo: Record<string, { flag: string; label: string }> = {
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
	
	// State for mobile dropdown menu
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
			}
		}

		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isDropdownOpen])

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
		if (newLocale === currentLocale) {
			setIsDropdownOpen(false)
			return
		}

		// Remove current locale from pathname and add new one
		const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
		const newPath = `/${newLocale}${pathWithoutLocale}`

		router.push(newPath)
		setIsDropdownOpen(false)
	}

	// Get current language info with fallback to English
	const currentInfo = languageInfo[currentLocale] || languageInfo.en

	return (
		<div className='relative'>
			{/* Desktop: Horizontal button group */}
			<div className='hidden md:flex items-center gap-2 p-1 bg-slate-100 rounded-lg'>
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

			{/* Mobile: Dropdown button */}
			<div className='md:hidden relative' ref={dropdownRef}>
				<button
					type='button'
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300'
					aria-label='Select language'
					aria-expanded={isDropdownOpen}
				>
					<span className='text-base'>{currentInfo.flag}</span>
					<span className='text-sm font-medium'>{currentInfo.label}</span>
					{/* Dropdown arrow icon */}
					<svg
						className={`w-4 h-4 transition-transform duration-200 ${
							isDropdownOpen ? 'rotate-180' : ''
						}`}
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path d='M19 9l-7 7-7-7' />
					</svg>
				</button>

				{/* Mobile dropdown menu */}
				<div
					className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 ease-in-out z-50 ${
						isDropdownOpen
							? 'max-h-96 opacity-100'
							: 'max-h-0 opacity-0 pointer-events-none'
					}`}
				>
					<div className='py-1'>
						{locales.map((locale) => {
							const info = languageInfo[locale]
							const isActive = locale === currentLocale

							return (
								<button
									key={locale}
									onClick={() => handleLocaleChange(locale)}
									className={`
										w-full flex items-center gap-2 px-4 py-2 text-left
										text-sm font-medium transition-colors duration-200
										${
											isActive
												? 'bg-slate-100 text-slate-900 font-semibold'
												: 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
										}
									`}
									aria-label={`Switch to ${info.label}`}
								>
									<span className='text-base'>{info.flag}</span>
									<span>{info.label}</span>
									{isActive && (
										<span className='ml-auto text-slate-400'>✓</span>
									)}
								</button>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}



