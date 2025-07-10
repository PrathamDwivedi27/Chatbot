/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config");

module.exports = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        // Custom colors for dark theme
        primary: {
          ...defaultConfig.theme.extend.colors.primary,
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        // Add custom fonts if needed
        'inter': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-bold': ['Inter-Bold'],
      },
      borderRadius: {
        ...defaultConfig.theme.extend.borderRadius,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    ...defaultConfig.plugins,
    require("tailwindcss-animate"),
  ],
}