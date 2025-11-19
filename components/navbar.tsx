/**
 * Navigation Bar Component
 * 
 * Main site navigation component that appears at the top of every page.
 * Provides consistent navigation and language switching across the application.
 * 
 * Features:
 * - Sticky positioning (stays at top when scrolling)
 * - Glassmorphism effect (semi-transparent with backdrop blur)
 * - Responsive design (desktop horizontal, mobile vertical)
 * - Internationalized navigation labels
 * - Smooth transitions and hover effects
 * 
 * Layout:
 * - Desktop: Logo | Nav Links | Language Switcher (horizontal)
 * - Mobile: Logo | Language Switcher (horizontal)
 *          Nav Links (vertical, below)
 * 
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

'use client'

import { memo, useState, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'

/**
 * Navigation Bar Component
 * 
 * Renders the main site navigation with:
 * - Site logo (links to home)
 * - Main navigation links (Home, Tools, Learn)
 * - Language switcher
 * 
 * Uses sticky positioning to remain visible while scrolling.
 * Applies glassmorphism styling (semi-transparent background with blur)
 * for a modern, elegant appearance.
 * 
 * Responsive behavior:
 * - Desktop (md+): All elements in one row
 * - Mobile: Logo and language switcher in row, nav links below
 * 
 * Memoized to prevent unnecessary re-renders.
 * 
 * @returns {JSX.Element} Navigation bar with logo, links, and language switcher
 */
export const Navbar = memo(function Navbar() {
	// Get translations from default namespace (common translations)
	const t = useTranslations()
	// Get current locale from URL parameters
	const params = useParams()
	const locale = params.locale as string
	
	// State for mobile menu open/close
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	
	// Memoized toggle function to prevent re-renders
	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev)
	}, [])
	
	// Memoized close function for mobile links
	const closeMenu = useCallback(() => {
		setIsMenuOpen(false)
	}, [])

	return (
		<nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300'>
			{/* 
				Container with max-width for content centering
				- max-w-7xl: Maximum width constraint
				- mx-auto: Centers horizontally
				- px-4 sm:px-6: Responsive horizontal padding
			*/}
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				{/* 
					Main navigation row
					- flex: Horizontal layout
					- items-center: Vertical centering
					- justify-between: Space between logo and right side
					- h-20: Fixed height for consistent appearance
					- gap-4: Spacing between flex items
				*/}
				<div className='flex items-center justify-between h-20 gap-4'>
					{/* Logo section - flex-shrink-0 prevents logo from shrinking */}
					<div className='flex-shrink-0'>
						<Logo locale={locale} />
					</div>

					{/* 
						Desktop navigation links
						- hidden md:flex: Hidden on mobile, visible on desktop
						- gap-1: Small spacing between links
					*/}
					<div className='hidden md:flex items-center gap-1 flex-shrink-0'>
						<NavLink href={`/${locale}`} label={t('nav.home')} prefetch />
						<NavLink href={`/${locale}/tools`} label={t('nav.tools')} prefetch />
						<NavLink href={`/${locale}/learn`} label={t('nav.learn')} prefetch />
					</div>

					{/* Right side: Language switcher and hamburger button */}
					<div className='flex items-center gap-4 flex-shrink-0'>
						{/* Language switcher - always visible */}
						<LanguageSwitcher />
						
						{/* 
							Hamburger button for mobile menu
							- md:hidden: Only visible on mobile devices
							- Button with icon that toggles menu state
						*/}
						<button
							type='button'
							onClick={toggleMenu}
							className='md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300'
							aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
							aria-expanded={isMenuOpen}
						>
							{/* Hamburger icon - transforms to X when open */}
							<svg
								className='w-6 h-6 transition-transform duration-200'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								{isMenuOpen ? (
									// X icon when menu is open
									<path d='M6 18L18 6M6 6l12 12' />
								) : (
									// Hamburger icon when menu is closed
									<path d='M4 6h16M4 12h16M4 18h16' />
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* 
					Mobile navigation menu
					- md:hidden: Only visible on mobile devices
					- pb-4: Bottom padding for spacing
					- flex flex-col: Vertical layout
					- gap-2: Spacing between links
					- Conditional rendering based on isMenuOpen state
					- Smooth slide animation with opacity transition
				*/}
				<div 
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'
					}`}
				>
					<div className='flex flex-col gap-2'>
						<NavLink 
							href={`/${locale}`} 
							label={t('nav.home')} 
							mobile 
							onClick={closeMenu}
						/>
						<NavLink 
							href={`/${locale}/tools`} 
							label={t('nav.tools')} 
							mobile 
							onClick={closeMenu}
						/>
						<NavLink 
							href={`/${locale}/learn`} 
							label={t('nav.learn')} 
							mobile 
							onClick={closeMenu}
						/>
					</div>
				</div>
			</div>
		</nav>
	)
})

/**
 * Navigation Link Component
 * 
 * Reusable link component for navigation items.
 * Provides consistent styling and hover effects for all nav links.
 * 
 * Styling features:
 * - Hover background color change
 * - Hover text color change
 * - Smooth transitions
 * - Responsive padding (different for mobile/desktop)
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - Destination URL (includes locale prefix)
 * @param {string} props.label - Link text (translated)
 * @param {boolean} [props.mobile=false] - Whether this is a mobile nav link
 * 
 * @returns {JSX.Element} Styled navigation link with hover effects
 */
function NavLink({
	href,
	label,
	mobile = false,
	onClick,
	prefetch = false,
}: {
	href: string
	label: string
	mobile?: boolean
	onClick?: () => void
	prefetch?: boolean
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			prefetch={prefetch}
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



