import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    // If no token, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the child routes
  return <Outlet />;
}

export default ProtectedRoute;
