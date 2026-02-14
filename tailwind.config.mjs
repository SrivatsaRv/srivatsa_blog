/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                hud: {
                    black: '#050505',
                    dark: '#0A0A0A',
                    gray: '#111111',
                    border: '#333333',
                    text: '#EEEEEE',
                    muted: '#888888',
                    accent: '#00FFFF', // Cyan
                    warning: '#FFAA00', // Orange
                    success: '#00FF00', // Green
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            spacing: {
                '128': '32rem',
            }
        },
    },
    plugins: [],
}
