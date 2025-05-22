/**
 * @file RenderBuilderContent Component
 * @description Renders Builder.io content with client-side only approach to prevent React 19 hydration issues
 */
// This file contains the RenderBuilderContent component that handles Builder.io content rendering
// with a client-side only approach to prevent React 19 hydration errors

"use client";
import { ComponentProps, Suspense, useState, useEffect, useRef } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import "../builder-registry";
import NotFound from "./common/NotFound";
import Loading from "./common/Loading";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  fallback?: React.ReactNode;
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

export function RenderBuilderContent({ 
  content, 
  model, 
  locale,
  fallback,
  errorComponent
}: BuilderPageProps) {
  // Track if we're on the client side to prevent hydration errors
  const [isClient, setIsClient] = useState(false);
  // Use a ref to stabilize content between renders
  const contentRef = useRef(content);
  
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  
  // Custom error component or default error page
  const ErrorComponent = errorComponent || <NotFound />;
  
  // Custom loading fallback or default loading spinner
  const LoadingFallback = fallback || <Loading />;
  
  // Set isClient to true on component mount (client-side only)
  useEffect(() => {
    contentRef.current = content;
    setIsClient(true);
  }, [content]);
  
  // If not on client yet, return a placeholder div to prevent hydration errors
  if (!isClient) {
    return <div suppressHydrationWarning />;
  }
  
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (contentRef.current || isPreviewing) {
    return (
      <BuilderErrorBoundary fallback={ErrorComponent}>
        <Suspense fallback={LoadingFallback}>
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
        </Suspense>
      </BuilderErrorBoundary>
    );
  }

  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // ErrorComponent.
  return ErrorComponent;
}
