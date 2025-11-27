import { createThemes } from './src/features/theme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
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
        'primary': '#3b82f6',   
        'secondary': '#8b5cf6',  
        'accent': '#f59e0b',     
        'base-100': '#ffffff',   
        'base-200': '#f3f4f6',     
        'base-300': '#e5e7eb',    
        'base-content': '#1f2937', 
        'muted': '#6b7280',       
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      dark: {
        'primary': '#60a5fa',   
        'secondary': '#a78bfa',
        'accent': '#fbbf24',
        'base-100': '#1f2937',  
        'base-200': '#111827',    
        'base-300': '#374151',   
        'base-content': '#f9fafb',
        'muted': '#9ca3af',
        'success': '#34d399',
        'warning': '#fbbf24',
        'error': '#f87171',
        'info': '#60a5fa',
      },
    }),
  ],
}
