import { Navigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it, redirect to appropriate dashboard
  if (requiredRole && currentUser?.role !== requiredRole) {
    if (currentUser?.role === 'warga') {
      return <Navigate to="/dashboard/warga" replace />;
    } else if (currentUser?.role === 'dlh') {
      return <Navigate to="/dashboard/dlh" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

