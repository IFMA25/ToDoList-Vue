import { createThemes } from './src/features/theme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', 'system-ui', 'sans-serif'],
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
        },
    },
    plugins: [
    createThemes({
      light: {
        'primary': '#FFFFFFDB', 
        'primaryDark': '#001E32',
        'primaryLight': '#0968AC',
        'secondary': '#012E43',  
        'accent': '#7F1917',     
        'border': '#27272766',   
        // 'base-200': '#f3f4f6',     
        // 'base-300': '#e5e7eb',    
        'base-content': '#001E32',
        'placeholder': '#6E6E6E',
        // 'muted': '#6b7280',       
        // 'success': '#10b981',
        // 'warning': '#f59e0b',
        'error': '#ef4444',
        // 'info': '#3b82f6',
      },
      dark: {
        'primary': '#000000B2',  
        'primaryDark': '#A62023',
        'primaryLight': '#510D00',
        'secondary': '#7F1917',
        'accent': '#FFFFFF99',
        'border': '#FFFFFF99',
        'placeholder': '#FFFFFF99',   
        // 'base-200': '#111827',    
        // 'base-300': '#374151',   
        'base-content': '#FFFFFF',
        // 'muted': '#9ca3af',
        // 'success': '#34d399',
        // 'warning': '#fbbf24',
        'error': '#f87171',
        // 'info': '#60a5fa',
      },
    }),
  ],
}
