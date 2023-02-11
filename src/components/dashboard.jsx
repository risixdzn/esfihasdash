import React from 'react';
import { UserAuth } from '../context/AuthContext';
import '../App.css';
import { useNavigate } from 'react-router-dom';


function Dashboard(){
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          console.log('Você deslogou.')
        } catch (error) {
          console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Seja bem vindo(a), {user && user.displayName}</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>        
    )
}


export default Dashboard;