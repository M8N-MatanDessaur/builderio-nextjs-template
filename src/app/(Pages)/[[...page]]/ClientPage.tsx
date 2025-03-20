"use client";

import { useEffect, useState } from "react";
import { RenderBuilderContent } from "@/components/builder";
import useLocaleStore from "@/store/useLocaleStore";
import Loading from "@/components/common/Loading";
import { useIsPreviewing } from "@builder.io/react";
import NotFound from "@/components/common/NotFound";

interface ClientPageProps {
  locale: string;
  content: any;
  isValidLocale?: boolean;
}

const ClientPage = ({ locale, content, isValidLocale = true }: ClientPageProps) => {
  // Add hydration safety with useState and useEffect
  const [isHydrated, setIsHydrated] = useState(false);
  const isPreviewing = useIsPreviewing();

  // Get the setSelectedLocale function from the Zustand store
  const setSelectedLocale = useLocaleStore(
    (state) => state.setSelectedLocale
  );

  // Handle hydration
  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
    // Hydrate the Zustand store with the server-provided locale
    setSelectedLocale(locale);
  }, [locale, setSelectedLocale]);

  // Show loading during hydration to avoid mismatch
  if (!isHydrated) {
    return <Loading />;
  }
  
  // If locale is invalid, show NotFound
  if (!isValidLocale) {
    return <NotFound />;
  }

  // After hydration (client-side), check if we have content or are in preview mode
  if (content || isPreviewing) {
    return (
      <RenderBuilderContent content={content} model="page" locale={locale} />
    );
  }
  
  // If we have no content and not in preview mode, show NotFound
  return <NotFound />;
};

export default ClientPage;
