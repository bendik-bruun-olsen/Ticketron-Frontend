/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{html,js,jsx,ts,tsx}',
        './src/components/**/*.{html,js,jsx,ts,tsx}',
        './src/layouts/**/*.{html,js,jsx,ts,tsx}',
        './src/index.html',
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
        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.input-contained': {
                    '@apply bg-red-200 border text-gray-900 focus:outline-none text-sm rounded-2xl focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:focus:ring-red-600 dark:focus:border-red-600':
                        {},
                },

                '.input-field': {
                    '@apply border border-white rounded-md px-4 py-2 focus:ring-red-600 focus:border-red-600 text-black dark:text-white dark:bg-black dark:border-red-600':
                        {},
                },
                '.date-icon': {
                    '@apply w-5 h-5 text-red-600 dark:text-red-700': {},
                },
                '.btn-primary': {
                    '@apply bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600':
                        {},
                },
            })
        },
    ],
}
