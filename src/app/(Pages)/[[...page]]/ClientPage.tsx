"use client";

import { useEffect, useState } from "react";
import { RenderBuilderContent } from "@/components/builder";
import useLocaleStore from "@/store/useLocaleStore";
import Loading from "@/components/common/Loading";

const ClientPage = ({ locale, content }: { locale: string; content: any }) => {
  // Add hydration safety with useState and useEffect
  const [isHydrated, setIsHydrated] = useState(false);

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

  // After hydration (client-side), render with full functionality
  return (
    <RenderBuilderContent content={content} model="page" locale={locale} />
  );
};

export default ClientPage;
