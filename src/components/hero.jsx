import React, { useEffect, useState } from 'react'
import '../App.css';
import './css/home.css';
import './css/reset.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faPizzaSlice, faUser, faMobile } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Loading from './loading';

const Hero = () => {
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
            <motion.div className='logo' initial={{ x: -25 , opacity: 0 }} whileInView={{ x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}>
                <img src='../assets/svg/minimal-esfihasdash-logo.svg' alt='ashd'></img>
            </motion.div>
            <div className='links'>
                <ul>
                  <motion.a className='link' href='#hero' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>Home</motion.a>
                  <motion.a className='link' href='#funcoes' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>Funções</motion.a>
                  <motion.a className='link' href='#tech' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>Desenvolvimento</motion.a>
                </ul>
            </div>
            <motion.div className='buttons' initial={{ x: 25 , opacity: 0 }} whileInView={{ x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}>
                <Link to="/login" className='loginbtn'>
                Login</Link>             
            </motion.div>
          </nav>
          <section className='hero' id='hero'>
            <div className='content'>
                <motion.img className='logo' src='../assets/svg/esfihasdash-logo.svg' initial={{ y: 25 , opacity: 0 }} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.3}}></motion.img>
                <motion.p className='phrase' initial={{ y: 25 , opacity: 0 }} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.55}}>Seus pedidos, um só lugar.</motion.p>
                <motion.button className='entrar' initial={{  opacity: 0 }} whileInView={{  opacity: 1}} viewport={{ once: true }} transition={{delay: 0.7}}>
                  Entrar 
                  <FontAwesomeIcon icon={faRightToBracket}/>
                </motion.button>
                <div className='shadow'></div>
            </div>
          </section>
          <section className='funcoes' id='funcoes'>
            <div className='macbook_wrap'>
                <motion.img className='macbook' src='../assets/img/MacBook.png' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}></motion.img>
                <img className='divider' src="../assets/img/divider.png" alt="" />
            </div>
            <div className='content'>
                <motion.h1 className='title' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><mark>Funções</mark></motion.h1>
                <div className='main_wrap'>
                  <motion.div className='iphone_wrap' initial={{ x: -100 }} whileInView={{ x: 0 }} viewport={{ once: true }}>
                      <div className='box'>
                        <img src='../assets/img/iphone.png'></img>
                      </div>
                  </motion.div>
                  <div className='func_wrap'>
                      <div className='box'>
                        <motion.div className='func' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faPizzaSlice}/>
                            </div>
                            <div className='desc'>
                              <h3>Controle seus produtos</h3>
                              <p>Adicione, remova e edite produtos<br></br>em uma interface totalmente intuitiva.</p>
                            </div>
                        </motion.div>
                        <motion.div className='func' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faUser}/>
                            </div>
                            <div className='desc'>
                              <h3>Gerencie seus clientes</h3>
                              <p>A quantidade de pessoas é ilimitada,<br></br>tudo depende do usuário.</p>
                            </div>
                        </motion.div>
                        <motion.div className='func' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className='thumb'>
                              <FontAwesomeIcon icon={faMobile}/>
                            </div>
                            <div className='desc'>
                              <h3>Completamente responsivo</h3>
                              <p>Utilize o sistema em qualquer dispositivo,<br></br>sem nenhuma incompatibilidade.</p>
                            </div>
                        </motion.div>
                      </div>
                  </div>
                </div>
            </div>
            <img className='sidepath' src="../assets/img/side-path.png" alt="" />
          </section>
          <section className='tech' id='tech'>
              <div className='tech_wrap'>
                <motion.h1 className='title' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><mark>Tecnologias</mark></motion.h1>
                <motion.div className='techs' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className='thumb'>
                    <img src='../assets/img/react.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>React</h3>
                    <p>Framework Javascript focado<br></br>no desenvolvimento de SPAs.</p>
                  </div>
                </motion.div>
                <motion.div className='techs' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className='thumb'>
                    <img className='firebase' src='../assets/img/firebase.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>Firebase</h3>
                    <p>Sistema de banco de dados "NoSql<br></br>utilizado nas rotas de login.</p>
                  </div>
                </motion.div>
                <motion.div className='techs' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className='thumb'>
                    <img src='../assets/img/mysql.png'></img>
                  </div>
                  <div className='desc'>
                    <h3>MySql</h3>
                    <p>Banco de dados que gerencia<br></br>todas as informações do sistema.</p>
                  </div>
                </motion.div>
              </div>
              <motion.img className='imac' src='./assets/img/imac.png' initial={{ x: -100 }} whileInView={{ x: 0 }} viewport={{ once: true }}></motion.img>
          </section>
          <footer className='footer'>
            <div className='content'>
              <div className='desc'>
                <motion.p initial={{ y: 25 , opacity: 0 }} whileInView={{ y: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}>Registre-se gratuitamente</motion.p>
                <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{delay: 0.9}}><Link className='signup' to="/login">Entrar</Link></motion.a>                
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

export default Hero