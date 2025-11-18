# Architecture Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architectural Principles](#architectural-principles)
4. [Project Structure](#project-structure)
5. [Internationalization (i18n)](#internationalization-i18n)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [Styling Architecture](#styling-architecture)
9. [Routing Architecture](#routing-architecture)
10. [Performance Optimization](#performance-optimization)
11. [Security Considerations](#security-considerations)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)

---

## Project Overview

**PipetkaOnline** is a modern, multilingual web application for color-related tools and education. The application provides:

- **Color Tools**: Color picker, palette generator, contrast checker, color converter, gradient generator
- **Educational Content**: Color theory, harmony, psychology, accessibility guides
- **Multi-language Support**: Russian (default), English, German, Spanish
- **Accessibility**: WCAG 2.1 compliant contrast checking and accessibility features

### Key Characteristics

- **Server-Side Rendering (SSR)**: All pages are pre-rendered for optimal SEO and performance
- **Static Site Generation (SSG)**: Pages are generated at build time for all locales
- **Client-Side Interactivity**: Interactive tools use React hooks and client components
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## Technology Stack

### Core Framework

- **Next.js 14+** (App Router)
  - Server Components by default
  - Client Components when needed (`'use client'`)
  - File-based routing with dynamic segments
  - Built-in optimization (images, fonts, scripts)

### Language & Type Safety

- **TypeScript 5+**
  - Strict mode enabled
  - Path aliases (`@/*` for root imports)
  - Type inference and type safety throughout

### Internationalization

- **next-intl 3.15+**
  - Server-side and client-side translations
  - Locale-based routing
  - Message namespacing
  - Automatic locale detection

### Styling

- **Tailwind CSS 3.4+**
  - Utility-first CSS framework
  - Responsive design utilities
  - Custom theme configuration
  - PostCSS for processing

### Fonts

- **Inter** (Google Fonts)
  - Latin and Cyrillic subsets
  - Multiple weights (300-900)
  - CSS variable for easy usage

---

## Architectural Principles

### 1. Server Components First

**Principle**: Default to Server Components, use Client Components only when necessary.

**When to use Server Components:**
- Static content rendering
- Data fetching
- Accessing backend resources
- SEO-critical content

**When to use Client Components:**
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Third-party libraries requiring client-side execution

**Example:**
```tsx
// Server Component (default)
export default function HomePage() {
  const t = useTranslations('home') // Works in Server Components in Next.js 14+
  return <div>{t('title')}</div>
}

// Client Component (explicit)
'use client'
export function ColorPicker() {
  const [color, setColor] = useState('#000000')
  return <input type="color" value={color} onChange={...} />
}
```

### 2. Component Composition

**Principle**: Build complex UIs from small, reusable components.

**Structure:**
- **Pages**: Route-level components (`app/[locale]/page.tsx`)
- **Layouts**: Shared page structure (`app/[locale]/layout.tsx`)
- **Components**: Reusable UI elements (`components/`)
- **Hooks**: Reusable logic (`hooks/`)
- **Utilities**: Pure functions (`lib/`)

**Example:**
```tsx
// Page composes components
export default function ToolsPage() {
  return (
    <div>
      <ToolHeader />
      <ToolGrid />
      <ToolFooter />
    </div>
  )
}
```

### 3. Separation of Concerns

**Principle**: Separate business logic, presentation, and data.

**Layers:**
1. **Presentation Layer**: Components (`components/`)
2. **Logic Layer**: Hooks (`hooks/`)
3. **Data Layer**: Utilities (`lib/`)
4. **Configuration Layer**: Config files (`i18n.ts`, `middleware.ts`)

### 4. Type Safety

**Principle**: Leverage TypeScript for compile-time safety.

**Practices:**
- Strict mode enabled
- Explicit interfaces for all props
- Type inference where appropriate
- No `any` types (except for legacy compatibility)

**Example:**
```tsx
interface ColorConverterProps {
  initialColor: string
  onColorChange?: (color: string) => void
}

export function ColorConverter({ initialColor, onColorChange }: ColorConverterProps) {
  // Type-safe implementation
}
```

### 5. Internationalization First

**Principle**: All user-facing text must be translatable.

**Practices:**
- No hardcoded strings in components
- Use translation namespaces
- Support all locales equally
- Fallback to default locale

---

## Project Structure

```
pipetkaonline.ru/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing
│   │   ├── layout.tsx            # Root layout with i18n
│   │   ├── page.tsx               # Home page
│   │   ├── tools/                 # Tools section
│   │   │   ├── page.tsx           # Tools listing
│   │   │   ├── color-converter/   # Individual tool pages
│   │   │   └── ...
│   │   ├── learn/                 # Educational content
│   │   │   ├── page.tsx           # Learn index
│   │   │   ├── formats/            # Format guides
│   │   │   ├── fundamentals/      # Fundamentals guides
│   │   │   ├── harmony/            # Harmony guides
│   │   │   ├── psychology/        # Psychology guides
│   │   │   └── accessibility/     # Accessibility guides
│   │   ├── about/                 # About page
│   │   ├── contact/               # Contact page
│   │   ├── privacy/               # Privacy policy
│   │   ├── cookies/               # Cookie policy
│   │   └── terms/                 # Terms of service
│   ├── layout.tsx                 # Root layout (pass-through)
│   ├── page.tsx                   # Root redirect
│   └── globals.css                # Global styles
├── components/                    # Reusable components
│   ├── navbar.tsx                 # Navigation bar
│   ├── footer.tsx                 # Site footer
│   ├── logo.tsx                   # Logo component
│   ├── language-switcher.tsx      # Language selector
│   ├── color-converter/           # Tool-specific components
│   ├── color-harmony/             # Tool-specific components
│   ├── contrast-checker/          # Tool-specific components
│   └── ...
├── hooks/                         # Custom React hooks
│   ├── useColorConverter.ts       # Color conversion logic
│   ├── useColorHarmony.ts          # Color harmony generation
│   ├── useContrastChecker.ts       # WCAG contrast checking
│   ├── useColorPicker.ts           # Canvas color picking
│   └── ...
├── lib/                           # Utility functions
│   └── color-utils.ts             # Color conversion utilities
├── locales/                       # Translation files
│   ├── ru/                        # Russian translations
│   │   ├── common.json            # Common translations
│   │   ├── home.json              # Home page
│   │   ├── tools.json             # Tools section
│   │   ├── learn.json             # Learn section
│   │   └── learn-*.json           # Learn subsections
│   ├── en/                        # English translations
│   ├── de/                        # German translations
│   └── es/                        # Spanish translations
├── public/                        # Static assets
│   ├── logo.svg                   # Site logo
│   └── favicon.svg                # Favicon
├── i18n.ts                        # i18n configuration
├── middleware.ts                  # Locale routing middleware
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

### Directory Responsibilities

#### `app/`
- **Purpose**: Next.js App Router pages and layouts
- **Convention**: File-based routing, Server Components by default
- **Structure**: Nested routes with `[locale]` dynamic segment

#### `components/`
- **Purpose**: Reusable React components
- **Convention**: PascalCase file names, one component per file
- **Structure**: Grouped by feature/tool when applicable

#### `hooks/`
- **Purpose**: Custom React hooks for shared logic
- **Convention**: `use` prefix, camelCase file names
- **Structure**: One hook per file, co-located with related utilities

#### `lib/`
- **Purpose**: Pure utility functions
- **Convention**: camelCase file names, no side effects
- **Structure**: Grouped by domain (e.g., `color-utils.ts`)

#### `locales/`
- **Purpose**: Translation files organized by locale
- **Convention**: JSON files, nested structure matching component hierarchy
- **Structure**: Namespaced by feature (common, home, tools, learn)

---

## Internationalization (i18n)

### Architecture

The application uses **next-intl** for internationalization with the following architecture:

1. **Locale Detection**: Middleware detects locale from URL or browser
2. **Message Loading**: Server-side loading of translation messages
3. **Namespace Organization**: Translations organized by feature
4. **Nested Structure**: Support for nested translation keys

### Locale Configuration

**Supported Locales:**
- `ru` - Russian (default)
- `en` - English
- `de` - German
- `es` - Spanish

**Configuration File:** `i18n.ts`

```typescript
export const locales = ['ru', 'en', 'de', 'es'] as const
export const defaultLocale = 'ru' as const
```

### Translation File Structure

**Naming Convention:**
- Main sections: `common.json`, `home.json`, `tools.json`, `learn.json`
- Subsections: `learn-formats-hex.json`, `learn-harmony-complementary.json`
- Pattern: `{section}-{subsection}-{detail}.json`

**Structure Example:**
```json
{
  "title": "Page Title",
  "description": "Page description",
  "sections": {
    "intro": {
      "title": "Introduction",
      "content": "Content text"
    }
  }
}
```

### Message Processing

**Key Functions in `i18n.ts`:**

1. **`nestMessages()`**: Converts flat keys with dots to nested structure
   ```typescript
   // Input: { "home.cta.title": "Click here" }
   // Output: { home: { cta: { title: "Click here" } } }
   ```

2. **`processLearn()`**: Merges main learn.json with subsection files
   ```typescript
   // Merges learn.json + learn-formats-hex.json + ...
   // Creates: learn.formats.hex structure
   ```

3. **`getRequestConfig()`**: Loads and processes messages for locale

### Usage in Components

**Server Components:**
```tsx
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('home')
  return <h1>{t('title')}</h1>
}
```

**Client Components:**
```tsx
'use client'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const t = useTranslations('common')
  return <nav>{t('nav.home')}</nav>
}
```

**Metadata Generation:**
```tsx
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('title'),
    description: t('description')
  }
}
```

### Adding New Translations

1. **Create translation file** in `locales/{locale}/`
2. **Import in `i18n.ts`** (add to locale-specific imports)
3. **Process in `allMessages`** object
4. **Use in components** with `useTranslations('namespace')`

---

## Component Architecture

### Component Types

#### 1. Page Components
**Location:** `app/[locale]/*/page.tsx`
**Purpose:** Route-level components, entry points for pages
**Characteristics:**
- Server Components by default
- Can generate metadata
- Use translations
- Compose layout and feature components

**Example:**
```tsx
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'tools' })
  return { title: t('title') }
}

export default function ToolsPage() {
  const t = useTranslations('tools')
  return (
    <div>
      <h1>{t('title')}</h1>
      <ToolGrid />
    </div>
  )
}
```

#### 2. Layout Components
**Location:** `app/[locale]/layout.tsx`
**Purpose:** Shared page structure
**Characteristics:**
- Server Components
- Wrap page content
- Provide context (i18n, fonts, etc.)
- Define page structure (navbar, main, footer)

#### 3. Feature Components
**Location:** `components/`
**Purpose:** Reusable UI components
**Characteristics:**
- Can be Server or Client Components
- Self-contained functionality
- Accept props for customization
- Follow single responsibility principle

**Example:**
```tsx
interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('common')
  return (
    <nav>
      <Logo locale={locale} />
      <NavLinks />
      <LanguageSwitcher />
    </nav>
  )
}
```

#### 4. Tool Components
**Location:** `components/{tool-name}/`
**Purpose:** Tool-specific components
**Characteristics:**
- Client Components (interactive)
- Use custom hooks for logic
- Handle user interactions
- Display tool results

**Example:**
```tsx
'use client'
import { useColorConverter } from '@/hooks/useColorConverter'

export function ColorConverter() {
  const { hexInput, handleHexChange, currentRgb } = useColorConverter()
  return (
    <div>
      <HexInput value={hexInput} onChange={handleHexChange} />
      <ResultPreview rgb={currentRgb} />
    </div>
  )
}
```

### Component Patterns

#### Composition Pattern
```tsx
// Parent composes children
export function ToolPage() {
  return (
    <ToolLayout>
      <ToolHeader />
      <ToolContent />
      <ToolFooter />
    </ToolLayout>
  )
}
```

#### Container/Presentational Pattern
```tsx
// Container (logic)
'use client'
export function ColorConverterContainer() {
  const converter = useColorConverter()
  return <ColorConverterView {...converter} />
}

// Presentational (display)
function ColorConverterView({ hexInput, handleHexChange }) {
  return <input value={hexInput} onChange={handleHexChange} />
}
```

#### Custom Hooks Pattern
```tsx
// Logic in hook
export function useColorConverter() {
  const [color, setColor] = useState('#000000')
  // ... logic
  return { color, setColor }
}

// Component uses hook
export function ColorConverter() {
  const { color, setColor } = useColorConverter()
  return <ColorPicker value={color} onChange={setColor} />
}
```

---

## State Management

### Local State (useState)

**Use Case:** Component-specific state
**Example:**
```tsx
'use client'
export function ColorInput() {
  const [value, setValue] = useState('#000000')
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

### Custom Hooks

**Use Case:** Shared stateful logic
**Location:** `hooks/`
**Example:**
```tsx
export function useColorConverter(initialColor = '#000000') {
  const [hexInput, setHexInput] = useState(initialColor)
  const [rgbInput, setRgbInput] = useState('rgb(0, 0, 0)')
  
  // Conversion logic
  const handleHexChange = useCallback((value: string) => {
    setHexInput(value)
    const rgb = hexToRgb(value)
    if (rgb) {
      setRgbInput(formatRgb(rgb.r, rgb.g, rgb.b))
    }
  }, [])
  
  return { hexInput, rgbInput, handleHexChange }
}
```

### Computed State (useMemo)

**Use Case:** Derived values from state
**Example:**
```tsx
const currentRgb = useMemo(() => {
  if (activeFormat === 'hex') {
    return hexToRgb(hexInput)
  }
  // ... other formats
}, [activeFormat, hexInput])
```

### URL State

**Use Case:** Shareable state via URL
**Pattern:** Use Next.js router for URL parameters
**Example:**
```tsx
const router = useRouter()
const searchParams = useSearchParams()

// Read from URL
const color = searchParams.get('color') || '#000000'

// Write to URL
router.push(`/tools/color-converter?color=${newColor}`)
```

---

## Styling Architecture

### Tailwind CSS

**Approach:** Utility-first CSS framework
**Configuration:** `tailwind.config.ts`

**Key Features:**
- Responsive design utilities
- Custom color palette
- Font family configuration
- CSS variable support

### Design System

**Color Palette:**
- Slate colors for UI (slate-50 to slate-900)
- Semantic colors for tools (dynamic based on user input)

**Typography:**
- Font: Inter (variable font)
- Sizes: Responsive (text-sm to text-5xl)
- Weights: 300-900

**Spacing:**
- Consistent spacing scale (Tailwind defaults)
- Responsive padding/margins

**Layout:**
- Max-width containers for readability
- Flexbox for layouts
- Grid for complex layouts

### Styling Patterns

#### Utility Classes
```tsx
<div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg">
  Content
</div>
```

#### Responsive Design
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

#### Conditional Classes
```tsx
<div className={`px-4 py-2 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
  Conditional styling
</div>
```

#### CSS Variables
```tsx
// In globals.css
:root {
  --background: #ffffff;
  --foreground: #000000;
}

// In components
<div className="bg-[var(--background)]">
  Using CSS variable
</div>
```

---

## Routing Architecture

### File-Based Routing

**Next.js App Router** uses file system for routing:

```
app/
├── [locale]/
│   ├── page.tsx              → /{locale}/
│   ├── tools/
│   │   ├── page.tsx          → /{locale}/tools
│   │   └── color-converter/
│   │       └── page.tsx      → /{locale}/tools/color-converter
│   └── learn/
│       └── formats/
│           └── hex/
│               └── page.tsx  → /{locale}/learn/formats/hex
```

### Dynamic Routes

**Locale Parameter:**
- `[locale]` - Dynamic segment for locale
- Validated in layout
- Used for translations and routing

**Example:**
```tsx
// app/[locale]/page.tsx
export default function Page({ params: { locale } }) {
  // locale is 'ru', 'en', 'de', or 'es'
}
```

### Middleware Routing

**File:** `middleware.ts`
**Purpose:** Locale detection and routing

**Flow:**
1. Request arrives at `/`
2. Middleware detects locale (from URL or browser)
3. Redirects to `/{locale}/`
4. Page renders with correct locale

**Configuration:**
```typescript
export default createMiddleware({
  locales: ['ru', 'en', 'de', 'es'],
  defaultLocale: 'ru',
  localeDetection: true,
  localePrefix: 'always'
})
```

### Static Generation

**Function:** `generateStaticParams()`
**Purpose:** Pre-render pages for all locales at build time

**Example:**
```tsx
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
```

**Benefits:**
- Faster page loads
- Better SEO
- Reduced server load

---

## Performance Optimization

### Server-Side Rendering (SSR)

**Strategy:** Pre-render pages on server
**Benefits:**
- Fast initial load
- SEO-friendly
- Works without JavaScript

### Static Site Generation (SSG)

**Strategy:** Generate pages at build time
**Implementation:** `generateStaticParams()` for all locales
**Benefits:**
- Instant page loads
- No server computation
- CDN-friendly

### Code Splitting

**Automatic:** Next.js automatically splits code by route
**Manual:** Dynamic imports for large components

**Example:**
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
})
```

### Image Optimization

**Next.js Image Component:**
```tsx
import Image from 'next/image'

<Image
  src="/logo.svg"
  alt="Logo"
  width={200}
  height={50}
  priority // For above-the-fold images
/>
```

### Font Optimization

**Next.js Font Optimization:**
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap' // Show fallback during load
})
```

### Memoization

**React.useMemo:** For expensive computations
```tsx
const harmony = useMemo(() => {
  return generateHarmony(baseColor, mode)
}, [baseColor, mode])
```

**React.useCallback:** For function stability
```tsx
const handleChange = useCallback((value: string) => {
  setColor(value)
}, [])
```

---

## Security Considerations

### Input Validation

**Client-Side:**
- Type checking with TypeScript
- Input sanitization in hooks
- Color format validation

**Server-Side:**
- Locale validation
- URL parameter validation

### XSS Prevention

**Strategy:**
- React automatically escapes content
- No `dangerouslySetInnerHTML` usage
- Sanitize user inputs

### CSRF Protection

**Strategy:**
- Next.js built-in CSRF protection
- SameSite cookies
- No custom API routes (no CSRF risk)

### Content Security

**Strategy:**
- Static content only
- No user-generated content storage
- External resources from trusted sources

---

## Development Workflow

### Code Style

**Formatting:**
- Tabs for indentation
- Single quotes for strings
- No semicolons (unless required)
- Trailing commas in multiline

**Naming:**
- `PascalCase` for components/types
- `camelCase` for functions/variables
- `kebab-case` for file/directory names
- `UPPERCASE` for constants

### TypeScript

**Configuration:**
- Strict mode enabled
- Path aliases (`@/*`)
- Type inference preferred
- Explicit types for public APIs

### Comments

**Language:** English
**Format:** JSDoc
**Coverage:** All public functions, components, interfaces

**Example:**
```tsx
/**
 * Converts RGB color values to HEX format
 * 
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} HEX color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // Implementation
}
```

### Git Workflow

**Branches:**
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

**Commits:**
- Descriptive commit messages
- Atomic commits
- Reference issues when applicable

---

## Deployment

### Build Process

**Command:** `npm run build`
**Output:** `.next/` directory with optimized production build

**Steps:**
1. TypeScript compilation
2. Next.js optimization
3. Static page generation
4. Asset optimization

### Environment Variables

**Required:**
- None (all configuration in code)

**Optional:**
- `NODE_ENV` - Environment (development/production)

### Deployment Platform

**Recommended:** Vercel
**Reason:**
- Native Next.js support
- Automatic optimizations
- Edge network
- Easy locale handling

### Build Configuration

**File:** `next.config.mjs`
**Features:**
- next-intl plugin integration
- Default Next.js optimizations

### Static Assets

**Location:** `public/`
**Handling:**
- Served from root path
- Optimized by Next.js
- CDN-friendly

---

## Best Practices

### Component Development

1. **Start with Server Components** - Only use Client Components when needed
2. **Compose, don't inherit** - Build complex UIs from simple components
3. **Single Responsibility** - Each component should do one thing well
4. **Props Interface** - Always define TypeScript interfaces for props
5. **Accessibility** - Use semantic HTML and ARIA attributes

### State Management

1. **Local State First** - Use `useState` for component-specific state
2. **Custom Hooks** - Extract shared logic to hooks
3. **Memoization** - Use `useMemo` and `useCallback` appropriately
4. **URL State** - Use URL for shareable state

### Performance

1. **Static Generation** - Pre-render pages when possible
2. **Code Splitting** - Use dynamic imports for large components
3. **Image Optimization** - Always use Next.js Image component
4. **Font Optimization** - Use Next.js font optimization

### Internationalization

1. **No Hardcoded Strings** - All text must be translatable
2. **Namespace Organization** - Group translations by feature
3. **Consistent Keys** - Use consistent naming patterns
4. **Fallback Handling** - Always provide fallbacks

### Testing

1. **Type Safety** - Leverage TypeScript for compile-time checks
2. **Component Testing** - Test components in isolation
3. **Integration Testing** - Test user workflows
4. **Accessibility Testing** - Verify WCAG compliance

---

## Future Considerations

### Potential Enhancements

1. **State Management Library** - Consider Redux Toolkit if global state grows
2. **Testing Framework** - Add Jest and React Testing Library
3. **E2E Testing** - Add Playwright or Cypress
4. **Analytics** - Integrate analytics for user behavior
5. **Error Tracking** - Add Sentry or similar for error monitoring
6. **Performance Monitoring** - Add Web Vitals tracking

### Scalability

1. **API Routes** - Add Next.js API routes if backend needed
2. **Database Integration** - Add database for user data if needed
3. **Caching Strategy** - Implement caching for frequently accessed data
4. **CDN Integration** - Use CDN for static assets

---

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable, and performant web application. The combination of Next.js App Router, TypeScript, and next-intl creates a robust platform for multilingual content delivery with excellent developer experience and user performance.

For questions or contributions, please refer to the project's development guidelines and coding standards.

