import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './media600px.css'
import './media1080px.css'
import LoadEruda from './LoadEruda';
import ReduxWrapper from 'components/ApolloProvider/ReduxWrapper'
import { ShoppingCartProvider } from 'components/context/ShoppingCartProvider'
import * as React from "react";
import SEO from 'components/Partial/Header/Seo';
import { NotificationProvider } from 'components/context/NotificationContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'components/cookies/Cookie'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'E-Crowd',
  description: 'Social Media + E-Shopping',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <SEO/>
        
        <link rel="manifest" href='/manifest.json' sizes="any" />
      </head>
      <body className={inter.className}>
      <ToastContainer/>
        <LoadEruda/>
        <NotificationProvider>
          <ShoppingCartProvider>
            <ReduxWrapper>
            <Cookie/>
              {children}
            </ReduxWrapper>
          </ShoppingCartProvider>
        </NotificationProvider>
        
      </body>
    </html>
  )
}
