'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function useDarkMode() {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    return { theme: mounted ? theme : undefined, setTheme }
}
