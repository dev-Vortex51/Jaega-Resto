import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateDish } from '../services/api';
import toast from 'react-hot-toast';

export const useDishMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: addDish } = useMutation({
    mutationFn: addOrUpdateDish,
    onSuccess: () => {
      queryClient.invalidateQueries(['dishes']);
      toast.success('Dish added successfully');
    },
    onError: (error) => {
      console.error('Error:', error.message);
    },
  });

  const { mutate: editDish } = useMutation({
    mutationFn: ({ newDish, id }) => addOrUpdateDish(newDish, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['dishes']);
      toast.success('Dish updated successfully');
    },
    onError: (error) => {
      console.error('Error:', error.message);
    },
  });

  return { addDish, editDish };
};
