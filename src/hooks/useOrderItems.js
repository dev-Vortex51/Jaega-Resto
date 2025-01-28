import { useMutation } from '@tanstack/react-query';
import { addOrderItems } from '../services/api';

export function useOrderItems() {
  const { mutate: addItem } = useMutation({
    mutationFn: (orderItem) => addOrderItems(orderItem),
  });
  return { addItem };
}
