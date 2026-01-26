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
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
           backgroundImage: {
            switch: "var(--color-switchBorder)",
            thumb: "var(--color-thumbBg)",
            sidebarOverlay: "var(--color-sidebarOverlay)",//
          },
          boxShadow: {
            dropdown: "0px 2px 6px 0px rgba(0,0,0,0.15)",
          },
        },
    },
    plugins: [
    createThemes({
      
      light: {
        'primary': '#0F172A', //
        'primarySelected': '#6C7CFF', //
        'primaryDark': '#001E32',
        'primaryLight': '#0968AC',
        'secondary': '#475569',  //
        'secondaryText': '#A6ADCF',  //
        'accent': '#7F1917',     
        'default': '#D3E0FC', //
        'disabled': '#94A3B8', //
        'danger': '#EF4444', //
        'dangerHover': '#DC2626', //
        'borderFocus': '#3E0DA8', //
        'switchBorder': 'url("@/app/assets/backgrounds/light-icon.png")',
        'switchBg': '#FFD22F',
        'thumbBg': "linear-gradient(to bottom, #F5F995, #ECA123)",
        'sidebarOverlay': "linear-gradient(180deg, #6CA3FF4D 0%, #B58BFF4D 50%, #64FFE24D 100%)", //
        'sidebarBg': "#192132", //
        'subtle': '#F0F1F3',     //
        'toggle': '#283F78',    
        'base-content': '#001E32',
        'placeholder': '#6E6E6E',
        // 'muted': '#6b7280',       
        // 'success': '#10b981',
        // 'warning': '#f59e0b',
        'error': '#ef4444',
        // 'info': '#3b82f6',
      },
      dark: {
        'primary': '#0F172A',  
        'primarySelected': '#6C7CFF', //
        'primaryText': '#E6E9F5', //
        'primaryDark': '#A62023',
        'primaryLight': '#510D00',
        'secondary': '#7F1917',
        'secondaryText': '#A6ADCF',  //
        'accent': '#FFFFFF99',
        'default': '#D3E0FC', //
        'borderFocus': '#3E0DA8', //
        'disabled': '#94A3B8', //
        'switchBorder': 'url("@/app/assets/backgrounds/dark-icon.png")',
        'switchBg': '#D2D9E3',
        'thumbBg': "linear-gradient(to bottom, #CECECE66, #CECECE)",
        'sidebarOverlay': "linear-gradient(180deg,#6CA3FF4D_0%,#B58BFF4D_50%,#64FFE24D_100%)", //
        'sidebarBg': "#192132", //
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
