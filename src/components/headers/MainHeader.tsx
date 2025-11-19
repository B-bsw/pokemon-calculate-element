'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import { Switch, Tab, Tabs } from '@heroui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '@heroui/use-theme'

export const MoonIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                fill="currentColor"
            />
        </svg>
    )
}

export const SunIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <g fill="currentColor">
                <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
            </g>
        </svg>
    )
}

const MainHeader = () => {
    const path = usePathname()
    const { t, lang, setLang } = useTranslate()
    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const router = useRouter()
    const { theme, setTheme } = useTheme()

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
            className="fixed top-0 left-0 z-50 h-20 w-full bg-white shadow not-dark:bg-black not-dark:shadow-zinc-700/30 max-md:h-30"
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
                <div className="flex flex-col items-center">
                    <div>
                        <Switch
                            thumbIcon={({ isSelected, className }) =>
                                !isSelected ? (
                                    <SunIcon className={className} />
                                ) : (
                                    <MoonIcon className={className} />
                                )
                            }
                            onValueChange={(e) =>
                                !e ? setTheme('light') : setTheme('dark')
                            }
                        >
                            <span className="font-medium not-dark:text-white">Dark mode</span>
                        </Switch>
                    </div>
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
            </div>
        </header>
    )
}

export default MainHeader
