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
              DEFAULT: '#3B82F6', // blue-500
              light: '#60A5FA', // blue-400
              dark: '#1E3A8A', // blue-700
            },
            secondary: {
              DEFAULT: '#FBBF24', // amber-500
              light: '#FCD34D', // amber-400
              dark: '#B45309', // amber-600
            },
            accent: {
              DEFAULT: '#06B6D4', // cyan-500
              light: '#67E8F9', // cyan-400
              dark: '#0E7490', // cyan-600
            },
            muted: {
              foreground: '#9CA3AF', // gray-400
              background: '#F9FAFB', // gray-50
            },
            card: '#FFFFFF', // white
            background: '#1F2937', // gray-800
          },
        },
      },
      
    plugins: [require("tailwindcss-animate")],
};
export default config;
