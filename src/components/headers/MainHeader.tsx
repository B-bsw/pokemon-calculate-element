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

    return (
        <Navbar
            isBordered
            classNames={{
                base: 'bg-black',
            }}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden"
            />
            <NavbarContent justify="start" className="max-md:hidden">
                <Tabs
                    selectedKey={routeOfTabs}
                    variant="light"
                    color="primary"
                    // isVertical={vertical}
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
            </NavbarContent>

            <NavbarMenu className='bg-zinc-800'>
                <NavbarItem>
                     <Link size='lg' href={'/pokemon'} className='w-full'>
                        {t('pokelist')}
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link size='lg' href={'/pokemon/calculate'} className='w-full'>
                        {t('calem')}
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link size='lg' href={'/pokemon/elements'} className='w-full'>
                        {t('tableem')}
                    </Link>
                </NavbarItem>
            </NavbarMenu>
        </Navbar>

        // <header
        //     ref={headerRef}
        //     className="fixed top-0 left-0 z-50 h-22 w-full bg-white shadow not-dark:bg-black not-dark:shadow-zinc-700/30 max-md:h-32"
        // >
        //     <div className="flex h-full items-center justify-between px-4 md:px-6">
        //         <Tabs
        //             selectedKey={routeOfTabs}
        //             variant="light"
        //             color="primary"
        //             isVertical={vertical}
        //         >
        //             <Tab
        //                 key="/pokemon"
        //                 title={t('pokelist')}
        //                 onClick={() => router.push('/pokemon')}
        //             />
        //             <Tab
        //                 key="/pokemon/calculate"
        //                 title={t('calem')}
        //                 onClick={() => router.push('/pokemon/calculate')}
        //             />
        //             <Tab
        //                 key="/pokemon/elements"
        //                 title={t('tableem')}
        //                 onClick={() => router.push('/pokemon/elements')}
        //             />
        //         </Tabs>
        //         <div className="flex h-full flex-col items-center justify-evenly">
        //             <div>
        //                 <Switch
        //                     thumbIcon={({ className }) =>
        //                         !isDarkMode ? (
        //                             <SunIcon className={className} />
        //                         ) : (
        //                             <MoonIcon className={className} />
        //                         )
        //                     }
        //                     isSelected={isDarkMode}
        //                     onValueChange={(value) =>
        //                         setTheme(value ? 'dark' : 'light')
        //                     }
        //                 >
        //                     <span className="font-medium not-dark:text-white">
        //                         Dark mode
        //                     </span>
        //                 </Switch>
        //             </div>
        //             <Tabs
        //                 variant="underlined"
        //                 color="primary"
        //                 selectedKey={lang}
        //                 size="sm"
        //                 onSelectionChange={(key) => setLang(key as 'en' | 'th')}
        //             >
        //                 <Tab title="TH" key="th" />
        //                 <Tab title="EN" key="en" />
        //             </Tabs>
        //         </div>
        //     </div>
        // </header>
    )
}

export default MainHeader
