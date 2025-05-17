import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './useAuth';

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isPending, user, isAuthenticated: user?.role === 'authenticated' };
}
