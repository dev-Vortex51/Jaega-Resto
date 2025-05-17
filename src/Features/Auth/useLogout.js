import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from './useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      queryClient.removeQuery(['user']);

      toast.success('User logged out');
      navigate('/login', { state: { email: data?.user.email } });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to log out');
    },
  });

  return { logout, isPending };
}
