/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/**/**/*.{js,ts,jsx,tsx}',
        './src/**/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            main: '#5b21b6',
            secondary: '#f3f4f6',
            inactive: '#9ca3af',
            error: '#ef4444',
        },
        extend: {},
    },
    plugins: [],
}
