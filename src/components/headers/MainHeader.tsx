'use client'
import React, { useEffect, useState } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import { Tab, Tabs } from '@heroui/react'
import { useRouter, usePathname } from 'next/navigation'

const MainHeader = () => {
    const path = usePathname()
    const { t, lang, setLang } = useTranslate()
    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const route = useRouter()

    useEffect(() => {
        setRouteOfTabs(path)
    }, [path])

    return (
        <>
            <header className="fixed h-20 w-full overflow-hidden bg-zinc-200">
                <div className="flex h-full flex-wrap items-center justify-center max-xl:flex-col max-xl:items-center">
                    <div className="flex-1">
                        <Tabs
                            variant="light"
                            color="primary"
                            selectedKey={routeOfTabs}
                        >
                            <Tab
                                key="/pokemon"
                                title={t('pokelist')}
                                onClick={() => route.push('/pokemon')}
                            />
                            <Tab
                                key="/pokemon/calculate"
                                title={t('calem')}
                                onClick={() => route.push('/pokemon/calculate')}
                            />
                            <Tab
                                key="/pokemon/elements"
                                title={t('tableem')}
                                onClick={() => route.push('/pokemon/elements')}
                            />
                        </Tabs>
                    </div>
                    <div>
                        <Tabs
                            variant="underlined"
                            color="primary"
                            selectedKey={lang}
                            onSelectionChange={(key) =>
                                setLang(key as 'en' | 'th')
                            }
                        >
                            <Tab title="TH" key="th" />
                            <Tab title="EN" key="en" />
                        </Tabs>
                    </div>
                </div>
            </header>
        </>
    )
}

export default MainHeader
