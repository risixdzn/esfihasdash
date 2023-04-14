import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import Hero from './components/Hero/hero';
import Login from './components/LoginReg/login'
import Registrar from './components/LoginReg/register'
import ProtectedRoute from './context/ProtectedRoute';
import Sidebar from './components/Dashboard/Sidebar/sidebar';
import Home from './components/Dashboard/pages/home/home';
import PessoasList from './components/Dashboard/pages/pessoas/pessoasList';
import PedidosList from './components/Dashboard/pages/pedidos/pedidosList';
import ProdutosList from './components/Dashboard/pages/produtos/ProdutosList';

import { AuthContextProvider } from './context/AuthContext';
import { ErrorContextProvider } from './context/FirebaseErrorContext';
import { ModalProvider } from './context/ModalContext';
import { PedidoContextProvider } from './context/PedidoContext';
import NovaPessoa from './components/Dashboard/pages/pessoas/NovaPessoa';
import NotFound from './components/Dashboard/pages/404/NotFound';
import NovoProduto from './components/Dashboard/pages/produtos/NovoProduto';
import NewPedido from './components/Dashboard/pages/pedidos/new/NewPedido';

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
                <PedidoContextProvider>
                  <Sidebar>
                    <Routes>
                      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                      <Route path="/pessoas">
                        <Route path="new" element={<ProtectedRoute><NovaPessoa/></ProtectedRoute>}/>
                        <Route path="list" element={<ProtectedRoute><PessoasList/></ProtectedRoute>}/>
                      </Route>                      
                      <Route path="/pedidos">
                        <Route path="new" element={<ProtectedRoute><NewPedido/></ProtectedRoute>}/>
                        <Route path="list" element={<ProtectedRoute><PedidosList/></ProtectedRoute>}/>
                      </Route>                                        
                      <Route path="/produtos">                     
                        <Route path="list" element={<ProtectedRoute><ProdutosList/></ProtectedRoute>}/>
                        <Route path="new" element={<ProtectedRoute><NovoProduto/></ProtectedRoute>}/>
                      </Route>                          
                      <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>}/>
                    </Routes>
                  </Sidebar>  
                </PedidoContextProvider> 
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
