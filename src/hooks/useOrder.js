import { useQuery } from '@tanstack/react-query';
import { getOrderItems, getOrders } from '../services/api';

export function useOrderList() {
  const { data, isPending } = useQuery({
    queryKey: ['order-items'],
    queryFn: getOrderItems,
    staleTime: 0,
  });

  return { data, isPending };
}

export function useOrderRevenue() {
  const { data, isPending } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 0,
  });

  return { data, isPending };
}
