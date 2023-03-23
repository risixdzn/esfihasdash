import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Hero from './components/hero';
import Login from './components/login'
import Registrar from './components/register'
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/404';

import Sidebar from './components/sidebar/sidebar';
import Home from './components/sidebar/pages/home/home';
import PessoasList from './components/sidebar/pages/pessoas/pessoasList';
import Pedidos from './components/sidebar/pages/pedidos';
import Produtos from './components/sidebar/pages/produtos';

import { AuthContextProvider } from './context/AuthContext';
import { ErrorContextProvider } from './context/FirebaseErrorContext';
import { ModalProvider } from './components/sidebar/pages/pessoas/modals/ModalProvider';
import NovaPessoa from './components/sidebar/pages/pessoas/NovaPessoa';

function App() {
  return (  
    <Router>  
      <AuthContextProvider>    
        <ErrorContextProvider>
          <Routes>        
            <Route path="/" element={<Hero/>}/>    
            <Route path="/login" element={<Login/>}/>              
            <Route path="/register" element={<Registrar/>}/>      
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>      

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
