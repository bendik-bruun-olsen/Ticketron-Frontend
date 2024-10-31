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
            },
        },
    },
    plugins: [],
}
