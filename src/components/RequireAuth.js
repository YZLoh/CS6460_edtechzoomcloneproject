import { useEffect } from 'react';
import { Navigate,Outlet } from 'react-router-dom';

const  RequireAuth = () => {
  
const token = localStorage.getItem('token')

return (
    token
        ? <Outlet />
        : <Navigate to="/login" replace />
) // You can return true or any value you prefer
}

export default RequireAuth;
