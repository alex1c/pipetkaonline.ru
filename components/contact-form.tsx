'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Contact Form Component
 * 
 * Client-side form for submitting contact messages.
 * Sends messages to Telegram via API route.
 * 
 * Fields:
 * - Subject (required)
 * - Message (required)
 * - Email (required, validated)
 * 
 * Features:
 * - Form validation
 * - Loading states
 * - Success/error messages
 * - Accessibility support
 */
export function ContactForm() {
	const t = useTranslations('contact.form')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null
		message: string
	}>({ type: null, message: '' })

	/**
	 * Handle form submission
	 * 
	 * Validates form data and sends to API route
	 */
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Reset status
		setSubmitStatus({ type: null, message: '' })

		// Validate form
		if (!subject.trim() || !message.trim() || !email.trim()) {
			setSubmitStatus({
				type: 'error',
				message: t('validation.required'),
			})
			return
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setSubmitStatus({
				type: 'error',
				message: t('validation.email'),
			})
			return
		}

		setIsSubmitting(true)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subject: subject.trim(),
					message: message.trim(),
					email: email.trim(),
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || t('error.send'))
			}

			// Success
			setSubmitStatus({
				type: 'success',
				message: t('success'),
			})

			// Reset form
			setSubject('')
			setMessage('')
			setEmail('')
		} catch (error) {
			console.error('[ContactForm] Error:', error)
			setSubmitStatus({
				type: 'error',
				message: t('error.send'),
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{/* Subject Field */}
			<div>
				<label
					htmlFor='subject'
					className='block text-sm font-semibold text-slate-900 mb-2'
				>
					{t('subject.label')}
					<span className='text-red-500 ml-1'>*</span>
				</label>
				<input
					type='text'
					id='subject'
					name='subject'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
					disabled={isSubmitting}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed'
					placeholder={t('subject.placeholder')}
				/>
			</div>

			{/* Email Field */}
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-semibold text-slate-900 mb-2'
				>
					{t('email.label')}
					<span className='text-red-500 ml-1'>*</span>
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={isSubmitting}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed'
					placeholder={t('email.placeholder')}
				/>
			</div>

			{/* Message Field */}
			<div>
				<label
					htmlFor='message'
					className='block text-sm font-semibold text-slate-900 mb-2'
				>
					{t('message.label')}
					<span className='text-red-500 ml-1'>*</span>
				</label>
				<textarea
					id='message'
					name='message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					disabled={isSubmitting}
					rows={6}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed resize-y'
					placeholder={t('message.placeholder')}
				/>
			</div>

			{/* Status Message */}
			{submitStatus.type && (
				<div
					className={`p-4 rounded-lg ${
						submitStatus.type === 'success'
							? 'bg-green-50 text-green-800 border border-green-200'
							: 'bg-red-50 text-red-800 border border-red-200'
					}`}
					role='alert'
				>
					{submitStatus.message}
				</div>
			)}

			{/* Submit Button */}
			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
			>
				{isSubmitting ? t('submitting') : t('submit')}
			</button>
		</form>
	)
}

