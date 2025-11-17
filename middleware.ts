import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

/**
 * Middleware for handling internationalization routing
 * Automatically redirects users to their preferred locale based on browser settings
 * or uses the default locale if none is detected
 */
export default createMiddleware({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale,

	// Automatically detect and redirect to the user's preferred locale
	localeDetection: true,

	// Prefix the default locale in the URL
	localePrefix: 'always',
})

export const config = {
	// Match all pathnames except for
	// - /api (API routes)
	// - /_next (Next.js internals)
	// - /_vercel (Vercel internals)
	// - /favicon.ico, /sitemap.xml, /robots.txt (static files)
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}



