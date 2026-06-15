import { heroui } from '@heroui/react'

const zincLight = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    DEFAULT: '#18181b',
    foreground: '#fafafa',
}

const zincDark = {
    50: '#18181b',
    100: '#27272a',
    200: '#3f3f46',
    300: '#52525b',
    400: '#71717a',
    500: '#a1a1aa',
    600: '#d4d4d8',
    700: '#e4e4e7',
    800: '#f4f4f5',
    900: '#fafafa',
    DEFAULT: '#fafafa',
    foreground: '#18181b',
}

export default heroui({
    themes: {
        light: {
            colors: {
                primary: zincLight,
                secondary: zincLight,
                default: zincLight,
                focus: '#18181b',
                background: '#fafafa',
                foreground: '#18181b',
            },
        },
        dark: {
            colors: {
                primary: zincDark,
                secondary: zincDark,
                default: zincDark,
                focus: '#fafafa',
                background: '#18181b',
                foreground: '#fafafa',
            },
        },
    },
})
