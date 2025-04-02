// List of valid locales in your application
// Sync with the locales in your i18n configuration or CMS (builder.io)
// This list is used to validate the locale extracted from the URL
export const VALID_LOCALES = [
  'en',
];

// Default locale to use when none is specified in the URL
export const DEFAULT_LOCALE = 'en';

/**
 * Checks if a given locale is valid by comparing it against the predefined list of valid locales.
 * @param locale The locale string to validate.
 * @returns `true` if the locale is in the VALID_LOCALES list, otherwise `false`.
 */
export const isValidLocale = (locale: string): boolean => {
  return VALID_LOCALES.includes(locale);
};

/**
 * Extract locale and URL path from params
 * @param params Route parameters object
 * @returns Object with locale, urlPath, and isLocaleValid properties
 */
export const getLocaleFromParams = async (params: { page?: string[]; locale?: string }): Promise<{ locale: string; urlPath: string; isLocaleValid: boolean }> => {
  const resolvedParams = await params;
  const pageSegments = resolvedParams.page || [];
  
  // If no segments (root URL) or empty segments, use default locale
  if (pageSegments.length === 0) {
    return { 
      locale: DEFAULT_LOCALE, 
      urlPath: "/", 
      isLocaleValid: true 
    };
  }
  
  // Handle the [locale] route pattern
  if (resolvedParams.locale) {
    const isLocaleValid = isValidLocale(resolvedParams.locale);
    return { 
      locale: isLocaleValid ? resolvedParams.locale : DEFAULT_LOCALE, // Fallback to default locale
      urlPath: "/" + (pageSegments.join("/") || ""), 
      isLocaleValid 
    };
  }
  
  // For [...page] route pattern
  const firstSegment = pageSegments[0];
  const isFirstSegmentValidLocale = isValidLocale(firstSegment);
  
  if (isFirstSegmentValidLocale) {
    // First segment is a valid locale
    return {
      locale: firstSegment,
      urlPath: "/" + pageSegments.slice(1).join("/"),
      isLocaleValid: true
    };
  } else {
    // First segment is not a locale, use default
    return {
      locale: DEFAULT_LOCALE,
      urlPath: "/" + pageSegments.join("/"),
      isLocaleValid: true
    };
  }
};
