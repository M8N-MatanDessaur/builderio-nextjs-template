# Next.js + Builder.io Localized Starter Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A minimalist, production-ready starter template for creating localized websites with Next.js 15, Builder.io, and Zustand for state management. This boilerplate is optimized for React 19 with client-side only rendering to prevent hydration issues.

## 🌐 Features
- Localization support with dynamic routing.
- Integration with Builder.io for visual content management.
- Lightweight state management using Zustand.

## 🚀 Getting Started
1. Fork the repository:
   ```bash
   git fork https://github.com/your-username/nextjs-builder-localized-starter.git
   ```
2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/nextjs-builder-localized-starter.git
   ```
3. Create a `.env` file in the root directory with your Builder.io API key:
   ```env
   NEXT_PUBLIC_BUILDER_API_KEY=your-builder-api-key
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🌍 Localization Setup
- Update the `VALID_LOCALES` array in `src/utils/builderUtils.ts` to add new locales.
- Configure Builder.io targeting attributes for the new locales.

## 🔧 Builder.io Configuration

### API Key Setup
Add your Builder.io public API key to the `.env` file:
```env
NEXT_PUBLIC_BUILDER_API_KEY=your-builder-api-key
```

### Preview URLs
Configure your Builder.io preview URLs in your Builder.io account settings based on your environment:

#### Development
```javascript
return `http://localhost:3000/${!locale || locale === "Default" ? "en" : locale}${targeting?.urlPath || ''}`;
```

#### Staging
```javascript
// Uncomment and modify for your staging environment
// return `https://your-staging-url.com/${!locale || locale === "Default" ? "en" : locale}${targeting?.urlPath || ''}`;
```

#### Production
```javascript
// Uncomment and modify for your production environment
// return `https://your-domain.com/${!locale || locale === "Default" ? "en" : locale}${targeting?.urlPath || ''}`;
```

These preview URLs help Builder.io correctly render your content with the appropriate locale and URL path.

## 🧩 How It Works
- Uses Next.js 15 App Router for clean routing.
- Builder.io integration for dynamic content management.
- Client-side only rendering approach to prevent React 19 hydration errors.
- Zustand for efficient state management.
- URL-based locale detection and internationalization support.
- Component-based architecture with Builder.io registration for visual editing.

## 📜 License
This project is licensed under the MIT License.
