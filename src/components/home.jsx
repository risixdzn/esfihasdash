import React, { useEffect, useState } from 'react'
import '../App.css';
import './css/home.css';
import './css/reset.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faPizzaSlice, faUser, faMobile } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import Loading from './loading';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() =>{    
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  });

  return (   
    <div>         
      { loading ? <Loading/> : 
        <main>
          <div className='eyecatch'>
            <p>Desenvolvido por Ricardo Amorim.</p>
          </div>
          <nav className='navbar'>            
            <div className='logo'>
                <img src='../assets/svg/minimal-esfihasdash-logo.svg' alt='ashd'></img>
            </div>
            <div className='links'>
                <ul>
                  <a className='link' href='#hero'>Home</a>
                  <a className='link' href='#funcoes'>Funções</a>
                  <a className='link' href='#tech'>Desenvolvimento</a>
                </ul>
            </div>
            <div className='buttons'>
                <Link to="/login" className='loginbtn'>
                Login</Link>             
            </div>
          </nav>
          <section className='hero' id='hero'>
            <div className='content'>
                <img className='logo' src='../assets/svg/esfihasdash-logo.svg'></img>
                <p className='phrase'>Seus pedidos, um só lugar.</p>
                <button className='entrar'>
                  Entrar 
                  <FontAwesomeIcon icon={faRightToBracket}/>
                </button>
                <div className='shadow'></div>
            </div>
          </section>
          <section className='funcoes' id='funcoes'>
            <div className='macbook_wrap'>
                <img className='macbook' src='../assets/img/MacBook.png'></img>
                <img className='divider' src="../assets/img/divider.png" alt="" />
            </div>
            <div className='content'>
                <h1 className='title'><mark>Funções</mark></h1>
                <div className='main_wrap'>
                  <div className='iphone_wrap'>
                      <div className='box'>
                        <img src='../assets/img/iphone.png'></img>
                      </div>
                  </div>
                  <div className='func_wrap'>
                      <div className='box'>
                        <div className='func'>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faPizzaSlice}/>
                            </div>
                            <div className='desc'>
                              <h3>Controle seus produtos</h3>
                              <p>Adicione, remova e edite produtos<br></br>em uma interface totalmente intuitiva.</p>
                            </div>
                        </div>
                        <div className='func'>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faUser}/>
                            </div>
                            <div className='desc'>
                              <h3>Gerencie seus clientes</h3>
                              <p>A quantidade de pessoas é ilimitada,<br></br>tudo depende do usuário.</p>
                            </div>
                        </div>
                        <div className='func'>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faMobile}/>
                            </div>
                            <div className='desc'>
                              <h3>Completamente responsivo</h3>
                              <p>Utilize o sistema em qualquer dispositivo,<br></br>sem nenhuma incompatibilidade.</p>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <img className='sidepath' src="../assets/img/side-path.png" alt="" />
          </section>
          <section className='tech' id='tech'>
              <div className='tech_wrap'>
                <h1 className='title'><mark>Tecnologias</mark></h1>
                <div className='techs'>
                  <div className='thumb'>
                    <img src='../assets/img/react.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>React</h3>
                    <p>Framework Javascript focado<br></br>no desenvolvimento de SPAs.</p>
                  </div>
                </div>
                <div className='techs'>
                  <div className='thumb'>
                    <img className='firebase' src='../assets/img/firebase.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>Firebase</h3>
                    <p>Sistema de banco de dados "NoSql<br></br>utilizado nas rotas de login.</p>
                  </div>
                </div>
                <div className='techs'>
                  <div className='thumb'>
                    <img src='../assets/img/mysql.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>MySql</h3>
                    <p>Banco de dados que gerencia<br></br>todas as informações do sistema.</p>
                  </div>
                </div>
              </div>
              <img className='imac' src='./assets/img/imac.png'></img>
          </section>
          <footer className='footer'>
            <div className='content'>
              <div className='desc'>
                <p>Registre-se gratuitamente</p>
                <Link className='signup' to="/login">Entrar</Link>
              </div>
            </div>
            <div className='rodape'>
              <p>© 2023 EsfihasDash - All Rights Reserved.</p>
            </div>
          </footer>
        </main>
      }
      
    </div>  
    
  )
}

export default Home