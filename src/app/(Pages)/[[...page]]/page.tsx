/**
 * @file Dynamic Page Router
 * @description Handles dynamic routing and content fetching from Builder.io
 */

import React from "react";
import { fetchBuilderContent } from "@/utils/builderUtils";
import { getLocaleFromParams } from "@/utils/localeUtils";
import ClientPage from "./ClientPage";
import NotFound from "@/components/common/NotFound";

// Server component for dynamic routing
const Page = async ({ params }: { params: { page: string[] | undefined } }) => {
  // Get locale info and check if valid
  const localeInfo = await getLocaleFromParams(params);
  
  // For root URL (/), use home page path
  const contentPath = localeInfo.urlPath === "/" ? "/" : localeInfo.urlPath;
  
  // Only continue if we have a valid locale, otherwise content will be null
  if (localeInfo.isLocaleValid) {
    // Fetch content using the resolved path and locale
    const content = await fetchBuilderContent(contentPath, localeInfo.locale, "page");

    return <ClientPage locale={localeInfo.locale} content={content} />;
  }

  // Show NotFound for any error case (invalid locale or missing content)
  return <NotFound />;
};

export default Page;
