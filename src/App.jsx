import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Login from './components/login'
import Registrar from './components/register'
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthContextProvider } from './context/AuthContext';
import { ErrorContextProvider } from './context/FirebaseErrorContext';

function App() {
  return (  
    <Router>  
      <AuthContextProvider>    
        <ErrorContextProvider>
          <Routes>        
            <Route path="/" element={<Home/>}/>    
            <Route path="/login" element={<Login/>}/>              
            <Route path="/register" element={<Registrar/>}/>      
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>      
          </Routes>    
        </ErrorContextProvider>                                      
      </AuthContextProvider>   
    </Router>       
  );
}

export default App;
