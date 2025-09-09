/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      tablet: "1080px", 
    },
    extend: {
      fontFamily: {
        kmitl: ["KMITLGO"],
      },
      colors: {
        text: {
          title: '#292C30',
          subtitle: '#5A6169',
          body: '#5A6169',
          caption: '#8B96A2',
          brand: '#F16323',
          light: '#FFFFFF',
        },
        background: {
          white: '#000000',
          default: '#000000',
          brand: '#F16323',
          light:'#FEEFE9',
        },
        success: {
          text: '#22a119',
          'bg-light': '#E9F6E8',
          'bg-dark': '#146110',
        },
        disable: {
          text: '#22a119',
          'bg-light': '#E8EAEC',
          'bg-dark': '#E8EAEC',
        },
        error: {
          text: '#e32526',
          'bg-light': '#FCE9E9',
          'bg-dark': '#881617',
        },
        warning: {
          text: '#f5be0c',
          'bg-light': '#FEF8E7',
          'bg-dark': '#937207',
        },
        waste: {
          rdf: {
            bg: "#838383",
            icon: "#A2ABB5",
            text: "#FFFFFF",
          },
          general: {
            bg: "#235B90",
            icon: "#235B90",
            text: "#FFFFFF",
          },
          plastic: {
            bg: "#F6B31E",
            icon: "#F5BE0C",
            text: "#000000",
          },
          glass: {
            bg: "#F6B31E",
            icon: "#F5BE0C",
            text: "#000000",
          },
          food: {
            bg: "#00712C",
            icon: "#00712C",
            text: "#FFFFFF",
          },
        },
      },
      fontSize: {
        'hero': ['120px', { lineHeight: '144px' }],
        'heading-xl': ['96px', { lineHeight: '120px' }],
        'heading-l': ['60px', { lineHeight: '68px' }],
        'heading-m': ['40px', { lineHeight: '52px' }],
        'heading-s': ['32px', { lineHeight: '40px' }],
        'heading-xs': ['16px', { lineHeight: '24px' }],

        'subheading-l': ['18px', { lineHeight: '28px' }],
        'subheading-m': ['16px', { lineHeight: '24px' }],
        'subheading-s': ['14px', { lineHeight: '20px' }],

        'label-l': ['20px', { lineHeight: '28px' }],
        'label-m': ['16px', { lineHeight: '24px' }],
        'label-s': ['14px', { lineHeight: '20px' }],
        'label-xs': ['12px', { lineHeight: '16px' }],

        'body-l': ['18px', { lineHeight: '28px' }],
        'body-m': ['16px', { lineHeight: '24px' }],
        'body-s': ['14px', { lineHeight: '20px' }],

        'table-m': ['13px', { lineHeight: '20px' }],
        'table-s': ['12px', { lineHeight: '20px' }],
        
        'caption-l': ['14px', { lineHeight: '20px' }],
        'caption-m': ['12px', { lineHeight: '16px' }],
        'caption-s': ['10px', { lineHeight: '14px' }],
      },
      keyframes: {
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" }, 
        },
        leftToRight: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(80px)" },
          "100%": { transform: "translateX(0)" },
        },
        rightToLeft: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-80px)" },
          "100%": { transform: "translateX(0)" },
        },
         floatUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50px)" }, 
        },
      },
      animation: {
        scalePulse: "scalePulse 1.5s ease-in-out infinite",
        leftToRight: "leftToRight 2s ease-in-out infinite",
        rightToLeft: "rightToLeft 2s ease-in-out infinite",
        floatUpDown: "floatUpDown 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
