/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    black: '#000000',
                    red: {
                        dark: '#4d0303',
                        light: '#760404',
                    },
                    cream: '#ffeac7',
                    white: '#ffffff',
                }
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Plus Jakarta Sans', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
            }
        }
    },
    plugins: [],
}
