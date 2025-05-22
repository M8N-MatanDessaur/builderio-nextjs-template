/**
 * @file Root Layout Component
 * @description Base layout template for all pages
 * @property {Object} metadata - SEO metadata
 * @property {React.ReactNode} children - Page content
 */
// Default pages template
// This layout is used for all pages that don't have a specific layout
// page.tsx will use this layout to render the page content
// This layout can be customized to include a header, footer, or other common elements

import "./assets/reset.css";
import "./assets/brand.css";

// SEO metadata
/**
 * The metadata object is used to set the metadata of the page.
 * It is used by search engines to display the title and description in search results.
 * Add more metadata properties as needed. Follow the Next.js documentation for more information.
 * 
 * @see https://nextjs.org/docs/app/getting-started/metadata-and-og-images
 */
export const metadata = {
  title: "Builder.io - Next.js Example",
  description: "Example of using Builder.io with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div role="main">
          {children}
        </div>
      </body>
    </html>
  );
}
