/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useUser } from '../Features/Auth/useUser';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isPending, isAuthenticated, navigate]);

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
