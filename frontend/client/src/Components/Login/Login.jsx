import React, {useEffect, useState} from 'react'
import './Login.css'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

// importamos los recursos a usar
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

//importamos los iconos
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  // USAMOS usestate PARA MANTENER NUESTRAS ENTRADAS
  const [loginUserName, setLoginUserName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigateTo = useNavigate()

  //AHORA VAMOS A MOSTRAR UN MENSAJE AL USUARIO
  const [loginStatus, setLoginStatus] = useState('')
  const [statusHolder, setstatusHolder] = useState('message')

  // ONCLICK QUE OBTIENE QUE USUARIO ESTA ENTRANDO
  const loginUser = (e) => {
    e.preventDefault();
  
    Axios.post('http://localhost:8080/login', {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    }).then((response) => {
      console.log('Respuesta del servidor:', response.data);
  
      if (response.data.user) { // Verificar si hay un usuario devuelto en la respuesta
        navigateTo('/dashboard'); // Redirigir al dashboard si el inicio de sesion es exitoso
      } else {
        navigateTo('/');
        setLoginStatus('Credenciales no existen'); // Mostrar mensaje de error si no hay usuario
      }
    }).catch((error) => {
      console.error('Error al intentar iniciar sesión:', error);
      navigateTo('/');
      setLoginStatus('Error en el servidor'); // Mostrar mensaje de error si falla el servidor
    });
  };
  

  useEffect(()=>{
    if (loginStatus !== '') {
      setstatusHolder('showMessage') // MOSTRAR MENSAJE
      setTimeout(() => {
        setstatusHolder('message') // ESCONDER DESPUES DE 4 SEGUNDOS
      }, 4000);
    }
  }, [loginStatus])

  // VAMOS A LIMPIAR EL FORMULARIO AL SUBIR
  const onSubmit = ()=>{
    setLoginUserName('')
    setLoginPassword('')
  }

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

          <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className='icon'/>  
                <input type="text" id="username" placeholder='Ingrese usuario'
                onChange={(event)=>{
                  setLoginUserName(event.target.value)
                }}/>
                </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contrasena</label>
              <div className="input flex"> 
                <BsFillShieldLockFill className='icon'/>  
                <input type="password" id="password" placeholder='Ingrese contrasena'
                onChange={(event)=>{
                  setLoginPassword(event.target.value)
                }}/>
                </div>
            </div>

            <button type='submit' className='btn flex' onClick={loginUser}>
              <span>Ingresar</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

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