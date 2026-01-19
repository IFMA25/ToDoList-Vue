import { createThemes } from './src/features/theme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
          maxWidth: {
              'screen-2xl': '1920px',
            },
            fontFamily: {
                sans: ['Open Sans', 'system-ui', 'sans-serif'],
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
           backgroundImage: {
            switch: "var(--color-switchBorder)",
            thumb: "var(--color-thumbBg)",
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
        'border': '#D3E0FC', //
        'disabled': '#94A3B8', //
        'borderFocus': '#3E0DA8', //
        'switchBorder': 'url("@/app/assets/backgrounds/light-icon.png")',
        'switchBg': '#FFD22F',
        'thumbBg': "linear-gradient(to bottom, #F5F995, #ECA123)",
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
        'border': '#D3E0FC', //
        'borderFocus': '#3E0DA8', //
        'disabled': '#94A3B8', //
        'switchBorder': 'url("@/app/assets/backgrounds/dark-icon.png")',
        'switchBg': '#D2D9E3',
        'thumbBg': "linear-gradient(to bottom, #CECECE66, #CECECE)",

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
