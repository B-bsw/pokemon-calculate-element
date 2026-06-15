'use client'
import React, { useEffect, useState } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
    Switch,
    Tab,
    Tabs,
} from '@heroui/react'
import { useRouter, usePathname } from 'next/navigation'
import useDarkMode from '@/hooks/useDarkMode'
import { MoonIcon } from '@/components/icons/MoonIcon'
import { SunIcon } from '@/components/icons/SunIcon'
import logo from '@/app/favicon.ico'
import Image from 'next/image'
import { items } from '@/utils/itemIconList'

const MainHeader = () => {
    const router = useRouter()
    const path = usePathname()

    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const { theme, setTheme } = useDarkMode()
    const { t, lang, setLang } = useTranslate()

    useEffect(() => {
        setRouteOfTabs(path)
        setIsMenuOpen(false)
    }, [path])

    const isDarkMode: boolean = theme === 'dark'

    return (
        <Navbar
            isBlurred={false}
            classNames={{
                base: 'bg-zinc-50 border-b-2 border-zinc-900 dark:bg-zinc-900 dark:border-zinc-50 fixed',
            }}
            maxWidth="full"
            isMenuOpen={isMenuOpen}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="text-zinc-900 dark:text-zinc-50 md:hidden"
                onChange={() => setIsMenuOpen((e) => !e)}
            />

            <NavbarBrand
                onClick={() => router.push('/')}
                className="cursor-pointer"
            >
                <Image src={logo} alt="img" />
            </NavbarBrand>

            <NavbarContent justify="start" className="scll max-md:hidden">
                <Tabs
                    className="min-w-max"
                    selectedKey={routeOfTabs}
                    variant="underlined"
                    color="primary"
                    classNames={{
                        tabContent: 'text-zinc-900 dark:text-zinc-50 font-bold',
                        cursor: 'bg-zinc-900 dark:bg-zinc-50 h-1',
                    }}
                >
                    {items.map((item) => (
                        <Tab
                            key={item.path}
                            title={t(item.nameTrans)}
                            onClick={() => router.push(item.path)}
                        />
                    ))}
                </Tabs>
            </NavbarContent>
            <NavbarContent justify="end">
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
                    />
                </div>
                <Tabs
                    variant="solid"
                    color="primary"
                    selectedKey={lang}
                    size="sm"
                    onSelectionChange={(key) => setLang(key as 'en' | 'th')}
                >
                    <Tab title="TH" key="th" />
                    <Tab title="EN" key="en" />
                </Tabs>
            </NavbarContent>

            <NavbarMenu className="gap-5 bg-zinc-50 py-10 dark:bg-zinc-900">
                {items.map((item) => {
                    const Ic = item.icon
                    return (
                        <NavbarItem
                            key={item.id}
                            className={`${routeOfTabs === item.path && '**:text-primary'}`}
                        >
                            <Button
                                fullWidth
                                variant="light"
                                startContent={<Ic className="text-zinc-900 dark:text-zinc-50" />}
                                onPress={() => router.push(item.path)}
                                className="text-zinc-900 dark:text-zinc-50 font-bold hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 border-2 border-transparent hover:border-zinc-900 dark:hover:border-zinc-50 rounded-lg transition-colors"
                            >
                                <div className="w-full text-start">
                                    {t(item.nameTrans)}
                                </div>
                            </Button>
                        </NavbarItem>
                    )
                })}
            </NavbarMenu>
        </Navbar>
    )
}

export default MainHeader
