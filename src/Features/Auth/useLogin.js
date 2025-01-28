import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from './useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data?.user);

      toast.success('Login Successfully');
      navigate('/menu', { replace: true });
    },
    onError: (err) => {
      console.error('Login error:', err);
      toast.error('Invalid Credentials');
    },
  });

  return { login, isLoading };
}
