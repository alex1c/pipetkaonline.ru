/**
 * Footer Component
 * 
 * Site footer displaying legal links, site information, and navigation.
 * This component is required for compliance with advertising platforms
 * like Google AdSense and Yandex.Direct, which require clear legal
 * information and site structure.
 * 
 * Features:
 * - Legal pages (Privacy, Cookies, Terms)
 * - Site information (About, Contact)
 * - Quick navigation links
 * - Copyright information
 * - Responsive grid layout
 * 
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Footer component
 * 
 * Renders the site footer with all necessary legal and informational links.
 * Uses translations from the 'footer' namespace for internationalization.
 * Automatically gets the current locale from URL parameters.
 * 
 * @returns {JSX.Element} Footer component with legal links and site information
 */
export function Footer() {
	const t = useTranslations('footer')
	const params = useParams()
	const locale = params.locale as string

	const currentYear = new Date().getFullYear()

	return (
		<footer className='bg-slate-900 text-slate-300 mt-16 border-t border-slate-800'>
			<div className='max-w-6xl mx-auto px-4 py-12'>
				<div className='grid md:grid-cols-4 gap-8 mb-8'>
					{/* Site info */}
					<div>
						<h3 className='text-white font-bold text-lg mb-4'>
							PipetkaOnline
						</h3>
						<p className='text-sm text-slate-400'>
							{t('description')}
						</p>
					</div>

					{/* Legal pages */}
					<div>
						<h4 className='text-white font-semibold mb-4'>{t('legal.title')}</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<FooterLink href={`/${locale}/privacy`}>
									{t('legal.privacy')}
								</FooterLink>
							</li>
							<li>
								<FooterLink href={`/${locale}/cookies`}>
									{t('legal.cookies')}
								</FooterLink>
							</li>
							<li>
								<FooterLink href={`/${locale}/terms`}>
									{t('legal.terms')}
								</FooterLink>
							</li>
						</ul>
					</div>

					{/* Information */}
					<div>
						<h4 className='text-white font-semibold mb-4'>{t('info.title')}</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<FooterLink href={`/${locale}/about`}>
									{t('info.about')}
								</FooterLink>
							</li>
							<li>
								<FooterLink href={`/${locale}/contact`}>
									{t('info.contact')}
								</FooterLink>
							</li>
						</ul>
					</div>

					{/* Quick links */}
					<div>
						<h4 className='text-white font-semibold mb-4'>{t('links.title')}</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<FooterLink href={`/${locale}`}>
									{t('links.home')}
								</FooterLink>
							</li>
							<li>
								<FooterLink href={`/${locale}/tools`}>
									{t('links.tools')}
								</FooterLink>
							</li>
							<li>
								<FooterLink href={`/${locale}/learn`}>
									{t('links.learn')}
								</FooterLink>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className='border-t border-slate-800 pt-8 text-center text-sm text-slate-400'>
					<p>
						© {currentYear} PipetkaOnline. {t('copyright')}
					</p>
				</div>
			</div>
		</footer>
	)
}

/**
 * Footer Link Component
 * 
 * Reusable link component for footer navigation.
 * Provides consistent styling and hover effects for all footer links.
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - Destination URL for the link
 * @param {React.ReactNode} props.children - Link text content
 * 
 * @returns {JSX.Element} Styled footer link
 */
function FooterLink({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	return (
		<Link
			href={href}
			className='hover:text-white transition-colors duration-200 block'
		>
			{children}
		</Link>
	)
}

