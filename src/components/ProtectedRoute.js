import React, { Children } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const ProtectedRoute = ( {children, ...rest} ) => {
    const {user} = UserAuth();    
    const navigate = useNavigate();
    if (!user) {        
        navigate('/');
        return null;
    }else {
        return children;
    }    
}

export default ProtectedRoute;