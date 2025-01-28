import { useMutation } from '@tanstack/react-query';
import { updateDishAvailability } from '../services/api';

export function useUpdateAvailability() {
  const { mutate: updateDishesAvailable } = useMutation({
    mutationFn: (newItem, id) => updateDishAvailability(newItem, id),
  });

  return { updateDishesAvailable };
}
