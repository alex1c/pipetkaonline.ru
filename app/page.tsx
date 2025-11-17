import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n'

/**
 * Root page redirect
 * Redirects to the default locale when accessing the root path
 */
export default function RootPage() {
	redirect(`/${defaultLocale}`)
}



