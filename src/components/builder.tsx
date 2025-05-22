/**
 * @file RenderBuilderContent Component
 * @description Renders Builder.io content with preview mode support, optimized for Next.js 15
 */
// This file contains the RenderBuilderContent component that renders the BuilderComponent
// with the specified content and model props. The component also uses the useIsPreviewing
// hook to determine if the page is being previewed in Builder. If the content is falsy and
// the page is not being previewed in Builder, the component renders the NotFound component.

"use client";
import { ComponentProps, Suspense } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import "../builder-registry";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  fallback?: React.ReactNode;
};

// Initialize Builder with the public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Error boundary wrapper component
function BuilderErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function RenderBuilderContent({ 
  content, 
  model, 
  locale,
}: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();
  
  if (!content && !isPreviewing) {
    return <>{null}</>;
  }

  return (
    <BuilderErrorBoundary>
      <Suspense>
        <BuilderComponent
          content={content}
          model={model}
          locale={locale}
          options={{
            includeRefs: true,
            noTraverse: true,
          }}
        />
      </Suspense>
    </BuilderErrorBoundary>
  );
}

