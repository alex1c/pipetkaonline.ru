/**
 * Root layout redirect
 * This file is required for proper routing but should not render anything
 * as all pages are under [locale] directory
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}



