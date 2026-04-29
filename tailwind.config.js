/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pest: '#299D91',
        'pest-200': '#1d756c',
        pBlack: '#191D23',
        sBlack: '#525256',
        pGray: '#666666',
        sGray: '#878787',
        phGray: '#999DA3',
        lightGray: '#D1D1D1',
        'lightGray-200': '#E8E8E8',
        'lightGray-300': '#9F9F9F',
        bGray: '#D0D5DD',
        pRed: '#E73D1C',
        'pRed-200': '#c53215',
        finance: {
          bg: '#F4F7FB',
          ink: '#101828',
          muted: '#667085',
          surface: '#FFFFFF',
          panel: '#F1F1F1',
          border: '#E4E7EC',
          accent: '#7C3AED',
          teal: '#14B8A6',
          pink: '#EC4899',
          orange: '#F97316',
          success: '#16A34A',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        card: '0 18px 45px -28px rgba(16, 24, 40, 0.45)',
        soft: '0 12px 30px -24px rgba(16, 24, 40, 0.35)',
        glow: '0 16px 45px -24px rgba(124, 58, 237, 0.55)',
      },
    },
  },
  plugins: [],
};
