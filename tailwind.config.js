/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'var(--color-background)',
        primary: 'var(--color-background-primary)',
        secondary: 'var(--color-background-secondary)',
        tertiary: 'var(--color-background-tertiary)',
        quaternary: 'var(--color-background-quaternary)',
        quinary: 'var(--color-background-quinary)'
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)'
      },
      borderColor: {
        primary: 'var(--color-border-primary)'
      },
      gradientColorStops: {
        primary: 'var(--color-background-primary)',
        secondary: 'var(--color-background-secondary)',
        tertiary: 'var(--color-background-tertiary)',
        quaternary: 'var(--color-background-quaternary)',
        quinary: 'var(--color-background-quinary)'
      },
      placeholderColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)'
      },
      caretColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
