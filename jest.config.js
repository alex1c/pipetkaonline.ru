/**
 * Jest Configuration
 * 
 * Modern testing configuration for Next.js 14 with TypeScript support.
 * Includes React Testing Library setup, module path mapping, and CSS/styling mocks.
 * 
 * Features:
 * - TypeScript support via ts-jest
 * - Next.js module resolution
 * - CSS and image mocks
 * - Environment variables setup
 * - Coverage configuration
 * 
 * @see https://jestjs.io/docs/configuration
 * @see https://nextjs.org/docs/testing
 */

const nextJest = require('next/jest')

/**
 * Create Jest configuration with Next.js integration
 * 
 * This function automatically configures Jest to work with Next.js:
 * - Sets up module resolution for Next.js paths (@/ imports)
 * - Configures TypeScript transformation
 * - Sets up test environment (jsdom for React components)
 */
const createJestConfig = nextJest({
	// Path to Next.js app directory
	dir: './',
})

/**
 * Custom Jest configuration
 * 
 * Extends Next.js Jest config with additional settings:
 * - Test environment: jsdom (for React component testing)
 * - Module name mapping: Maps @/ to project root
 * - Setup files: Runs setupTests.ts before each test
 * - Coverage: Collects coverage from source files
 * - Transform ignore: Excludes node_modules except specific packages
 */
const customJestConfig = {
	/**
	 * Test environment
	 * 
	 * jsdom: Simulates browser environment for React component testing
	 * node: For unit tests without DOM
	 */
	testEnvironment: 'jest-environment-jsdom',

	/**
	 * Module name mapping
	 * 
	 * Maps TypeScript path aliases to actual file paths.
	 * Allows using @/ imports in tests.
	 */
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/lib/(.*)$': '<rootDir>/lib/$1',
		'^@/hooks/(.*)$': '<rootDir>/hooks/$1',
		'^@/app/(.*)$': '<rootDir>/app/$1',
	},

	/**
	 * Setup files
	 * 
	 * Files to run before each test file.
	 * setupTests.ts configures testing-library/jest-dom matchers.
	 */
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

	/**
	 * Coverage configuration
	 * 
	 * Specifies which files to include in coverage reports.
	 */
	collectCoverageFrom: [
		'app/**/*.{js,jsx,ts,tsx}',
		'components/**/*.{js,jsx,ts,tsx}',
		'lib/**/*.{js,jsx,ts,tsx}',
		'hooks/**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!**/.next/**',
		'!**/coverage/**',
		'!**/*.config.{js,ts}',
		'!**/middleware.ts',
	],

	/**
	 * Coverage thresholds
	 * 
	 * Minimum coverage percentages to maintain code quality.
	 * Modern standards for production-ready applications.
	 */
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},

	/**
	 * Coverage reporters
	 * 
	 * Formats for coverage reports.
	 * - text: Console output
	 * - lcov: For CI/CD integration
	 * - html: Human-readable HTML report
	 * - json: Machine-readable JSON
	 */
	coverageReporters: ['text', 'lcov', 'html', 'json', 'json-summary'],

	/**
	 * Coverage directory
	 * 
	 * Where to output coverage reports.
	 */
	coverageDirectory: 'coverage',

	/**
	 * Test match patterns
	 * 
	 * Files that Jest will recognize as test files.
	 */
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[jt]s?(x)',
	],

	/**
	 * Transform ignore patterns
	 * 
	 * Modules that should not be transformed by Jest.
	 * node_modules are ignored by default, but we need to transform
	 * some packages that use ES modules.
	 */
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$',
	],

	/**
	 * Module file extensions
	 * 
	 * Extensions that Jest will resolve when importing modules.
	 */
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

	/**
	 * Test timeout
	 * 
	 * Maximum time (in milliseconds) a test can run before being considered failed.
	 * Increased for complex component tests.
	 */
	testTimeout: 10000,

	/**
	 * Verbose output
	 * 
	 * Shows individual test results in the output.
	 */
	verbose: true,

	/**
	 * Clear mocks
	 * 
	 * Automatically clears mock calls and instances before every test.
	 */
	clearMocks: true,

	/**
	 * Restore mocks
	 * 
	 * Automatically restores original implementation of mocked functions.
	 */
	restoreMocks: true,
}

// Export the Jest configuration
// createJestConfig wraps our custom config with Next.js defaults
module.exports = createJestConfig(customJestConfig)

