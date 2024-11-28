/** @type {import('tailwindcss').Config} */

const getColor = (colorVar, { opacityVariable, opacityValue }) => {
  if (opacityValue !== undefined) {
    return `hsl(from var(${colorVar}) h s l / ${opacityValue})`;
  }
  if (opacityVariable !== undefined) {
    return `hsl(from var(${colorVar}) h s l / var(${opacityVariable})))`;
  }

  return `hsl(from var(${colorVar}) h s l)`;
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    // TODO: container breaks som old styles
    container: {
      center: true,
      padding: {
        DEFAULT: '0',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      background: {
        aboba: 'var(--main-background)',
      },
      backgroundColor: {
        amogus: 'hsl(var(--primary))',
      },
      colors: {
        background: (params) => getColor('--background', params),
        foreground: (params) => getColor('--foreground', params),
        primary: {
          DEFAULT: (params) => getColor('--primary', params),
          foreground: (params) => getColor('--primary-foreground', params),
        },

        // WARN: in order to use vars below, need to wrap in getColor
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: ['ff-scrollbar'],
};
