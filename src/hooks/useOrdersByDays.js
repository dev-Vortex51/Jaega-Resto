import { useQuery } from '@tanstack/react-query';
import { getOrdersByDays } from '../services/api';

export function useOrdersByDays(filter) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ordersByDays', filter],
    queryFn: getOrdersByDays,
    staleTime: 0,
  });

  return { data, isLoading, isError, error };
}
