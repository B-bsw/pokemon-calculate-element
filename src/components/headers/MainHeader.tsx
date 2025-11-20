'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import { Switch, Tab, Tabs } from '@heroui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { MoonIcon } from '@/components/icons/MoonIcon'
import { SunIcon } from '@/components/icons/SunIcon'

const MainHeader = () => {
    const path = usePathname()
    const { t, lang, setLang } = useTranslate()
    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const router = useRouter()
    const { resolvedTheme, setTheme } = useTheme()
    const [vertical, setVertical] = useState(false)
    const headerRef = useRef<HTMLDivElement | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    useEffect(() => setRouteOfTabs(path), [path])
    useEffect(() => {
        const checkSize = () => setVertical(window.innerWidth < 768)
        checkSize()
        window.addEventListener('resize', checkSize)
        return () => window.removeEventListener('resize', checkSize)
    }, [])

    if (!mounted) return null

    const isDarkMode = resolvedTheme === 'dark'

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
                            thumbIcon={({ className }) =>
                                !isDarkMode ? (
                                    <SunIcon className={className} />
                                ) : (
                                    <MoonIcon className={className} />
                                )
                            }
                            isSelected={isDarkMode}
                            onValueChange={(value) =>
                                setTheme(value ? 'dark' : 'light')
                            }
                        >
                            <span className="font-medium not-dark:text-white">
                                Dark mode
                            </span>
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
