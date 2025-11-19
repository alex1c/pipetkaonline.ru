/**
 * Next.js Configuration File
 * 
 * This file configures Next.js with the next-intl plugin for internationalization support.
 * The plugin automatically handles locale routing and message loading based on the i18n.ts configuration.
 * 
 * Performance Optimizations:
 * - Compression enabled for all responses
 * - Image optimization with AVIF and WebP support
 * - Caching headers for static assets
 * - CSS optimization
 * - Bundle analyzer for performance monitoring
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see https://next-intl.dev/docs/getting-started/app-router/nextjs
 */

import createNextIntlPlugin from 'next-intl/plugin'
import crypto from 'crypto'
import { createRequire } from 'module'

// Create require function for CommonJS modules in ES module context
const require = createRequire(import.meta.url)

// Create the next-intl plugin instance that will wrap the Next.js configuration
// The plugin reads the i18n configuration from './i18n.ts' file
const withNextIntl = createNextIntlPlugin('./i18n.ts')

/**
 * Next.js configuration object with performance optimizations
 * 
 * Features:
 * - Compression: Reduces response sizes for faster loading
 * - Image optimization: Automatic format conversion (AVIF, WebP)
 * - Caching headers: Improves repeat visit performance
 * - CSS optimization: Minifies and optimizes CSS
 * - Webpack optimization: Advanced code splitting and caching
 * - Production optimizations: Disabled source maps, optimized builds
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/**
	 * Enable compression for all responses
	 * Reduces bandwidth usage and improves load times
	 */
	compress: true,

	/**
	 * Disable source maps in production for smaller bundle size
	 */
	productionBrowserSourceMaps: false,

	/**
	 * Image optimization configuration
	 * Automatically serves modern formats (AVIF, WebP) when supported
	 */
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	/**
	 * Experimental features for performance
	 * Note: optimizeCss requires 'critters' package, disabled to avoid build errors
	 */
	experimental: {
		// optimizeCss: true, // Disabled - requires 'critters' package
	},

	/**
	 * Webpack optimization for better code splitting and caching
	 * Improves bundle size and load times
	 */
	webpack: (config, { isServer, dev }) => {
		if (!isServer && !dev) {
			// Optimize client-side bundle
			config.optimization = {
				...config.optimization,
				moduleIds: 'deterministic',
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						default: false,
						vendors: false,
						// Framework chunk (React, Next.js)
						framework: {
							name: 'framework',
							chunks: 'all',
							test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
							priority: 40,
							enforce: true,
						},
						// Large libraries chunk
						lib: {
							test(module) {
								return (
									module.size() > 160000 &&
									/node_modules[/\\]/.test(module.identifier())
								)
							},
							name(module) {
								const hash = crypto
									.createHash('sha1')
									.update(module.identifier())
									.digest('hex')
									.substring(0, 8)
								return `lib-${hash}`
							},
							priority: 30,
							minChunks: 1,
							reuseExistingChunk: true,
						},
						// Common chunks (used in 2+ places)
						commons: {
							name: 'commons',
							minChunks: 2,
							priority: 20,
						},
						// Shared chunks
						shared: {
							name(module, chunks) {
								const hash = crypto
									.createHash('sha1')
									.update(
										chunks.reduce((acc, chunk) => acc + chunk.name, '')
									)
									.digest('hex')
									.substring(0, 8)
								return `shared-${hash}`
							},
							priority: 10,
							minChunks: 2,
							reuseExistingChunk: true,
						},
					},
				},
			}
		}
		return config
	},

	/**
	 * Custom headers for caching and performance
	 * Improves repeat visit performance and reduces server load
	 */
	async headers() {
		return [
			{
				// Cache static pages
				source: '/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=86400',
					},
				],
			},
			{
				// Long-term cache for images and static assets
				source: '/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|gif)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				// Cache fonts
				source: '/:path*\\.(woff|woff2|ttf|otf|eot)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				// Cache CSS and JS
				source: '/:path*\\.(css|js)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		]
	},
}

// Export the configuration wrapped with next-intl plugin
// This enables automatic locale detection and routing
// 
// Bundle analyzer can be enabled by installing @next/bundle-analyzer
// and wrapping the export: withBundleAnalyzer(withNextIntl(nextConfig))
// Run with: ANALYZE=true npm run build
let config = withNextIntl(nextConfig)

// Conditionally apply bundle analyzer if ANALYZE env var is set
if (process.env.ANALYZE === 'true') {
	const bundleAnalyzer = require('@next/bundle-analyzer')({
		enabled: true,
	})
	config = bundleAnalyzer(config)
}

export default config


