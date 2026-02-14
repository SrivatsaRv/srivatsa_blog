/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                hud: {
                    black: '#F0F2F5', // Layout Background (Cool Gray)
                    dark: '#FFFFFF',  // Component Background (White)
                    gray: '#E4E7EB',  // Hover states
                    border: '#D1D9E0', // Borders (High contrast)
                    text: '#1C2127',   // Primary Text (Ink)
                    muted: '#5F6B7C',  // Secondary Text
                    accent: '#0052CC', // Technical Blue
                    warning: '#B46602', // Dark Orange
                    success: '#037f4c', // Dark Green
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
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
