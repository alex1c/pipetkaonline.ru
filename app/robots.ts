/**
 * Robots.txt Generation
 * 
 * Generates robots.txt file to control search engine crawling behavior.
 * 
 * Configuration:
 * - Allows all user agents to crawl the site
 * - Disallows API routes and Next.js internals
 * - Points to sitemap location
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from 'next'

/**
 * Generate Robots.txt
 * 
 * Creates robots.txt configuration that:
 * - Allows all search engines to crawl the site
 * - Blocks access to API routes and Next.js internals
 * - Provides sitemap location
 * 
 * @returns {MetadataRoute.Robots} Robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/_next/',
					'/_vercel/',
					'/tech/',
				],
			},
		],
		sitemap: 'https://pipetkaonline.ru/sitemap.xml',
	}
}


