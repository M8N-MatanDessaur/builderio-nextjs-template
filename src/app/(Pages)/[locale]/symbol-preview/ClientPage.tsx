"use client";

import React, { useEffect, useState } from "react";
import { RenderBuilderContent } from "@/components/builder";
import { useIsPreviewing } from "@builder.io/react";
import useLocationStore from "@/store/useLocaleStore";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";

const ClientPage = ({
  locale,
  content,
}: {
  locale: string;
  content: any;
}) => {
  // Add hydration safety with useState and useEffect
  const [isHydrated, setIsHydrated] = useState(false);
  // Add previewing check
  const isPreviewing = useIsPreviewing();
  // Get the setSelectedLocale function from the Zustand store
  const setSelectedLocale = useLocationStore((state) => state.setSelectedLocale);

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

  if (content || isPreviewing) {
    return (
      <RenderBuilderContent content={content} model="symbol" locale={locale} />
    );
  }

   return <NotFound />;
};

export default ClientPage;
