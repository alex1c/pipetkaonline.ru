/**
 * Contact Form API Route
 * 
 * Handles contact form submissions and sends messages to Telegram.
 * Uses Telegram Bot API to send messages to a specified chat.
 * 
 * Environment Variables Required:
 * - TELEGRAM_BOT_TOKEN: Telegram bot token
 * - TELEGRAM_CHAT_ID: Telegram chat ID where messages will be sent
 * 
 * @see https://core.telegram.org/bots/api
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * Request body interface for contact form
 */
interface ContactFormData {
	subject: string
	message: string
	email: string
}

/**
 * POST handler for contact form submissions
 * 
 * Validates form data and sends message to Telegram
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} JSON response with success or error
 */
export async function POST(request: NextRequest) {
	try {
		// Parse request body
		const body: ContactFormData = await request.json()

		// Validate required fields
		if (!body.subject || !body.message || !body.email) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(body.email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			)
		}

		// Get Telegram credentials from environment variables
		const botToken = process.env.TELEGRAM_BOT_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		if (!botToken || !chatId) {
			console.error('[Contact API] Missing Telegram credentials')
			return NextResponse.json(
				{ error: 'Server configuration error' },
				{ status: 500 }
			)
		}

		// Format message for Telegram
		const telegramMessage = `
📧 <b>Новое сообщение с сайта</b>

<b>Тема:</b> ${escapeHtml(body.subject)}
<b>Email:</b> ${escapeHtml(body.email)}

<b>Сообщение:</b>
${escapeHtml(body.message)}

---
<i>Отправлено: ${new Date().toLocaleString('ru-RU')}</i>
		`.trim()

		// Send message to Telegram
		const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
		
		const telegramResponse = await fetch(telegramApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: telegramMessage,
				parse_mode: 'HTML',
			}),
		})

		if (!telegramResponse.ok) {
			const errorData = await telegramResponse.json().catch(() => ({}))
			console.error('[Contact API] Telegram API error:', errorData)
			return NextResponse.json(
				{ error: 'Failed to send message' },
				{ status: 500 }
			)
		}

		// Return success response
		return NextResponse.json(
			{ success: true, message: 'Message sent successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('[Contact API] Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

/**
 * Escape HTML special characters
 * Prevents XSS attacks in Telegram messages
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	}
	return text.replace(/[&<>"']/g, (m) => map[m])
}

