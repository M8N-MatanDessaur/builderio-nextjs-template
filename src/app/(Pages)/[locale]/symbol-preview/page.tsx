/**
 * @file Blog Search Page
 * @description Server component for rendering blog search results dynamically
 */

import React from "react";
import { fetchBuilderContent } from "@/utils/builderUtils";
import { getLocaleFromParams } from "@/utils/localeUtils";
import ClientPage from "./ClientPage";
import NotFound from "@/components/common/NotFound";

// Server component for the Blog Search Page
const Page = async ({ params }: { params: { locale?: string; page?: string[] } }) => {
  // Get locale info and check if valid
  const localeInfo = await getLocaleFromParams(params);
  
  // Only continue if we have a valid locale
  if (localeInfo.isLocaleValid) {
    const urlPath = "/symbol-preview/symbol"; // Fixed path for symbol preview
  
    // Fetch content dynamically from Builder.io
    const builderModelName = "symbol";
    const content = await fetchBuilderContent(urlPath, localeInfo.locale, builderModelName);

    return <ClientPage locale={localeInfo.locale} content={content} />;
  }

  // Show NotFound for any error case (invalid locale or missing content)
  return <NotFound />;
};

export default Page;
