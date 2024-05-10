import React from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'


// importamos los recursos a usar
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

//importamos los iconos
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  return (
    <div className='loginPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>Oficina de Cooperacion Tecnica Internacional</h2>
            <p>Sistema de becas</p>
          </div>
          
          <div className="footerDiv flex">
            <span className="text">No tengo una cuenta</span>
            <Link to={'/register'}>
              <button className='btn'>Registrarse</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Octi Cusco"/>
            <h3>Bienvenido</h3>
          </div>

          <form action="" className='form grid'>
            <span className='showMessage'>El estado del login va aqui</span>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className='icon'/>  
                <input type="email" id="username" placeholder='Ingrese usuario'/>
                </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contrasena</label>
              <div className="input flex"> 
                <BsFillShieldLockFill className='icon'/>  
                <input type="password" id="password" placeholder='Ingrese contrasena'/>
                </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Ingresar</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <a href="/dashboard">IR AL DASHBOARD</a>
          
            <span className="forgotPassword">
              Olvide mi contrasena <a href="">Haga click aqui</a>
            </span>

        </form>
        </div>


      </div>
    </div>
  )
}

export default Login