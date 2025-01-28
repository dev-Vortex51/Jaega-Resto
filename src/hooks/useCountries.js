import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../services/api';

export function useCountries() {
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 0,
  });
  return { countries };
}
