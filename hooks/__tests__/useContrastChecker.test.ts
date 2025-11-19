/**
 * useContrastChecker Hook Tests
 * 
 * Tests for the useContrastChecker custom hook to ensure:
 * - Contrast ratio calculation is correct
 * - WCAG compliance checking works
 * - Invalid colors are handled gracefully
 */

import { renderHook } from '@testing-library/react'
import { useContrastChecker } from '../useContrastChecker'

describe('useContrastChecker Hook', () => {
	/**
	 * Test: Calculates contrast ratio correctly
	 * 
	 * Verifies that contrast ratio is calculated
	 * correctly for different color combinations.
	 */
	it('calculates contrast ratio correctly', () => {
		const { result } = renderHook(() =>
			useContrastChecker('#000000', '#FFFFFF')
		)

		// Black on white should have high contrast (21:1)
		expect(result.current).not.toBeNull()
		expect(result.current?.ratio).toBeGreaterThan(20)
		expect(result.current?.ratioFormatted).toMatch(/^\d+\.\d+:1$/)
	})

	/**
	 * Test: Detects WCAG AA compliance
	 * 
	 * Verifies that WCAG AA compliance is correctly
	 * detected for normal and large text.
	 */
	it('detects WCAG AA compliance', () => {
		const { result } = renderHook(() =>
			useContrastChecker('#000000', '#FFFFFF')
		)

		// Black on white should pass AA for both normal and large text
		expect(result.current).not.toBeNull()
		expect(result.current?.wcag.aaNormal).toBe(true)
		expect(result.current?.wcag.aaLarge).toBe(true)
	})

	/**
	 * Test: Detects WCAG AAA compliance
	 * 
	 * Verifies that WCAG AAA compliance is correctly
	 * detected for normal and large text.
	 */
	it('detects WCAG AAA compliance', () => {
		const { result } = renderHook(() =>
			useContrastChecker('#000000', '#FFFFFF')
		)

		// Black on white should pass AAA for both normal and large text
		expect(result.current).not.toBeNull()
		expect(result.current?.wcag.aaaNormal).toBe(true)
		expect(result.current?.wcag.aaaLarge).toBe(true)
	})

	/**
	 * Test: Handles low contrast colors
	 * 
	 * Verifies that low contrast color combinations
	 * are correctly identified as non-compliant.
	 */
	it('handles low contrast colors', () => {
		const { result } = renderHook(() =>
			useContrastChecker('#CCCCCC', '#DDDDDD')
		)

		// Low contrast should fail WCAG
		expect(result.current).not.toBeNull()
		expect(result.current?.ratio).toBeLessThan(4.5)
		expect(result.current?.wcag.aaNormal).toBe(false)
		expect(result.current?.wcag.aaLarge).toBe(false)
	})

	/**
	 * Test: Handles invalid colors gracefully
	 * 
	 * Verifies that invalid or undefined colors
	 * are handled without throwing errors.
	 */
	it('handles invalid colors gracefully', () => {
		const { result: result1 } = renderHook(() =>
			useContrastChecker(undefined as any, '#FFFFFF')
		)
		expect(result1.current).not.toBeNull()
		expect(result1.current?.ratio).toBe(0)
		expect(result1.current?.foregroundRgb).toBeNull()

		const { result: result2 } = renderHook(() =>
			useContrastChecker('#000000', null as any)
		)
		expect(result2.current).not.toBeNull()
		expect(result2.current?.ratio).toBe(0)
		expect(result2.current?.backgroundRgb).toBeNull()

		const { result: result3 } = renderHook(() =>
			useContrastChecker('invalid', 'invalid')
		)
		expect(result3.current).not.toBeNull()
		expect(result3.current?.ratio).toBe(0)
	})

	/**
	 * Test: Returns correct RGB and HEX values
	 * 
	 * Verifies that RGB and HEX color values
	 * are correctly calculated and returned.
	 */
	it('returns correct RGB and HEX values', () => {
		const { result } = renderHook(() =>
			useContrastChecker('#000000', '#FFFFFF')
		)

		expect(result.current).not.toBeNull()
		expect(result.current?.foregroundRgb).toEqual({ r: 0, g: 0, b: 0 })
		expect(result.current?.backgroundRgb).toEqual({ r: 255, g: 255, b: 255 })
		expect(result.current?.foregroundHex).toBe('#000000')
		expect(result.current?.backgroundHex).toBe('#FFFFFF')
	})

	/**
	 * Test: Handles different color formats
	 * 
	 * Verifies that the hook correctly handles
	 * different color input formats (HEX, RGB, HSL).
	 */
	it('handles different color formats', () => {
		const { result: hexResult } = renderHook(() =>
			useContrastChecker('#FF0000', '#00FF00')
		)
		expect(hexResult.current).not.toBeNull()
		expect(hexResult.current?.ratio).toBeGreaterThan(1)

		const { result: rgbResult } = renderHook(() =>
			useContrastChecker('rgb(255, 0, 0)', 'rgb(0, 255, 0)')
		)
		expect(rgbResult.current).not.toBeNull()
		expect(rgbResult.current?.ratio).toBeGreaterThan(1)

		const { result: hslResult } = renderHook(() =>
			useContrastChecker('hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)')
		)
		expect(hslResult.current).not.toBeNull()
		expect(hslResult.current?.ratio).toBeGreaterThan(1)
	})
})

