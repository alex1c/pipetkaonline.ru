/**
 * Root Layout Component (App Router Root)
 * 
 * This is the top-level layout for the Next.js App Router.
 * It's required by Next.js but doesn't render any UI since all
 * actual pages are under the [locale] directory.
 * 
 * Purpose:
 * - Required by Next.js App Router structure
 * - Passes through children to the [locale]/layout.tsx
 * - No styling or structure is applied here
 * 
 * The actual layout with navigation, footer, and internationalization
 * is handled by app/[locale]/layout.tsx, which wraps all page content.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components (will be [locale]/layout.tsx)
 * @returns {React.ReactNode} Children passed through unchanged
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Simply return children - all actual layout logic is in [locale]/layout.tsx
	return children
}



