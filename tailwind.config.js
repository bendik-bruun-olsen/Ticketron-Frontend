/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind')

module.exports = {
    content: [
        './src/pages/**/*.{html,js,jsx,ts,tsx}',
        './src/components/**/*.{html,js,jsx,ts,tsx}',
        './src/layouts/**/*.{html,js,jsx,ts,tsx}',
        './src/index.html',
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                red: {
                    200: 'rgba(126, 37, 49, 0.05)',
                    600: '#880D1E',
                    700: '#5D0713',
                },
                black: '#252525',
                white: '#f5f5f5',
            },
            animation: {
                slideIn: 'slideIn 0.5s ease-out',
                slideOut: 'slideOut 0.5s ease-in',
                slideUp: 'slideUp 0.5s ease-out',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        flowbite.plugin(),
        function ({ addComponents }) {
            addComponents({
                '.input-contained': {
                    '@apply bg-red-200 border text-gray-900 focus:outline-none text-sm rounded-2xl focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:focus:ring-red-600 dark:focus:border-red-600 !important':
                        {},
                },
                '.input-contained-icon': {
                    '@apply input-contained pl-10 !important': {},
                },
                '.chip': {
                    '@apply bg-red-200 rounded-xl max-w-fit pr-3 pl-3 pt-1 pb-1':
                        {},
                },
                '.red-icon': {
                    '@apply size-6 text-red-700': {},
                },

                '.date-padding ': {
                    '@apply pl-5 !important': {},
                },

                '.btn-primary': {
                    '@apply text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 !important':
                        {},
                },
                '.h1': {
                    '@apply text-2xl font-bold': {},
                },
                '.fab': {
                    '@apply p-0 w-12 h-12 bg-red-600 fixed flex items-center justify-center rounded-full hover:bg-red-700 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none':
                        {},
                },
                '.heading-links': {
                    '@apply flex items-center justify-between': {},
                },
            })
        },
    ],
}
