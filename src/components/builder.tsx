/**
 * @file builder.tsx
 * @description Renders Builder.io content with preview mode support, optimized for Next.js 15 and React 19
 * 
 * This component solves React 19 hydration issues with Builder.io content by:
 * 
 * - Using client-side only rendering with isClient state
 * - Stabilizing content with refs between renders
 * - Providing custom error handling with fallbacks
 * - Using a separate StableBuilderContent component for better control
 */

"use client";
import React, { ComponentProps, useRef, useState, useEffect } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import "../builder-registry";
// No builderUtils imports needed
import NotFound from "./common/NotFound";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  errorComponent?: React.ReactNode;
};

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Error boundary wrapper component
function BuilderErrorBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);
  
  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
}

// Content wrapper to handle content stability for React 19
function StableBuilderContent({ 
  content, 
  model, 
  locale 
}: Pick<BuilderPageProps, 'content' | 'model' | 'locale'>) {
  // Use a ref to ensure the content is stable between renders
  const contentRef = useRef(content);
  
  // Add state to track if we're on the client
  const [isClient, setIsClient] = useState(false);
  
  // Only render on client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    // Return an empty div during server-side rendering with same className structure
    // but with suppressHydrationWarning to prevent React errors
    return <div suppressHydrationWarning className="builder-content" />;
  }
  
  return (
    <div suppressHydrationWarning>
      <BuilderComponent
        content={contentRef.current}
        model={model}
        locale={locale}
        options={{
          // Only fetch needed data for optimal performance
          includeRefs: true,
          noTraverse: true, // Prevent unnecessary traversal for performance
        }}
      />
    </div>
  );
}

export function RenderBuilderContent({ 
  content, 
  model, 
  locale,
  errorComponent
}: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  
  // Custom error component or default error page
  const ErrorComponent = errorComponent || <NotFound />;
  
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return (
      <BuilderErrorBoundary fallback={ErrorComponent}>
        <StableBuilderContent
          content={content}
          model={model}
          locale={locale}
        />
      </BuilderErrorBoundary>
    );
  }

  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // ErrorComponent.
  return ErrorComponent;
}
