import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import Hero from './components/Hero/hero';
import Login from './components/LoginReg/login'
import Registrar from './components/LoginReg/register'
import ProtectedRoute from './context/ProtectedRoute';
import Sidebar from './components/Dashboard/Sidebar/sidebar';
import Home from './components/Dashboard/pages/home/home';
import PessoasList from './components/Dashboard/pages/pessoas/pessoasList';
import Pedidos from './components/Dashboard/pages/pedidos/pedidos';
import Produtos from './components/Dashboard/pages/produtos/produtos';

import { AuthContextProvider } from './context/AuthContext';
import { ErrorContextProvider } from './context/FirebaseErrorContext';
import { ModalProvider } from './context/ModalContext';
import NovaPessoa from './components/Dashboard/pages/pessoas/NovaPessoa';

function App() {
  return (  
    <Router>  
      <AuthContextProvider>    
        <ErrorContextProvider>
          <Routes>        
            <Route path="/" element={<Hero/>}/>    
            <Route path="/login" element={<Login/>}/>              
            <Route path="/register" element={<Registrar/>}/>      
            <Route path='*' element={<ProtectedRoute>      
              <ModalProvider>
                <Sidebar>
                  <Routes>
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                    <Route path="/pessoas">
                      <Route path="new" element={<ProtectedRoute><NovaPessoa/></ProtectedRoute>}/>
                      <Route path="list" element={<ProtectedRoute><PessoasList/></ProtectedRoute>}/>
                    </Route>
                    <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>}/>
                    <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>}/>                            
                  </Routes>
                </Sidebar>  
              </ModalProvider>                                
            </ProtectedRoute>                        
            }></Route>
          </Routes>  
        </ErrorContextProvider>                                      
      </AuthContextProvider>   
    </Router>       
  );
}

export default App;
