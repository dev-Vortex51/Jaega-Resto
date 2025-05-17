import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../Features/Auth/useAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success('User data updated');
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries(['user']);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
