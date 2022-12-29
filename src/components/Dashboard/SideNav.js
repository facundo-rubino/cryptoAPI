import React from 'react';
import './dashboard.css';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logoApp.png';


const SideNav = () => {

  return (
    <div className="sidenav">
      <div id="cajaImg">
        <img src={logo} id="logoApp" alt="logoApp" />
      </div>
      <NavLink to="comprar">
        Comprar/Vender
      </NavLink>
      <NavLink to="transacciones">
        Transacciones
      </NavLink>
      <NavLink to="sugerencias">
        Sugerencias
      </NavLink>
      <NavLink to="graficas">
        Gráficas
      </NavLink>
    </div>
  )
}

export default SideNav