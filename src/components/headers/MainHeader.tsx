'use client'
import React from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import { Tab, Tabs } from '@heroui/react'

const MainHeader = () => {
    const { t, lang, setLang } = useTranslate()
    return (
        <>
            <header className="fixed h-10 w-full overflow-hidden bg-zinc-200">
                <div className="flex h-full flex-row-reverse items-center px-6">
                    <Tabs
                        variant="underlined"
                        color="primary"
                        selectedKey={lang}
                        onSelectionChange={(key) => setLang(key as 'en' | 'th')}
                    >
                        <Tab title="TH" key="th" />
                        <Tab title="EN" key="en" />
                    </Tabs>
                </div>
            </header>
        </>
    )
}

export default MainHeader
