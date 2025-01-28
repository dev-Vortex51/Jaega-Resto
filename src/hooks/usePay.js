import { useMutation } from '@tanstack/react-query';
import { order } from '../services/api';
import toast from 'react-hot-toast';
import { useOrder } from '../contexts/OrderContext';

export function usePay() {
  const { orderId, setOrderItems } = useOrder();
  const { mutate: payForOrder } = useMutation({
    mutationFn: (orderItem) => order(orderItem),

    onSettled: () => {
      setOrderItems([]);
      toast.success(`order ${orderId} placed successfully `);
    },
  });
  return { payForOrder };
}
