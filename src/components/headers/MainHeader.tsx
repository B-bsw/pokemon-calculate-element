'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import { Tab, Tabs } from '@heroui/react'
import { useRouter, usePathname } from 'next/navigation'

const MainHeader = () => {
    const path = usePathname()
    const { t, lang, setLang } = useTranslate()
    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const router = useRouter()

    const [vertical, setVertical] = useState(false)
    const headerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setRouteOfTabs(path)
    }, [path])

    useEffect(() => {
        const checkSize = () => {
            const width = window.innerWidth
            setVertical(width < 768)
        }

        checkSize()
        window.addEventListener('resize', checkSize)

        return () => window.removeEventListener('resize', checkSize)
    }, [])

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 z-50 h-20 w-full border-b border-zinc-200 bg-white/80 shadow-sm backdrop-blur-md max-md:h-30"
        >
            <div className="flex h-full items-center justify-between px-4 md:px-6">
                <Tabs
                    selectedKey={routeOfTabs}
                    variant="light"
                    color="primary"
                    isVertical={vertical}
                >
                    <Tab
                        key="/pokemon"
                        title={t('pokelist')}
                        onClick={() => router.push('/pokemon')}
                    />
                    <Tab
                        key="/pokemon/calculate"
                        title={t('calem')}
                        onClick={() => router.push('/pokemon/calculate')}
                    />
                    <Tab
                        key="/pokemon/elements"
                        title={t('tableem')}
                        onClick={() => router.push('/pokemon/elements')}
                    />
                </Tabs>
                <Tabs
                    variant="underlined"
                    color="primary"
                    selectedKey={lang}
                    size="sm"
                    onSelectionChange={(key) => setLang(key as 'en' | 'th')}
                >
                    <Tab title="TH" key="th" />
                    <Tab title="EN" key="en" />
                </Tabs>
            </div>
        </header>
    )
}

export default MainHeader
