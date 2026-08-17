'use client'

import dynamic from 'next/dynamic'

export const ExtractColorsV2Dynamic = dynamic(
	() => import('./ExtractColorsV2Client').then(mod => mod.ExtractColorsV2Client),
	{ loading: () => <Loading label='Loading Color Extractor...' />, ssr: false }
)

function Loading({ label }: { label: string }) {
	return <div className='flex min-h-[400px] items-center justify-center'><div className='text-center'><div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600' /><p className='text-slate-600'>{label}</p></div></div>
}
