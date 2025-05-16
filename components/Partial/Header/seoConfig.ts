// lib/seoConfig.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Crowd - Your Ultimate Marketplace',
  description: 'Discover top products and deals on E-Crowd. Shop smarter and faster with our user-friendly platform.',
  keywords: 'E-Crowd, online shopping, best deals, marketplace, e-commerce',
  authors: [{ name: 'E-Crowd Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://new-client-legitem.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'E-Crowd - Your Ultimate Marketplace',
    description: 'Discover top products and deals on E-Crowd.',
    url: 'https://new-client-legitem.vercel.app',
    siteName: 'E-Crowd',
    images: [
      {
        url: '/image/Crowd.svg',
        width: 1200,
        height: 630,
        alt: 'E-Crowd Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Crowd - Your Ultimate Marketplace',
    description: 'Discover top products and deals on E-Crowd.',
    images: ['/image/Crowd.svg'],
  },
}
