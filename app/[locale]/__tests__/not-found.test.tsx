jest.mock('next-intl/server', () => ({
	getLocale: jest.fn(),
	getTranslations: jest.fn(),
	setRequestLocale: jest.fn(),
}))

import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import NotFoundPage, { generateMetadata } from '../not-found'

const mockedGetLocale = jest.mocked(getLocale)
const mockedGetTranslations = jest.mocked(getTranslations)
const mockedSetRequestLocale = jest.mocked(setRequestLocale)

describe('localized not-found page', () => {
	beforeEach(() => {
		mockedGetLocale.mockResolvedValue('ru')
		mockedGetTranslations.mockResolvedValue(((key: string) => `notFound.${key}`) as never)
	})

	it('generates metadata without route params', async () => {
		await expect(generateMetadata()).resolves.toEqual({
			title: 'notFound.title',
			description: 'notFound.description',
		})
		expect(mockedGetTranslations).toHaveBeenCalledWith({ locale: 'ru', namespace: 'notFound' })
	})

	it('renders without route params and sets the request locale', async () => {
		await expect(NotFoundPage()).resolves.toBeTruthy()
		expect(mockedSetRequestLocale).toHaveBeenCalledWith('ru')
	})
})
