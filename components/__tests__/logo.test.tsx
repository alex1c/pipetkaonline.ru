/**
 * Logo Component Tests
 * 
 * Tests for the Logo component to ensure:
 * - Component renders correctly
 * - Link navigation works
 * - Accessibility attributes are present
 * - Responsive classes are applied
 * 
 * @see https://testing-library.com/docs/react-testing-library/intro
 */

import { render, screen } from '@testing-library/react'
import { Logo } from '../logo'

/**
 * Mock Next.js Link component
 * 
 * Next.js Link component requires router context.
 * We mock it to return a simple anchor tag for testing.
 * Preserves all props including className and aria-label.
 */
jest.mock('next/link', () => {
	const MockedLink = ({
		children,
		href,
		className,
		'aria-label': ariaLabel,
		...props
	}: {
		children: React.ReactNode
		href: string
		className?: string
		'aria-label'?: string
		[key: string]: any
	}) => {
		return (
			<a href={href} className={className} aria-label={ariaLabel} {...props}>
				{children}
			</a>
		)
	}
	MockedLink.displayName = 'MockedLink'
	return MockedLink
})

describe('Logo Component', () => {
	/**
	 * Test: Logo renders with correct locale in link
	 * 
	 * Verifies that the Logo component generates the correct
	 * home page link based on the locale prop.
	 */
	it('renders logo with correct locale in link', () => {
		render(<Logo locale='ru' />)
		
		const link = screen.getByRole('link', { name: /pipetkaonline/i })
		expect(link).toHaveAttribute('href', '/ru')
	})

	/**
	 * Test: Logo renders with different locales
	 * 
	 * Verifies that the Logo component correctly handles
	 * different locale values.
	 */
	it('renders logo with different locales', () => {
		const { rerender } = render(<Logo locale='en' />)
		expect(screen.getByRole('link')).toHaveAttribute('href', '/en')

		rerender(<Logo locale='de' />)
		expect(screen.getByRole('link')).toHaveAttribute('href', '/de')

		rerender(<Logo locale='es' />)
		expect(screen.getByRole('link')).toHaveAttribute('href', '/es')
	})

	/**
	 * Test: Logo has accessible alt text
	 * 
	 * Verifies that the logo image has descriptive alt text
	 * for screen readers and accessibility.
	 */
	it('has accessible alt text', () => {
		render(<Logo locale='ru' />)
		
		const image = screen.getByAltText(
			/PipetkaOnline - Online Color Tools and Color Theory Education Platform Logo/i
		)
		expect(image).toBeInTheDocument()
	})

	/**
	 * Test: Logo applies custom className
	 * 
	 * Verifies that additional CSS classes can be passed
	 * to the Logo component and are applied correctly.
	 */
	it('applies custom className', () => {
		render(<Logo locale='ru' className='custom-class' />)
		
		const link = screen.getByRole('link')
		// Check that className is in the class string (may be combined with other classes)
		expect(link.className).toContain('custom-class')
	})

	/**
	 * Test: Logo has aria-label
	 * 
	 * Verifies that the link has an aria-label attribute
	 * for accessibility.
	 */
	it('has aria-label for accessibility', () => {
		render(<Logo locale='ru' />)
		
		// aria-label is used for accessible name, so we can find by accessible name
		const link = screen.getByRole('link', { name: /pipetkaonline/i })
		expect(link).toBeInTheDocument()
		// Check aria-label directly
		expect(link.getAttribute('aria-label')).toBe('PipetkaOnline')
	})

	/**
	 * Test: Logo image has correct attributes
	 * 
	 * Verifies that the logo image has width and height
	 * attributes for proper rendering and performance.
	 */
	it('logo image has width and height attributes', () => {
		render(<Logo locale='ru' />)
		
		const image = screen.getByAltText(
			/PipetkaOnline - Online Color Tools and Color Theory Education Platform Logo/i
		)
		expect(image).toHaveAttribute('width', '240')
		expect(image).toHaveAttribute('height', '56')
		expect(image).toHaveAttribute('src', '/logo.svg')
	})
})

