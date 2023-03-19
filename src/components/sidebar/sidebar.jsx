import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserGroup, faShoppingBag, faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

import { UserAuth } from '../../context/AuthContext'

import UserCard from './components/userCard'

const Sidebar = ({children}) => {
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      path: "/pessoas",
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

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <UserCard/>      
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
      
      <main className='dashcontent'>{children}</main>     
       
    </div>           
  )
}

export default Sidebar