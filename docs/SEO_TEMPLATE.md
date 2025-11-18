# SEO Template for Service Pages

This document describes the structure for creating SEO-optimized service pages.

## Structure

Each service should have the following SEO structure in translation files:

### File Location
- `locales/{locale}/tools.json` - Add service section under `tools` object

### Translation Structure

```json
{
  "tools": {
    "serviceName": {
      "title": "Service Title",
      "description": "Service description",
      "seo": {
        "keywords": "keyword1, keyword2, keyword3, ... (30 keywords)",
        "guide": {
          "title": "Complete Guide Title",
          "intro": "Introduction paragraph",
          "step1": {
            "title": "Step 1 Title",
            "description": "Step 1 description"
          },
          "step2": {
            "title": "Step 2 Title",
            "description": "Step 2 description"
          },
          "step3": {
            "title": "Step 3 Title",
            "description": "Step 3 description"
          },
          "step4": { "title": "...", "description": "..." },
          "step5": { "title": "...", "description": "..." },
          "step6": { "title": "...", "description": "..." }
        },
        "howTo": {
          "title": "How-To Section Title",
          "howTo1": {
            "title": "How to do something 1",
            "description": "Description"
          },
          "howTo2": {
            "title": "How to do something 2",
            "description": "Description"
          },
          "howTo3": { "title": "...", "description": "..." },
          "howTo4": { "title": "...", "description": "..." },
          "howTo5": { "title": "...", "description": "..." },
          "howTo6": { "title": "...", "description": "..." }
        },
        "faq": {
          "title": "FAQ Section Title",
          "q1": {
            "question": "Question 1?",
            "answer": "Answer 1"
          },
          "q2": {
            "question": "Question 2?",
            "answer": "Answer 2"
          },
          "q3": { "question": "...", "answer": "..." },
          "q4": { "question": "...", "answer": "..." },
          "q5": { "question": "...", "answer": "..." },
          "q6": { "question": "...", "answer": "..." },
          "q7": { "question": "...", "answer": "..." },
          "q8": { "question": "...", "answer": "..." }
        }
      }
    }
  }
}
```

## Component Usage

### 1. Create Service Page Component

```typescript
// app/[locale]/tools/service-name/ServiceClient.tsx
'use client'

import { ServiceSEO } from '@/components/service-seo/ServiceSEO'

export function ServiceClient() {
  return (
    <div className='space-y-8'>
      {/* Your service UI here */}
      
      {/* SEO Content */}
      <ServiceSEO namespace='tools.serviceName.seo' />
    </div>
  )
}
```

### 2. Create Page with Metadata

```typescript
// app/[locale]/tools/service-name/page.tsx
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ServiceClient } from './ServiceClient'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools.serviceName' })
  const tSEO = await getTranslations({ locale, namespace: 'tools.serviceName.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: tSEO('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function ServicePage() {
  return <ServiceClient />
}
```

## Requirements

### Keywords
- **30 keywords** per locale
- Keywords should be **fully translated** to the target language
- Mix of:
  - Main service terms
  - Related tools/features
  - Use cases
  - Industry terms

### Guide Section
- **3-6 steps** (step1-step6)
- Each step should have:
  - Clear title
  - Detailed description
  - Actionable instructions

### How-To Section
- **2-6 items** (howTo1-howTo6)
- Each item should:
  - Answer "How to..." questions
  - Be specific and actionable
  - Include relevant keywords naturally

### FAQ Section
- **3-8 questions** (q1-q8)
- Each FAQ should:
  - Answer common user questions
  - Be comprehensive
  - Include relevant keywords naturally
  - Use question format: "How to...", "What is...", "Can I..."

## Example: Color Lab

See `locales/{locale}/tools.json` → `colorLab` section for a complete example.

## Notes

- All translations must be provided for all locales: `ru`, `en`, `de`, `es`
- Keywords should be comma-separated
- The `ServiceSEO` component automatically handles optional steps/items
- Use semantic HTML (h2, h3, sections) for better SEO


