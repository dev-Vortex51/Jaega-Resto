import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';

export function useCategories() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 0,
  });
  return { categories };
}
