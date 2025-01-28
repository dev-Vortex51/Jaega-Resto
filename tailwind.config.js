/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: `
          "header header header"
          "sidebar main order"
        `,
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.grid-areas-layout': {
          gridTemplateAreas: `
            "header header header"
            "sidebar main order"
          `,
        },
        '.area-header': {
          gridArea: 'header',
        },
        '.area-sidebar': {
          gridArea: 'sidebar',
        },
        '.area-main': {
          gridArea: 'main',
        },
        '.area-order': {
          gridArea: 'order',
        },
      });
    }),
  ],
};
