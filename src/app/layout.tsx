import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import MainHeader from '@/components/headers/MainHeader'
import { I18nProvider } from '@/i18n/i18nContext'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'POKEMON CAL TYPE',
    description: 'make by bbsw',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <I18nProvider>
                    <Providers>
                        <div>
                            <MainHeader />
                            <div className=" not-dark:bg-zinc-800">
                                {children}
                            </div>
                        </div>
                    </Providers>
                </I18nProvider>
            </body>
        </html>
    )
}
