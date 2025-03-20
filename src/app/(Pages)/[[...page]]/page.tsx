/**
 * @file Dynamic Page Router
 * @description Handles dynamic routing and content fetching from Builder.io
 */

import React from "react";
import { fetchBuilderContent } from "@/utils/builderUtils";
import { getLocaleFromParams } from "@/utils/localeUtils";
import ClientPage from "./ClientPage";

// Enable Incremental Static Regeneration with a 10-minute revalidation period
// Adjust this value based on how frequently your content changes
export const revalidate = 600;

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
