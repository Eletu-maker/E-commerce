import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  useEffect(() => {
    // Check if user is not authenticated and not loading
    if (!loading && !user) {
      // Redirect to login page
      navigate('/Login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, render children; otherwise render nothing (redirect will happen)
  return user ? children : null;
};

export default ProtectedRoute;