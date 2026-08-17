'use client'

import dynamic from 'next/dynamic'

export const GradientMapGeneratorDynamic = dynamic(
	() => import('./GradientMapGeneratorClient').then(mod => mod.GradientMapGeneratorClient),
	{ loading: () => <Loading label='Loading Gradient Map Generator...' />, ssr: false }
)

function Loading({ label }: { label: string }) {
	return <div className='flex min-h-[400px] items-center justify-center'><div className='text-center'><div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600' /><p className='text-slate-600'>{label}</p></div></div>
}
