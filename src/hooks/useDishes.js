import { useQuery } from '@tanstack/react-query';
import { getDishes } from '../services/api';

export function useDishes() {
  const {
    data: dishes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['dishes'],
    queryFn: getDishes,
    staleTime: 0,
  });

  return { dishes, isPending, isError };
}
