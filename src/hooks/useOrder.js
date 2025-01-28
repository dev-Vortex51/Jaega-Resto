import { useQuery } from '@tanstack/react-query';
import { getOrderItems, getOrders } from '../services/api';

export function useOrderList() {
  const { data, isLoading } = useQuery({
    queryKey: ['order-items'],
    queryFn: getOrderItems,
    staleTime: 0,
  });

  return { data, isLoading };
}

export function useOrderRevenue() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 0,
  });

  return { data, isLoading };
}
