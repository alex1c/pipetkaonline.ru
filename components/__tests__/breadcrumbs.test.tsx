/**
 * Breadcrumbs Component Tests
 * 
 * Tests for the Breadcrumbs component to ensure:
 * - Component renders correctly
 * - Structured data is generated
 * - Navigation links work
 * - Accessibility attributes are present
 */

import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../breadcrumbs'

describe('Breadcrumbs Component', () => {
	/**
	 * Test: Renders breadcrumb items correctly
	 * 
	 * Verifies that all breadcrumb items are rendered
	 * and the last item is not a link.
	 */
	it('renders breadcrumb items correctly', () => {
		const items = [
			{ name: 'Home', href: '/ru' },
			{ name: 'Tools', href: '/ru/tools' },
			{ name: 'Color Converter', href: '/ru/tools/color-converter' },
		]

		render(<Breadcrumbs items={items} />)

		// Check that all items are rendered
		expect(screen.getByText('Home')).toBeInTheDocument()
		expect(screen.getByText('Tools')).toBeInTheDocument()
		expect(screen.getByText('Color Converter')).toBeInTheDocument()
	})

	/**
	 * Test: Last item is not a link
	 * 
	 * Verifies that the last breadcrumb item (current page)
	 * is rendered as plain text, not a link.
	 */
	it('last item is not a link', () => {
		const items = [
			{ name: 'Home', href: '/ru' },
			{ name: 'Current Page', href: '/ru/current' },
		]

		render(<Breadcrumbs items={items} />)

		const lastItem = screen.getByText('Current Page')
		expect(lastItem).toHaveAttribute('aria-current', 'page')
		expect(lastItem.tagName).not.toBe('A')
	})

	/**
	 * Test: Previous items are links
	 * 
	 * Verifies that all breadcrumb items except the last
	 * are rendered as clickable links.
	 */
	it('previous items are links', () => {
		const items = [
			{ name: 'Home', href: '/ru' },
			{ name: 'Tools', href: '/ru/tools' },
			{ name: 'Current', href: '/ru/current' },
		]

		render(<Breadcrumbs items={items} />)

		const homeLink = screen.getByText('Home')
		expect(homeLink.tagName).toBe('A')
		expect(homeLink).toHaveAttribute('href', '/ru')

		const toolsLink = screen.getByText('Tools')
		expect(toolsLink.tagName).toBe('A')
		expect(toolsLink).toHaveAttribute('href', '/ru/tools')
	})

	/**
	 * Test: Has navigation aria-label
	 * 
	 * Verifies that the breadcrumb navigation has
	 * proper accessibility attributes.
	 */
	it('has navigation aria-label', () => {
		const items = [{ name: 'Home', href: '/ru' }]
		render(<Breadcrumbs items={items} />)

		const nav = screen.getByRole('navigation', { name: /breadcrumb/i })
		expect(nav).toBeInTheDocument()
	})

	/**
	 * Test: Generates structured data
	 * 
	 * Verifies that structured data script is included
	 * in the component output for SEO.
	 */
	it('generates structured data script', () => {
		const items = [
			{ name: 'Home', href: '/ru' },
			{ name: 'Tools', href: '/ru/tools' },
		]

		const { container } = render(<Breadcrumbs items={items} />)
		const script = container.querySelector('script[type="application/ld+json"]')
		
		expect(script).toBeInTheDocument()
		
		const structuredData = JSON.parse(script?.textContent || '{}')
		expect(structuredData['@type']).toBe('BreadcrumbList')
		expect(structuredData.itemListElement).toHaveLength(2)
	})
})

