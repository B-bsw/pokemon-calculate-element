import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Prompt } from 'next/font/google'
import { Providers } from './providers'
import MainHeader from '@/components/headers/MainHeader'
import { I18nProvider } from '@/i18n/i18nContext'
import './globals.css'

const prompt = Prompt({
    variable: '--font-prompt',
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin', 'thai'],
})

export const metadata: Metadata = {
    title: 'POKEMON INFORMATION',
    description: 'ข้อมูลสิ่งต่างกับเกี่ยวกับโปเกม่อน',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
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
                className={`${prompt.variable} **:scrollbar-hide antialiased **:scroll-smooth`}
            >
                <I18nProvider>
                    <Providers>
                        <div className="min-h-dvh w-full max-w-full">
                            <MainHeader />
                            <div className="flex min-h-dvh flex-col bg-zinc-50 pt-16 dark:bg-zinc-900">
                                {children}
                            </div>
                        </div>
                    </Providers>
                </I18nProvider>
            </body>
        </html>
    )
}
