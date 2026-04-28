'use client'
import React, { useEffect, useState, useRef } from 'react'
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
                base: 'bg-black dark:bg-zinc-400/80 fixed',
            }}
            maxWidth="full"
            isMenuOpen={isMenuOpen}
        >
            {/*burger*/}
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden"
                onChange={() => {
                    setIsMenuOpen((e) => !e)
                }}
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
                        tabContent: 'dark:text-black',
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
                    ></Switch>
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

            {/*mobile navbar*/}
            <NavbarMenu className="gap-5 bg-zinc-900 py-10 dark:bg-zinc-200">
                {items.map((item) => {
                    const Ic = item.icon
                    return (
                        <NavbarItem
                            key={item.id}
                            className={`${routeOfTabs === item.path && '**:text-primary **:dark:text-primary **:hover:text-primary-300 **:dark:**:hover:text-primary-400'}`}
                        >
                            <Button
                                fullWidth
                                startContent={<Ic />}
                                onPress={() => router.push(item.path)}
                            >
                                <div
                                    className={`w-full text-start text-white hover:text-zinc-300 dark:text-black dark:hover:text-zinc-700`}
                                >
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
