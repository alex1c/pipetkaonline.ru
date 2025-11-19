/**
 * Next.js Middleware for Internationalization
 * 
 * This middleware handles locale detection and routing for the application.
 * It runs on the Edge Runtime before the request reaches the page, allowing
 * for efficient locale-based redirects and URL rewriting.
 * 
 * Features:
 * - Automatic locale detection from browser Accept-Language header
 * - URL-based locale routing (e.g., /ru, /en, /de, /es)
 * - Fallback to default locale when no match is found
 * - Always prefixes URLs with locale (even default locale)
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://next-intl.dev/docs/routing/middleware
 */

import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

/**
 * Create the internationalization middleware
 * 
 * This middleware intercepts all requests and:
 * 1. Checks if the URL contains a valid locale
 * 2. If not, detects the user's preferred locale from browser settings
 * 3. Redirects to the appropriate locale-prefixed URL
 * 4. Ensures all URLs always have a locale prefix
 */
export default createMiddleware({
	/**
	 * List of all supported locales in the application
	 * Must match the locales defined in i18n.ts
	 * @see i18n.ts for the complete list
	 */
	locales,

	/**
	 * Default locale to use when:
	 * - No locale is detected from browser settings
	 * - An invalid locale is requested
	 * - User explicitly requests the default locale
	 */
	defaultLocale,

	/**
	 * Enable automatic locale detection
	 * When true, the middleware reads the Accept-Language header
	 * from the browser and redirects to the best matching locale
	 */
	localeDetection: true,

	/**
	 * Locale prefix strategy
	 * 'always' - Always include locale in URL, even for default locale
	 * 'as-needed' - Only include locale for non-default locales
	 * 'never' - Never include locale in URL (not recommended for SEO)
	 * 
	 * Using 'always' ensures consistent URLs and better SEO
	 */
	localePrefix: 'always',
})

/**
 * Middleware configuration
 * Defines which routes the middleware should run on
 */
export const config = {
	/**
	 * Matcher pattern for routes to apply middleware
	 * 
	 * This regex matches all pathnames EXCEPT:
	 * - /api/* - API routes (should not be localized)
	 * - /_next/* - Next.js internal files (static assets, chunks, etc.)
	 * - /_vercel/* - Vercel deployment internals
	 * - Files with extensions (.*\\..*) - Static files like images, fonts, etc.
	 * 
	 * Examples of excluded paths:
	 * - /api/users
	 * - /_next/static/chunks/main.js
	 * - /favicon.ico
	 * - /sitemap.xml
	 * - /robots.txt
	 * 
	 * Examples of included paths (middleware runs):
	 * - / (root)
	 * - /ru
	 * - /en/tools
	 * - /de/learn/fundamentals
	 */
	matcher: [
		// Match all pathnames except:
		// - /api/* - API routes
		// - /_next/* - Next.js internals
		// - /_vercel/* - Vercel internals
		// - Files with extensions - static files
		// - /favicon.ico, /robots.txt, /sitemap.xml - special files
		'/((?!api|_next|_vercel|.*\\..*).*)',
	],
}



