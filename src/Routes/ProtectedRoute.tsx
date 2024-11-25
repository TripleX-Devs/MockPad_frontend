// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, isTeacher, isStudent } from '../config/authUtils';

interface ProtectedRouteProps {
    element: React.ComponentType<any>;
    role: 'admin' | 'teacher' | 'student';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, role}) => {
   
    const WrapperComponent = (props: any) => {
  
        if (!isAuthenticated()) {
            
            return <Navigate to="/" />;
        }
        
        if (role === 'admin' && !isAdmin()) {
            return <Navigate to="/" />;
        }
        
        if (role === 'teacher' && !isTeacher()) {
           
            return <Navigate to="/" />;
        }
        
        if (role === 'student' && !isStudent()) {
            return <Navigate to="/" />;
        }
        
        return <Component {...props} />;
    };
    
    return <WrapperComponent />;
};

export default ProtectedRoute;