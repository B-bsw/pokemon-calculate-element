import { heroui } from '@heroui/react'

export default heroui({
    themes: {
        light: {
            colors: {
                primary: {
                    DEFAULT: '#18181b',
                    foreground: '#fafafa',
                },
                secondary: {
                    DEFAULT: '#fafafa',
                    foreground: '#18181b',
                },
                focus: '#18181b',
                background: '#fafafa',
                foreground: '#18181b',
            },
        },
        dark: {
            colors: {
                primary: {
                    DEFAULT: '#fafafa',
                    foreground: '#18181b',
                },
                secondary: {
                    DEFAULT: '#18181b',
                    foreground: '#fafafa',
                },
                focus: '#fafafa',
                background: '#18181b',
                foreground: '#fafafa',
            },
        },
    },
})
