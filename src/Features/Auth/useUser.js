import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './useAuth';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}
