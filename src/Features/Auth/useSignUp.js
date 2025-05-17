import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from './useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, username }) => signupApi({ email, password, username }),
    onSuccess: (data) => {
      toast.success('Account created successfully');
      navigate('/login', {
        state: { email: data?.user.email, password: data?.user.password },
      });
    },
    onError: (err) => {
      console.log('Error:', err);
      toast.error('Account creation failed!');
    },
  });

  return { signup, isPending };
}
