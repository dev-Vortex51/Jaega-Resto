import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../services/api';

export function useCustomers() {
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
    staleTime: 0,
  });
  return { customers };
}
