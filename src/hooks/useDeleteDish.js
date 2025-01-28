import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDish } from '../services/api';
import toast from 'react-hot-toast';

export function useDeleteDish() {
  const queryClient = useQueryClient();
  const { mutate: deleteDishById } = useMutation({
    mutationFn: (id) => deleteDish(id),
    onSuccess: () => {
      toast.success('Dish deleted from dishes Database');
      queryClient.invalidateQueries(['dishes']);
    },
    onError: () => {
      toast.error('Failed to delete dish');
    },
  });

  return { deleteDishById };
}
