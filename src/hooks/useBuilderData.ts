import { useState, useEffect, useCallback } from 'react';
import { builder } from '@builder.io/sdk';
import useLocationStore from "@/store/useLocaleStore";
import { useShallow } from "zustand/react/shallow";

// Ensure Builder is initialized with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface UseBuilderDataProps {
  model: string;
  query?: any;
  options?: any;
  filters?: any;
  sort?: string;
  sortBy?: { field: string; direction: '1' | '-1' };
  limit?: number;
  offset?: number;
  fields?: string;
}

/**
 * Hook for fetching Builder.io data with client-side only approach
 * 
 * @param model The Builder.io model to fetch data from
 * @param query Optional query object to filter data
 * @param options Optional options object to configure the request
 * @param filters Optional filters object to filter data
 * @param sort Optional sort field to sort data
 * @param sortBy Optional object with field and direction to sort by
 * @param limit Optional limit to restrict the number of results
 * @param offset Optional offset to skip results
 * @param fields Optional fields to include in the response
 * @returns Object with data, loading state, error, and refetch function
 * 
 * This hook uses Builder.io's getAll method to fetch data without caching
 * It also uses the selected locale from the location store for requests
 * The data, loading state, and error are returned along with a refetch function
 * 
 * @example (fetching blogs)
 * const { data, isLoading, error, refetch } = useBuilderData({
 *  model: 'blog',
 *  query: { published: true },
 *  sort: 'date',
 *  sortBy: { field: 'date', direction: '-1' },
 *  limit: 10
 * });
 * 
 * @example (fetching pages)
 * const { data, isLoading, error, refetch } = useBuilderData({
 *  model: 'page',
 *  query: { published: true },
 *  sort: 'title',
 *  sortBy: { field: 'title', direction: '1' },
 *  limit: 10
 * });
 */

export default function useBuilderData({
  model,
  query = {},
  options = {},
  filters = {},
  sort,
  sortBy,
  limit,
  offset,
  fields
}: UseBuilderDataProps) {
  // State for data, loading, and error
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the selected locale from the location store
  const { selectedLocale } = useLocationStore(
    useShallow((state) => ({
      selectedLocale: state.selectedLocale,
    }))
  );
  
  // Define the fetchData function using useCallback
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Configure options for the Builder.io request
      const builderOptions: any = {
        userAttributes: {
          locale: selectedLocale
        },
        options: {
          enrich: true,
          locale: selectedLocale,
          noTraverse: true
        },
        query,
        filters,
      };
      
      // Add limit if provided
      if (limit !== undefined) {
        builderOptions.limit = limit;
      }
      
      // Add offset if provided
      if (offset !== undefined) {
        builderOptions.options.offset = offset;
      }
      
      // Add fields if provided
      if (fields) {
        builderOptions.fields = fields;
      }
      
      // Add sorting if specified
      if (sortBy) {
        builderOptions.sort = {
          [sortBy.field]: sortBy.direction
        };
      }
      
      // Fetch the content from Builder.io
      const content = await builder.getAll(model, builderOptions);
      
      // Set the data in state
      setData(content || []);
    } catch (err) {
      console.error("Builder.io fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    model, 
    JSON.stringify(query), 
    JSON.stringify(filters), 
    JSON.stringify(options),
    sort,
    JSON.stringify(sortBy),
    limit,
    offset,
    fields,
    selectedLocale
  ]);
  
  // Effect to fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Return the data, loading state, error, and a function to refetch
  // Include 'loading' property for backward compatibility
  return { 
    data, 
    isLoading, 
    loading: isLoading, // for backward compatibility
    error, 
    refetch: fetchData 
  };
}
