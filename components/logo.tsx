/**
 * Logo Component
 * 
 * Displays the PipetkaOnline site logo as a clickable link to the home page.
 * The logo is an SVG image that represents the brand identity.
 * 
 * Features:
 * - Links to home page with locale prefix
 * - Hover opacity effect for interactivity
 * - Responsive sizing (smaller on mobile, larger on desktop)
 * - Accessible with proper alt text and aria-label
 * - Customizable via className prop
 * 
 * @component
 * @example
 * ```tsx
 * <Logo locale="ru" />
 * <Logo locale="en" className="custom-class" />
 * ```
 */

'use client'

import Link from 'next/link'

/**
 * Logo component props interface
 */
interface LogoProps {
	/** Current locale code for home page link */
	locale: string
	/** Optional additional CSS classes */
	className?: string
}

/**
 * Logo Component
 * 
 * Renders the site logo as a clickable link to the home page.
 * The logo image is loaded from the public directory and scales
 * responsively based on screen size.
 * 
 * Styling:
 * - Responsive height: 12 (48px) on mobile, 14 (56px) on desktop
 * - Minimum width ensures logo doesn't shrink too small
 * - Hover effect reduces opacity for visual feedback
 * 
 * Accessibility:
 * - aria-label provides screen reader text
 * - alt text describes the image
 * - Link is keyboard navigable
 * 
 * @param {LogoProps} props - Component props
 * @param {string} props.locale - Current locale for home page URL
 * @param {string} [props.className=''] - Additional CSS classes
 * 
 * @returns {JSX.Element} Logo link component
 */
export function Logo({ locale, className = '' }: LogoProps) {
	return (
		<Link
			href={`/${locale}`}
			className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
			aria-label='PipetkaOnline'
		>
			{/* 
				Logo image
				- h-12 sm:h-14: Responsive height (48px mobile, 56px desktop)
				- w-auto: Maintains aspect ratio
				- min-w-[240px]: Prevents logo from being too small
			*/}
			<img
				src='/logo.svg'
				alt='PipetkaOnline Logo'
				className='h-12 sm:h-14 w-auto min-w-[240px]'
			/>
		</Link>
	)
}

