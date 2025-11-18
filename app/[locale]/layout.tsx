/**
 * Root Layout Component
 * 
 * This is the main layout component for all pages in the application.
 * It wraps all page content with internationalization support, navigation,
 * and common page structure.
 * 
 * Responsibilities:
 * - Validates locale parameter from URL
 * - Loads translation messages for the current locale
 * - Provides NextIntlClientProvider for client-side translations
 * - Sets up global page structure (Navbar, main content, Footer)
 * - Configures font loading and CSS variables
 * - Sets HTML lang attribute for accessibility
 * 
 * This is a Server Component that runs on the server, allowing it to:
 * - Fetch translation messages asynchronously
 * - Validate locale before rendering
 * - Optimize font loading
 * 
 * @module app/[locale]/layout
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import '../globals.css'

/**
 * Inter Font Configuration
 * 
 * Loads the Inter font family from Google Fonts with optimized settings.
 * Inter is a modern, highly legible sans-serif font designed for screens.
 * 
 * Configuration:
 * - subsets: Includes both Latin and Cyrillic character sets
 *   (supports English, German, Spanish, and Russian)
 * - weight: Loads multiple font weights for design flexibility
 * - variable: Creates a CSS variable for easy font application
 * - display: 'swap' ensures text is visible during font load
 * 
 * The font variable is applied via className to enable Tailwind usage.
 */
const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
	display: 'swap',
})

/**
 * Site Metadata
 * 
 * Default metadata for the application. Individual pages can override
 * these values using their own generateMetadata functions.
 * 
 * Used for:
 * - Browser tab title
 * - Search engine descriptions
 * - Social media sharing (Open Graph)
 * - Favicon configuration
 */
export const metadata: Metadata = {
	title: 'PipetkaOnline - Online Color Tools',
	description:
		'Detect colors, create palettes, and explore color theory with our online tools',
	icons: {
		icon: '/favicon.svg',
		apple: '/favicon.svg',
	},
}

/**
 * Root Layout Component
 * 
 * Main layout wrapper for all pages in the application.
 * This component is rendered for every page request and provides:
 * 
 * 1. Locale Validation:
 *    - Checks if the locale from URL params is valid
 *    - Returns 404 if locale is not supported
 * 
 * 2. Translation Loading:
 *    - Fetches translation messages for the current locale
 *    - Messages are loaded server-side for optimal performance
 *    - Uses the configuration from i18n.ts
 * 
 * 3. Page Structure:
 *    - HTML element with lang attribute for accessibility
 *    - Body with gradient background and flex layout
 *    - Navbar (sticky navigation)
 *    - Main content area (centered, max-width container)
 *    - Footer (site information and legal links)
 * 
 * 4. Internationalization Provider:
 *    - Wraps all children with NextIntlClientProvider
 *    - Makes translations available to all client components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.locale - Current locale code (e.g., 'ru', 'en')
 * @returns {Promise<JSX.Element>} Root layout with internationalization
 * 
 * @example
 * This layout is automatically applied to all pages under app/[locale]/
 * - /ru/page.tsx -> uses this layout with locale='ru'
 * - /en/tools/page.tsx -> uses this layout with locale='en'
 */
export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	/**
	 * Validate locale parameter
	 * 
	 * Ensures the locale from the URL is in the list of supported locales.
	 * If invalid, Next.js will render a 404 page.
	 * 
	 * This prevents errors from invalid locale codes and ensures
	 * only valid locales are processed.
	 */
	if (!locales.includes(locale as any)) {
		notFound()
	}

	/**
	 * Load translation messages for the current locale
	 * 
	 * getMessages() is a server-side function that:
	 * - Automatically detects the locale from the request context
	 * - Loads messages from the i18n.ts configuration
	 * - Returns a serializable object with all translations
	 * 
	 * These messages are passed to NextIntlClientProvider so they're
	 * available to all client components via useTranslations hook.
	 */
	const messages = await getMessages()

	return (
		<html lang={locale} className={inter.variable}>
			<body className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col font-sans'>
				{/* 
					NextIntlClientProvider makes translations available to client components.
					This is required for any component using useTranslations hook.
				*/}
				<NextIntlClientProvider messages={messages}>
					{/* Navigation bar - sticky at top, contains main navigation and language switcher */}
					<Navbar />
					
					{/* 
						Main content area
						- flex-1: Takes remaining vertical space
						- max-w-4xl: Limits width for readability
						- mx-auto: Centers content horizontally
						- px-4 py-8: Adds padding for mobile and desktop
					*/}
					<main className='flex-1 max-w-4xl mx-auto px-4 py-8 w-full'>{children}</main>
					
					{/* Footer - contains legal links, site info, and copyright */}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

/**
 * Generate Static Params
 * 
 * This function tells Next.js which locale values to pre-render at build time.
 * For each locale, Next.js will generate static HTML pages, improving
 * performance and SEO.
 * 
 * Returns an array of objects with locale values:
 * [{ locale: 'ru' }, { locale: 'en' }, { locale: 'de' }, { locale: 'es' }]
 * 
 * This enables:
 * - Static Site Generation (SSG) for all locales
 * - Faster page loads (pre-rendered HTML)
 * - Better SEO (crawlable static pages)
 * - Reduced server load
 * 
 * @returns {Array<{ locale: string }>} Array of locale parameters for static generation
 */
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}


