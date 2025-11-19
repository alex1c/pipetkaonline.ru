/**
 * Jest Setup File
 * 
 * This file runs before each test file.
 * Configures testing utilities and global test environment.
 * 
 * Features:
 * - Sets up @testing-library/jest-dom matchers
 * - Configures global mocks
 * - Sets up environment variables
 * - Configures Next.js router mocks
 * 
 * @see https://testing-library.com/docs/react-testing-library/setup
 */

// Import jest-dom matchers
// Adds custom matchers like toBeInTheDocument(), toHaveClass(), etc.
import '@testing-library/jest-dom'

/**
 * Mock Next.js router
 * 
 * Provides mock implementations for Next.js router hooks
 * used in components (useRouter, usePathname, etc.)
 */
jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			pathname: '/',
			query: {},
			asPath: '/',
		}
	},
	usePathname() {
		return '/'
	},
	useParams() {
		return { locale: 'ru' }
	},
	useSearchParams() {
		return new URLSearchParams()
	},
}))

/**
 * Mock next-intl
 * 
 * Provides mock implementations for next-intl hooks
 * used for internationalization in components.
 */
jest.mock('next-intl', () => ({
	useTranslations: (namespace) => {
		return (key) => {
			// Return a simple key-based translation for testing
			return `${namespace ? `${namespace}.` : ''}${key}`
		}
	},
	useLocale: () => 'ru',
	useMessages: () => ({}),
}))

/**
 * Mock next-intl/server
 * 
 * Provides mock implementations for server-side next-intl functions.
 */
jest.mock('next-intl/server', () => ({
	getTranslations: async (config) => {
		const { namespace } = config || {}
		return (key) => {
			return `${namespace ? `${namespace}.` : ''}${key}`
		}
	},
	getLocale: async () => 'ru',
	getMessages: async () => ({}),
}))

/**
 * Global test utilities
 * 
 * Add any global test utilities or helpers here.
 */

/**
 * Suppress console errors in tests
 * 
 * Uncomment to suppress console.error during tests.
 * Useful when testing error boundaries or error handling.
 */
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// }

/**
 * Mock IntersectionObserver
 * 
 * IntersectionObserver is not available in jsdom by default.
 * This mock provides a basic implementation for components that use it.
 */
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return []
	}
	unobserve() {}
}

/**
 * Mock ResizeObserver
 * 
 * ResizeObserver is not available in jsdom by default.
 * This mock provides a basic implementation for components that use it.
 */
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
}

/**
 * Mock window.matchMedia
 * 
 * window.matchMedia is not available in jsdom by default.
 * This mock provides a basic implementation for responsive components.
 */
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
})

/**
 * Mock window.scrollTo
 * 
 * window.scrollTo is not available in jsdom by default.
 */
window.scrollTo = jest.fn()

/**
 * Environment variables for tests
 * 
 * Set any environment variables needed for tests here.
 */
process.env.NODE_ENV = 'test'

