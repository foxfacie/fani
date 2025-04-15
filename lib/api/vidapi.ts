import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export interface Anime {
  id: string;
  title: string;
  coverImage?: string;
  description?: string;
  episodes?: number;
  status?: string;
  rating?: number;
}

interface AnimeResponse {
  data: Anime[];
  pagination?: {
    currentPage: number;
    hasNextPage: boolean;
  };
}

const BASE_URL = 'https://vidapi.xyz/ani-api';

/**
 * Fetches anime data from VidAPI with error handling and retries
 */
async function fetchAnimeData(endpoint: string, params: Record<string, string> = {}): Promise<AnimeResponse> {
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw error;
  }
}

/**
 * Hook for fetching new anime releases with pagination
 */
export function useNewAnime(page: number = 1) {
  return useQuery({
    queryKey: ['newAnime', page],
    queryFn: () => fetchAnimeData('/new', { page: page.toString() }),
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });
}

/**
 * Hook for infinite scrolling of new anime releases
 */
export function useInfiniteNewAnime() {
  return useInfiniteQuery({
    queryKey: ['infiniteNewAnime'],
    queryFn: ({ pageParam = 1 }) => 
      fetchAnimeData('/new', { page: pageParam.toString() }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination?.hasNextPage ? lastPage.pagination.currentPage + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
}

/**
 * Utility function to handle API errors
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

/**
 * Constants for API configuration
 */
export const API_CONFIG = {
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  CACHE_TIME: 30 * 60 * 1000,
  STALE_TIME: 5 * 60 * 1000,
} as const;