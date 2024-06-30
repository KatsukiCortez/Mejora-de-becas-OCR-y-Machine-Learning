import React from 'react';
import './sidebar.css';
import logo from '../../Assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

// Iconos
import { IoMdSpeedometer } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail, MdHistory } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaArrowUp, FaUser } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

const Sidebar = ({ onMenuItemClick }) => {
  const navigateTo = useNavigate();

  // Función para salir y eliminar el token
  const salirSinVolver = () => {
    localStorage.removeItem('token');
    navigateTo('/');
  };

  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>Octi Cusco</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">Menu Rapido</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <NavLink to="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className='smallText'>DashBoard</span>
            </NavLink>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('GestionBecas'); }}>
              <FaCheckCircle className="icon" />
              <span className='smallText'>Gestion de Becas</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('Comunicacion'); }}>
              <MdEmail className="icon" />
              <span className='smallText'>Comunicacion</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('AnalisisDatos'); }}>
              <GrConfigure className="icon" />
              <span className='smallText'>Analisis de Datos</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="settingsDiv">
        <h3 className="divTitle">Configuraciones</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('Estadisticas'); }}>
              <FaArrowUp className="icon" />
              <span className='smallText'>Estadisticas</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('Historial'); }}>
              <MdHistory className="icon" />
              <span className='smallText'>Historial de Acceso</span>
            </a>
          </li>

          <li className="listItem">
            <NavLink to="/dashboard/gestion-becas" className="menuLink flex" onClick={(e) => { e.preventDefault(); onMenuItemClick('AdminUsers'); }}>
              <FaUser className="icon" />
              <span className='smallText'>Administrar Usuarios</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="logoutDiv">
        <li className='listItem'>
          <NavLink to="/" className='menuLink flex' onClick={salirSinVolver}>
            <RiLogoutBoxFill className='icon' />
            <span className='smallText'>Cerrar Sesion</span>
          </NavLink>
        </li>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className='icon' />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Centro de Ayuda</h3>
          <p>Si tiene problemas, por favor contacte con nosotros para mas preguntas</p>
          <button className='btn'>Centro de Ayuda</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
