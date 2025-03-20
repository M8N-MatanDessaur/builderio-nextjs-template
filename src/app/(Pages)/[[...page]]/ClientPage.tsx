"use client";

import { useEffect } from "react";
import { useIsPreviewing } from "@builder.io/react";
import useLocationStore from "@/store/useLocaleStore";
import { RenderBuilderContent } from "@/components/builder";
import NotFound from "@/components/common/NotFound";

interface ClientPageProps {
  locale: string;
  content: any;
  isValidLocale?: boolean;
}

const ClientPage = ({ locale, content, isValidLocale = true }: ClientPageProps) => {
  const isPreviewing = useIsPreviewing();

  // Get the setSelectedLocale function from the Zustand store
  const setSelectedLocale = useLocationStore((state) => state.setSelectedLocale);

  // Hydrate the Zustand store with the server-provided locale
  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale, setSelectedLocale]);

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
