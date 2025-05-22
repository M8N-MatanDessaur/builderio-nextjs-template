/**
 * @file builder-registry.ts
 * @description Central registry for Builder.io components and design tokens
 * 
 * Registers components for Builder.io's visual editor and defines design tokens.
 * Design tokens should be synchronized with CSS variables in brand.css.
 */

import { builder, Builder } from "@builder.io/react";
// Import component registries (<component-name>.registry.ts)
import "./components/ImageGallery/ImageGallery.registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Register the settings

// Design Tokens - Must be synced with CSS variables in brand.css
// Define your colors, typography, spacing, and other design tokens here
// for use in the Builder.io visual editor

Builder.register("editor.settings", {
  styleStrictMode: false,
  designTokensOptional: true,
  designTokens: {
    colors: [
      {
        name: "Primary",
        value: "var(--primary-color, #0070f3)",
      },
      {
        name: "Secondary",
        value: "var(--secondary-color, #ff4081)",
      }
    ],
    // You can add more token types like fonts, spacing, etc.
    // fonts: [],
    // fontSize: [],
    // spacing: []
  },
});
