import fs from 'node:fs'
import path from 'node:path'

describe('locale middleware routing', () => {
	it('keeps the default-locale prefix contract for unlocalized paths', () => {
		const source = fs.readFileSync(path.join(process.cwd(), 'middleware.ts'), 'utf8')

		expect(source).toContain('locales,')
		expect(source).toContain('defaultLocale,')
		expect(source).toContain("localePrefix: 'always'")
		expect(source).toContain('localeDetection: true')
		expect(source).toContain("'/((?!api|_next|_vercel|.*\\\\..*).*)'")
	})
})
