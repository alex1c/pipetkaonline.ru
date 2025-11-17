# PipetkaOnline - Online Color Tools

A modern web application for working with colors, built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Multi-language support** (Russian, English, German, Spanish)
- 🎨 **Color tools** - Color picker, palette generator, contrast checker
- 📚 **Color theory education** - Learn about color harmony and psychology
- ♿ **Accessibility focused** - WCAG compliant color contrast
- 📱 **Responsive design** - Works on all devices
- ⚡ **Fast and modern** - Built with Next.js App Router

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Deployment:** Vercel-ready

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
pipetkaonline.ru/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Root layout with i18n
│   │   ├── page.tsx         # Home page
│   │   ├── tools/           # Tools section
│   │   ├── learn/           # Learning section
│   │   └── tech/            # Technical pages
│   └── globals.css          # Global styles
├── components/
│   ├── navbar.tsx           # Navigation component
│   └── language-switcher.tsx # Language selector
├── locales/
│   ├── ru/                  # Russian translations
│   ├── en/                  # English translations
│   ├── de/                  # German translations
│   └── es/                  # Spanish translations
├── i18n.ts                  # i18n configuration
└── middleware.ts            # Locale routing middleware
```

## Internationalization

The application supports 4 languages:

- 🇷🇺 Russian (default)
- 🇬🇧 English
- 🇩🇪 German
- 🇪🇸 Spanish

Language is determined by URL path: `/ru/`, `/en/`, `/de/`, `/es/`

### Adding Translations

1. Add translation keys to JSON files in `locales/[locale]/`
2. Use the `useTranslations` hook in components
3. Follow the namespace pattern: `common`, `home`, `tools`, `learn`, `tech`

## Development Guidelines

- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Comment code in English
- Use kebab-case for file names
- Use camelCase for functions/variables
- Use PascalCase for components/types

## License

Private project - All rights reserved
