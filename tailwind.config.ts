import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0D6EFD',  // Canlı bir mavi
                    light: '#5CB8FF',    // Açık mavi
                    dark: '#0A58CA',     // Daha koyu mavi
                },
                secondary: {
                    DEFAULT: '#198754',  // Daha modern bir yeşil
                    light: '#6EDFAF',    // Canlı açık yeşil
                    dark: '#14532D',     // Koyu zümrüt yeşili
                },
                accent: {
                    DEFAULT: '#6C63FF',  // Parlak mor
                    light: '#B0AFFF',    // Yumuşak açık mor
                    dark: '#4C46CC',     // Daha koyu mor
                },
                neutral: {
                    DEFAULT: '#64748B',  // Daha ntr, mavi-gri tonları
                    light: '#CBD5E1',    // Açık gri-mavi
                    dark: 'black',     // Koyu gri-mavi
                },
                danger: {
                    DEFAULT: '#DC3545',  // Tehlike kırmızısı
                    light: '#FF7272',    // Canlı açık kırmızı
                    dark: '#B02A37',     // Daha koyu kırmızı
                },
                warning: {
                    DEFAULT: '#FFC107',  // Canlı sarı
                    light: '#FFDD57',    // Açık sarı
                    dark: '#E0A800',     // Daha koyu sarı
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
