/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useUser } from '../Features/Auth/useUser';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
