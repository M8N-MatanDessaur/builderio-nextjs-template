import { builder } from "@builder.io/sdk";

// Initialize Builder.io with the public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

/**
 * Fetch content dynamically from Builder.io.
 * Assumes that the locale has already been validated.
 * Client-side only implementation without caching to prevent hydration issues.
 *
 * @param urlPath The URL path of the content (e.g., "/about").
 * @param locale The locale of the content
 * @param builderModelName The Builder.io model name (e.g., "page").
 * @returns The fetched content if found, or null if not found.
 */
export const fetchBuilderContent = async (
  urlPath: string,
  locale: string,
  builderModelName: string
) => {
  try {
    // Fetch content from Builder.io without caching
    const content = await builder
      .get(builderModelName, {
        userAttributes: {
          urlPath,
          locale
        },
        options: {
          locale,
          includeRefs: true, // Include referenced content
        }
      })
      .toPromise();

    // Return null if no content found (instead of calling notFound)
    if (!content) {
      return null;
    }

    return content;
  } catch (error) {
    console.error("Error fetching content from Builder.io:", error);
    // Return null for 404 errors (instead of calling notFound)
    if ((error as any)?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
