import { metadata as baseMetadata } from 'components/Partial/Header/seoConfig'
export const metadata = baseMetadata;
//import { Html, Head, Main, NextScript } from 'next/document';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import './globals.css'
import './media600px.css'
import './media1080px.css'
import LoadEruda from './LoadEruda';
import ReduxWrapper from 'components/ApolloProvider/ReduxWrapper'
import { ShoppingCartProvider } from 'components/context/ShoppingCartProvider'
import * as React from "react";
import SEO from 'components/Partial/Header/Seo';
import SmoothScrollPolyfill from 'components/Partial/Header/SmoothScrollPolyfill';
import { NotificationProvider } from 'components/context/NotificationContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'components/cookies/Cookie'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer/>
      <SmoothScrollPolyfill/>
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
