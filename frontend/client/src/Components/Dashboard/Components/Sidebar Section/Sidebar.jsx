import React from 'react'
import './sidebar.css'

import logo from '../../Assets/logo.png'
import { NavLink } from 'react-router-dom'

// Iconos
import { IoMdSpeedometer } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { BsQuestionCircle } from "react-icons/bs";



const Sidebar = () => {
  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="" />
        <h2>Octi cusco.</h2>
      </div>


      <div className="menuDiv">
        <h3 className="divTitle">
          Menu Rapido
        </h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <NavLink to="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon"/>
              <span className='smallText'>
                DashBoard
              </span>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink to='/dashboard/gestion-becas' className="menuLink flex">
              <FaCheckCircle className="icon"/>
              <span className='smallText'>
                Gestion de becas
              </span>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink to='/dashboard/comunicacion' className="menuLink flex">
              <MdEmail className="icon"/>
              <span className='smallText'>
                Comunicacion
              </span>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink to='/dashboard/analisis' className="menuLink flex">
              <GrConfigure className="icon"/>
              <span className='smallText'>
                Analisis de datos
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="settingsDiv">
        <h3 className="divTitle">
          Configuraciones
        </h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="" className="menuLink flex">
              <FaArrowTrendUp  className="icon"/>
              <span className='smallText'>
                Estadisticas
              </span>
            </a>
          </li>
          
          <li className="listItem">
            <a href="" className="menuLink flex">
              <MdHistory  className="icon"/>
              <span className='smallText'>
                Historial de acceso 
              </span>
            </a>
          </li>
          
          <li className="listItem">
            <a href="/dashboard/gestion-becas" className="menuLink flex">
              <FaUser  className="icon"/>
              <span className='smallText'>
                Administrar usuarios
              </span>
            </a>
          </li>
        </ul>
      
      </div>

      <div className="logoutDiv">
        <li className='listItem'>
          <a href="/" className='menuLink Flex'>
            <RiLogoutBoxFill className='icon'/>
            <span className='smallText'>
              Cerrar sesion
            </span>
          </a>
        </li>
      </div>
      
      <div className="sideBarCard">
        <BsQuestionCircle className='icon'/>
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Centro de ayuda</h3>
          <p>Si tiene problemas, por favor contacte con nosotros para mas preguntas</p>
          <button className='btn'>Centro de ayuda</button>
        </div>
      </div>

    </div>
  )
}

export default Sidebar