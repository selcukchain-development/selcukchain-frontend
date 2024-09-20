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
	  DEFAULT: '#3B82F6', // Modern mavi
	  light: '#93C5FD',
	  dark: '#1D4ED8',
	},
	secondary: {
	  DEFAULT: '#10B981', // Modern yeşil
	  light: '#6EE7B7',
	  dark: '#059669',
	},
	accent: {
	  DEFAULT: '#8B5CF6', // Modern mor
	  light: '#C4B5FD',
	  dark: '#6D28D9',
	},
	neutral: {
	  DEFAULT: '#6B7280', // Modern gri
	  light: '#D1D5DB',
	  dark: '#374151',
	},
  },
  
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
