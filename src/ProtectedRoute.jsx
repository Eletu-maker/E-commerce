import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/Login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading...
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
