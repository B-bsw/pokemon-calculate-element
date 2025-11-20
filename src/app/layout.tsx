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
    // themeColor: 'gray',
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
                        <MainHeader />
                        <div className="pt-25 max-md:pt-35">{children}</div>
                    </Providers>
                </I18nProvider>
            </body>
        </html>
    )
}
