/**
 * Root Page Component
 * 
 * This page handles requests to the root path (/) of the application.
 * Since all pages require a locale prefix (e.g., /ru, /en), this page
 * automatically redirects users to the default locale.
 * 
 * Behavior:
 * - User visits: /
 * - Redirects to: /{defaultLocale} (e.g., /ru)
 * 
 * This ensures:
 * - All URLs have a locale prefix for consistency
 * - Users always land on a localized page
 * - SEO-friendly URL structure
 * - Proper internationalization routing
 * 
 * The redirect happens server-side, so it's fast and SEO-friendly.
 * 
 * @returns {never} Always redirects, never renders
 * 
 * @example
 * User visits: https://example.com/
 * Redirects to: https://example.com/ru (if defaultLocale is 'ru')
 */
import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n'

/**
 * Root Page Component
 * 
 * Performs a server-side redirect to the default locale.
 * This is a Server Component that runs on the server, so the redirect
 * happens before any HTML is sent to the client.
 * 
 * @returns {never} Never returns - always redirects
 */
export default function RootPage() {
	// Server-side redirect to default locale
	// This happens before any rendering, so it's instant
	redirect(`/${defaultLocale}`)
}



