/**
 * Next.js Configuration File
 * 
 * This file configures Next.js with the next-intl plugin for internationalization support.
 * The plugin automatically handles locale routing and message loading based on the i18n.ts configuration.
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see https://next-intl.dev/docs/getting-started/app-router/nextjs
 */

import createNextIntlPlugin from 'next-intl/plugin'

// Create the next-intl plugin instance that will wrap the Next.js configuration
// The plugin reads the i18n configuration from './i18n.ts' file
const withNextIntl = createNextIntlPlugin('./i18n.ts')

/**
 * Next.js configuration object
 * Currently using default settings, but can be extended with:
 * - Image optimization settings
 * - Environment variables
 * - Webpack customizations
 * - Output configurations
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {}

// Export the configuration wrapped with next-intl plugin
// This enables automatic locale detection and routing
export default withNextIntl(nextConfig)


