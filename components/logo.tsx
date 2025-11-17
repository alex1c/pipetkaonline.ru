'use client'

import Link from 'next/link'

interface LogoProps {
	locale: string
	className?: string
}

/**
 * Logo component
 * Displays the PipetkaOnline logo with pipette and color palette
 */
export function Logo({ locale, className = '' }: LogoProps) {
	return (
		<Link
			href={`/${locale}`}
			className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
			aria-label='PipetkaOnline'
		>
			<img
				src='/logo.svg'
				alt='PipetkaOnline Logo'
				className='h-12 sm:h-14 w-auto min-w-[240px]'
			/>
		</Link>
	)
}

