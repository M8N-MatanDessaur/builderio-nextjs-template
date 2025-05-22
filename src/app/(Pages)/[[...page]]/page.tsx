/**
 * @file page.tsx - Server Component
 * @description Server-side component for dynamic routing and content fetching
 * 
 * This component is responsible for server-side operations only:
 * 
 * - Resolves URL parameters to determine the correct locale and content path
 * - Fetches content from Builder.io without caching or revalidation
 * - Passes data to ClientPage.tsx for actual rendering
 * 
 * By separating server and client responsibilities, this architecture prevents
 * React 19 hydration errors and optimizes for Next.js App Router's server/client
 * component model.
 */

import React from "react";
import { fetchBuilderContent } from "@/utils/builderUtils";
import { getLocaleFromParams } from "@/utils/localeUtils";
import ClientPage from "./ClientPage";

// Server component for dynamic routing
const Page = async ({ params }: { params: { page: string[] | undefined } }) => {
  // Get locale info and check if valid
  const localeInfo = await getLocaleFromParams(params);
  
  // For root URL (/), use home page path
  const contentPath = localeInfo.urlPath === "/" ? "/" : localeInfo.urlPath;
  
  // Always fetch content (or null if not found) and pass to client component
  const content = await fetchBuilderContent(
    contentPath, 
    localeInfo.locale || "en", // Default to English if locale is invalid
    "page"
  );
  
  // Render ClientPage - it will handle content display, preview mode, and errors
  return <ClientPage 
    locale={localeInfo.locale || "en"} 
    content={content} 
    isValidLocale={localeInfo.isLocaleValid} 
  />;
};

export default Page;
