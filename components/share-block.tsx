/**
 * Share Block Component
 * 
 * Modern and advanced social sharing block for the footer.
 * Provides sharing functionality to popular social networks and copy-to-clipboard.
 * 
 * Features:
 * - Social media sharing buttons (Twitter, Facebook, LinkedIn, Telegram, VK, WhatsApp)
 * - Copy link to clipboard with visual feedback
 * - Modern design with icons and animations
 * - Responsive layout
 * - Accessibility support
 * 
 * @component
 */

'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Share Block Component
 * 
 * Renders a modern sharing block with social media buttons and copy functionality.
 * 
 * @returns {JSX.Element} Share block component
 */
export function ShareBlock() {
	const t = useTranslations('footer.share')
	const params = useParams()
	const locale = params.locale as string
	const [copied, setCopied] = useState(false)
	const [currentUrl, setCurrentUrl] = useState('')

	/**
	 * Get current page URL
	 */
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href)
		}
	}, [])

	/**
	 * Copy link to clipboard
	 */
	const handleCopyLink = async () => {
		if (!currentUrl) return

		try {
			await navigator.clipboard.writeText(currentUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy link', err)
		}
	}

	/**
	 * Share to social network
	 */
	const shareToSocial = (platform: string) => {
		const encodedUrl = encodeURIComponent(currentUrl)
		const encodedTitle = encodeURIComponent('PipetkaOnline - Color Tools & Resources')
		const shareText = t('shareText').replace('{url}', currentUrl)
		const encodedText = encodeURIComponent(shareText)

		const shareUrls: Record<string, string> = {
			twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
			telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
			vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
			whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
		}

		const url = shareUrls[platform]
		if (url) {
			window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer')
		}
	}

	return (
		<div className='bg-slate-800 rounded-xl p-6 border border-slate-700'>
			<h4 className='text-white font-semibold mb-4 text-lg'>
				{t('title')}
			</h4>
			<p className='text-slate-400 text-sm mb-6'>
				{t('description')}
			</p>

			{/* Social Media Buttons */}
			<div className='grid grid-cols-3 md:grid-cols-6 gap-3 mb-4'>
				{/* Twitter */}
				<ShareButton
					onClick={() => shareToSocial('twitter')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
						</svg>
					}
					label={t('twitter')}
					color='hover:bg-blue-500/20 hover:text-blue-400 border-blue-500/30'
				/>

				{/* Facebook */}
				<ShareButton
					onClick={() => shareToSocial('facebook')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
						</svg>
					}
					label={t('facebook')}
					color='hover:bg-blue-600/20 hover:text-blue-400 border-blue-600/30'
				/>

				{/* LinkedIn */}
				<ShareButton
					onClick={() => shareToSocial('linkedin')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
						</svg>
					}
					label={t('linkedin')}
					color='hover:bg-blue-700/20 hover:text-blue-400 border-blue-700/30'
				/>

				{/* Telegram */}
				<ShareButton
					onClick={() => shareToSocial('telegram')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.787z' />
						</svg>
					}
					label={t('telegram')}
					color='hover:bg-blue-500/20 hover:text-blue-400 border-blue-500/30'
				/>

				{/* VK */}
				<ShareButton
					onClick={() => shareToSocial('vk')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.095-1.492 0-1.492 0s-.28.07-.646.07c-.99 0-1.86-.526-2.75-1.523-1.21-1.26-2.12-2.88-2.12-2.88s-.14-.28.07-.49c.21-.21.56-.14.56-.14l2.18.14c.28.07.42.21.49.35.07.14.14.42.28.56.14.14.28.21.49.14.21-.07 1.19-.7 1.19-.7s.21-.14.35-.07c.14.07.14.28.14.49v1.33c0 .28.07.42.21.49.14.07.28.07.49-.07.28-.14 1.26-1.26 1.68-1.68.21-.21.35-.28.49-.28.14 0 .28.07.35.21v2.52c0 .28-.07.42-.28.49-.21.07-1.12.7-1.54 1.12-.21.21-.28.35-.14.49.14.14.49.49.7.7.21.21.35.35.49.49.14.14.28.35.14.49-.14.14-.35.28-.7.14z' />
						</svg>
					}
					label={t('vk')}
					color='hover:bg-blue-600/20 hover:text-blue-400 border-blue-600/30'
				/>

				{/* WhatsApp */}
				<ShareButton
					onClick={() => shareToSocial('whatsapp')}
					icon={
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
						</svg>
					}
					label={t('whatsapp')}
					color='hover:bg-green-500/20 hover:text-green-400 border-green-500/30'
				/>
			</div>

			{/* Copy Link Button */}
			<button
				onClick={handleCopyLink}
				className={`
					w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
					flex items-center justify-center gap-2 font-medium
					${
						copied
							? 'bg-green-500/20 border-green-500 text-green-400'
							: 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white'
					}
				`}
			>
				{copied ? (
					<>
						<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
						{t('copied')}
					</>
				) : (
					<>
						<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
							/>
						</svg>
						{t('copyLink')}
					</>
				)}
			</button>
		</div>
	)
}

/**
 * Share Button Component
 * 
 * Individual social media share button with icon and hover effects.
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onClick - Click handler
 * @param {React.ReactNode} props.icon - Icon element
 * @param {string} props.label - Accessibility label
 * @param {string} props.color - Color classes for hover state
 * 
 * @returns {JSX.Element} Share button component
 */
function ShareButton({
	onClick,
	icon,
	label,
	color,
}: {
	onClick: () => void
	icon: React.ReactNode
	label: string
	color: string
}) {
	return (
		<button
			onClick={onClick}
			aria-label={label}
			className={`
				flex flex-col items-center justify-center gap-1
				p-3 rounded-lg border-2 transition-all duration-200
				bg-slate-700/30 text-slate-400 border-slate-600
				hover:scale-105 active:scale-95
				${color}
			`}
		>
			{icon}
			<span className='text-xs font-medium hidden md:block'>{label}</span>
		</button>
	)
}

