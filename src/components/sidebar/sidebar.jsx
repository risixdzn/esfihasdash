import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserGroup, faShoppingBag, faList } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useState } from 'react'

const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/home",
            name:"Home",
            icon:<FontAwesomeIcon icon={faHome}/>,
        },
        {
            path:"/pessoas",
            name:"Pessoas",
            icon:<FontAwesomeIcon icon={faUserGroup}/>,
        },
        {
            path:"/produtos",
            name:"Produtos",
            icon:<FontAwesomeIcon icon={faShoppingBag}/>,
        },
        {
            path:"/pedidos",
            name:"Pedidos",
            icon:<FontAwesomeIcon icon={faList}/>,
        },       
    ]
  return (
    <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FontAwesomeIcon icon={faList} onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
  )
}

export default Sidebar