import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

interface UseCryptoDataOptions {
  retryCount?: number;
  retryDelay?: number;
  staleTime?: number;
  gcTime?: number;
}

export function useCryptoData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: UseCryptoDataOptions = {}
) {
  const {
    retryCount = 2,
    retryDelay = 30000,
    staleTime = 1000 * 60,
    gcTime = 1000 * 60 * 5,
  } = options;

  const queryClient = useQueryClient();
  const [isOptimistic, setIsOptimistic] = useState(false);

  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey: [key],
    queryFn: fetchFn,
    retry: retryCount,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, retryDelay),
    staleTime,
    gcTime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: (previousData) => previousData,
  };

  const query = useQuery<T, Error>(queryOptions);

  useEffect(() => {
    if (query.isError) {
      setIsOptimistic(false);
    }
  }, [query.isError]);

  const updateData = useCallback(
    async (updater: (oldData: T | undefined) => T) => {
      setIsOptimistic(true);
      queryClient.setQueryData([key], updater);
    },
    [key, queryClient]
  );

  const refetch = useCallback(async () => {
    setIsOptimistic(false);
    await query.refetch();
  }, [query]);

  return {
    data: query.data,
    isLoading: query.isLoading && !isOptimistic,
    isError: query.isError,
    error: query.error,
    updateData,
    refetch,
    isOptimistic,
  };
} 