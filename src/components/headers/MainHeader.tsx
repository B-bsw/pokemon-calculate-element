'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslate } from '@/i18n/i18nContext'
import {
    Link,
    Navbar,
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

const MainHeader = () => {
    const router = useRouter()
    const path = usePathname()

    const [routeOfTabs, setRouteOfTabs] = useState<string>(path)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const { theme, setTheme } = useDarkMode()
    const { t, lang, setLang } = useTranslate()

    useEffect(() => {
        setRouteOfTabs(path)
    }, [path])

    const isDarkMode: boolean = theme === 'dark'

    const itemNavbar = [
        {
            id: 1,
            nameTrans: 'pokelist',
            path: '/pokemon',
        },
        {
            id: 2,
            nameTrans: 'calem',
            path: '/pokemon/calculate',
        },
        {
            id: 3,
            nameTrans: 'tableem',
            path: '/pokemon/elements',
        },
    ]

    return (
        <Navbar
            classNames={{
                base: 'bg-black dark:bg-zinc-400/80',
            }}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="sm:hidden"
            />
            <NavbarContent justify="start" className="max-sm:hidden">
                <Tabs
                    selectedKey={routeOfTabs}
                    variant="light"
                    color="primary"
                    classNames={{
                        tabContent: 'dark:text-black',
                    }}
                >
                    {itemNavbar.map((item) => (
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
                    >
                        {/* <span className="font-medium not-dark:text-white">
                            Dark mode
                        </span> */}
                    </Switch>
                </div>
                <Tabs
                    variant="underlined"
                    color="primary"
                    selectedKey={lang}
                    size="sm"
                    onSelectionChange={(key) => setLang(key as 'en' | 'th')}
                    classNames={{
                        tabContent: 'dark:text-black',
                    }}
                >
                    <Tab title="TH" key="th" />
                    <Tab title="EN" key="en" />
                </Tabs>
            </NavbarContent>

            <NavbarMenu className="bg-zinc-900 dark:bg-zinc-200">
                {itemNavbar.map((item) => (
                    <NavbarItem key={item.id}>
                        <Link
                            size="lg"
                            href={item.path}
                            className={`my-2 w-full text-white hover:text-zinc-300 dark:text-black dark:hover:text-zinc-700 ${routeOfTabs === item.path && 'text-primary dark:text-primary hover:text-primary-300 dark:hover:text-primary-400'}`}
                        >
                            {t(item.nameTrans)}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default MainHeader
