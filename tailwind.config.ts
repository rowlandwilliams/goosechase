import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', ...fontFamily.sans],
                haas: ['var(--font-haas)'],
                inter: ['var(--font-inter)'],
            },
            colors: {
                primary: colors.indigo[500],
            },
        },
    },
    plugins: [],
} satisfies Config;
