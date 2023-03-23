import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserGroup, faShoppingBag, faList, faRightFromBracket, faBars, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { UserAuth } from '../../context/AuthContext'

import UserCard from './components/userCard'
import { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Sidebar = ({children}) => {
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      path: "/pessoas/list",
      name: "Pessoas",
      icon: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      path: "/produtos",
      name: "Produtos",
      icon: <FontAwesomeIcon icon={faShoppingBag} />,
    },
    {
      path: "/pedidos",
      name: "Pedidos",
      icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

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

  const padding = {
    padding: "15px",    
  }
 
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen(!isOpen);    
  }

  const [showModal, setShowModal] = useState(false); 

  return (
    <div className="container">   
      <FontAwesomeIcon className='togglebtn' icon={faBars} onClick={toggle} style={isOpen ? {color:"#fff", zIndex:100} : {display:"none"}}/>
      <FontAwesomeIcon className='togglebtn' icon={faArrowRight} onClick={toggle} style={isOpen ? {display:"none"}:{color:"#fff", zIndex:100}  }/>
      <div className='tooltip' style={isOpen ? {display:"none"} : {display:"block"} }>Navegar</div>
      <div className={isOpen ? "sidebar" : "sidebar closed"}>        
        <div className="top_section">
          <UserCard className='usercard'/>                         
        </div>
        <div className='middle_section'>
          {
            menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="navlinks">
                <div className='sidebar_item'>
                  <div className="icon"><NavLink to={item.path} key={index} className={(navlinks => navlinks.isActive ? 'active' : '')}>{item.icon}</NavLink></div>
                  <div className="link_text">{item.name}</div>
                </div>                
              </NavLink>
            ))                     
          }
        </div>
        <div className='bottom_section'>
          <button onClick={handleLogout} >
            <div className='sidebar_item gay'>
              <div className="icon disconnect"><FontAwesomeIcon icon={faRightFromBracket}/></div>
              <div className="link_text disconectar">Desconectar</div>
            </div>  
          </button>            
        </div>                    
      </div>       
      
      <main className='dashcontent' id='dashcontent' showModal={showModal} setShowModal={setShowModal}>{children}</main>     
      <ToastContainer theme='dark' limit='2'/> 
    </div>           
  )
}

export default Sidebar