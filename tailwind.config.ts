import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
      colors: {
        /* Primary Colors */
        'primary-50': 'var(--color-primary-50)',
        'primary-100': 'var(--color-primary-100)',
        'primary-200': 'var(--color-primary-200)',
        'primary-300': 'var(--color-primary-300)',
        'primary-400': 'var(--color-primary-400)',
        'primary-500': 'var(--color-primary-500)',
        'primary-600': 'var(--color-primary-600)',
        'primary-700': 'var(--color-primary-700)',
        'primary-800': 'var(--color-primary-800)',
        'primary-900': 'var(--color-primary-900)',
        
        /* Success Colors */
        'success-50': 'var(--color-success-50)',
        'success-100': 'var(--color-success-100)',
        'success-200': 'var(--color-success-200)',
        'success-300': 'var(--color-success-300)',
        'success-400': 'var(--color-success-400)',
        'success-500': 'var(--color-success-500)',
        'success-600': 'var(--color-success-600)',
        'success-700': 'var(--color-success-700)',
        'success-800': 'var(--color-success-800)',
        'success-900': 'var(--color-success-900)',
        
        /* Warning Colors */
        'warning-50': 'var(--color-warning-50)',
        'warning-100': 'var(--color-warning-100)',
        'warning-200': 'var(--color-warning-200)',
        'warning-300': 'var(--color-warning-300)',
        'warning-400': 'var(--color-warning-400)',
        'warning-500': 'var(--color-warning-500)',
        'warning-600': 'var(--color-warning-600)',
        'warning-700': 'var(--color-warning-700)',
        'warning-800': 'var(--color-warning-800)',
        'warning-900': 'var(--color-warning-900)',
        
        /* Error Colors */
        'error-50': 'var(--color-error-50)',
        'error-100': 'var(--color-error-100)',
        'error-200': 'var(--color-error-200)',
        'error-300': 'var(--color-error-300)',
        'error-400': 'var(--color-error-400)',
        'error-500': 'var(--color-error-500)',
        'error-600': 'var(--color-error-600)',
        'error-700': 'var(--color-error-700)',
        'error-800': 'var(--color-error-800)',
        'error-900': 'var(--color-error-900)',
        
        /* Gray Colors */
        'gray-50': 'var(--color-gray-50)',
        'gray-100': 'var(--color-gray-100)',
        'gray-200': 'var(--color-gray-200)',
        'gray-300': 'var(--color-gray-300)',
        'gray-400': 'var(--color-gray-400)',
        'gray-500': 'var(--color-gray-500)',
        'gray-600': 'var(--color-gray-600)',
        'gray-700': 'var(--color-gray-700)',
        'gray-800': 'var(--color-gray-800)',
        'gray-900': 'var(--color-gray-900)',
        
        /* Shadcn UI Colors */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        /* Semantic color aliases */
        blue: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        green: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
        },
        yellow: {
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          800: 'var(--color-warning-800)',
          900: 'var(--color-warning-900)',
        },
        red: {
          50: 'var(--color-error-50)',
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
          400: 'var(--color-error-400)',
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          800: 'var(--color-error-800)',
          900: 'var(--color-error-900)',
        }
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
