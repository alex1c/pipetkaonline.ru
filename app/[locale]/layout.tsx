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
 * Inter font configuration with Cyrillic and Latin support
 */
const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
	display: 'swap',
})

/**
 * Site metadata configuration
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
 * Root layout component for all pages
 * Sets up internationalization and common page structure
 */
export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	// Validate locale parameter
	if (!locales.includes(locale as any)) {
		notFound()
	}

	// Load translation messages for the current locale
	// getMessages automatically uses the configuration from i18n.ts
	const messages = await getMessages()

	return (
		<html lang={locale} className={inter.variable}>
			<body className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col font-sans'>
				<NextIntlClientProvider messages={messages}>
					<Navbar />
					<main className='flex-1 max-w-4xl mx-auto px-4 py-8 w-full'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

/**
 * Generate static params for all supported locales
 * Enables static generation at build time
 */
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}


