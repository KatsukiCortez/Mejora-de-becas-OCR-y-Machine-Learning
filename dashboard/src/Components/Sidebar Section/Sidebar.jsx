import React from 'react'
import './sidebar.css'

import logo from '../../Assets/logo.png'

// Iconos
import { IoMdSpeedometer } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";

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
            <a href="" className="menuLink flex">
              <IoMdSpeedometer className="icon"/>
              <span className='smallText'>
                DashBoard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <FaCheckCircle className="icon"/>
              <span className='smallText'>
                Gestion de becas
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <MdEmail className="icon"/>
              <span className='smallText'>
                Comunicacion
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <GrConfigure className="icon"/>
              <span className='smallText'>
                Analisis de datos
              </span>
            </a>
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
              <IoMdSpeedometer className="icon"/>
              <span className='smallText'>
                DashBoard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <FaCheckCircle className="icon"/>
              <span className='smallText'>
                Gestion de becas
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <MdEmail className="icon"/>
              <span className='smallText'>
                Comunicacion
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="" className="menuLink flex">
              <GrConfigure className="icon"/>
              <span className='smallText'>
                Analisis de datos
              </span>
            </a>
          </li>
        </ul>
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