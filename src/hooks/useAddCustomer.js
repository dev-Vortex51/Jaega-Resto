import { useMutation } from '@tanstack/react-query';
import { updateCustomer } from '../services/api';

export function AddCustomer() {
  const { mutate: addCustomer } = useMutation({
    mutationFn: (name) => updateCustomer(name),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { addCustomer };
}
