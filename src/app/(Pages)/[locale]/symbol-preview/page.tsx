/**
 * @file Symbol Preview Page
 * @description Server component for rendering Builder.io symbols dynamically
 */

import React from "react";
import { fetchBuilderContent } from "@/utils/builderUtils";
import { getLocaleFromParams } from "@/utils/localeUtils";
import ClientPage from "./ClientPage";

// Server component for the Symbol Preview Page
const Page = async ({ params }: { params: { locale?: string; page?: string[] } }) => {
  // Get locale info and check if valid
  const localeInfo = await getLocaleFromParams(params);
  
  const urlPath = "/symbol-preview/symbol"; // Fixed path for symbol preview
  
  // Always fetch content (or null if not found) and pass to client component
  const builderModelName = "symbol";
  const content = await fetchBuilderContent(
    urlPath, 
    localeInfo.locale || "en", // Default to English if locale is invalid
    builderModelName
  );
  
  // Always render ClientPage - it will handle content display, preview mode, and errors
  return <ClientPage 
    locale={localeInfo.locale || "en"} 
    content={content} 
    isValidLocale={localeInfo.isLocaleValid} 
  />;
};

export default Page;
