/**
 * @file ClientPage.tsx
 * @description Client-side component for rendering Builder.io content
 * 
 * This component is separated from page.tsx to prevent React 19 hydration errors.
 * While page.tsx handles server-side data fetching, this component:
 * 
 * - Initializes the locale state safely after hydration
 * - Detects Builder.io preview mode on the client side
 * - Renders Builder content only when client-side mounted
 * 
 * This pattern solves hydration mismatches by ensuring consistent rendering
 * between server and client with Builder.io content.
 */

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
