import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spin } from 'antd';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isCheckingAuth } = useAuth();

    const location = useLocation();

    if (isCheckingAuth) {
        return <Spin size="large" tip="Checking authentication..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}