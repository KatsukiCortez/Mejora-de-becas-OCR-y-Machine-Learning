import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Importamos los recursos a usar
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

// Importamos los iconos
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();

  // Manejar estado de mensajes de login
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  // Función para manejar el inicio de sesión
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('http://localhost:8080/login', {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.user) {
        localStorage.setItem('token', response.data.token);
        navigateTo('/dashboard'); // Redirigir al dashboard si el inicio de sesión es exitoso
      } else {
        navigateTo('/');
        setLoginStatus('Credenciales incorrectas'); // Mostrar mensaje de error si no hay usuario
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      navigateTo('/');
      setLoginStatus('Error en el servidor'); // Mostrar mensaje de error si falla el servidor
    }
  };

  // Efecto para manejar el mensaje de login
  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage'); // Mostrar mensaje
      setTimeout(() => {
        setStatusHolder('message'); // Ocultar después de 4 segundos
      }, 4000);
    }
  }, [loginStatus]);

  // Limpiar formulario al enviar
  const handleFormSubmit = () => {
    setLoginUserName('');
    setLoginPassword('');
  };

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

          <form action="" className='form grid' onSubmit={loginUser}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className='icon'/>  
                <input
                  type="text"
                  id="username"
                  placeholder='Ingrese usuario'
                  value={loginUserName}
                  onChange={(event) => setLoginUserName(event.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex"> 
                <BsFillShieldLockFill className='icon'/>  
                <input
                  type="password"
                  id="password"
                  placeholder='Ingrese contraseña'
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Ingresar</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className="forgotPassword">
              Olvidé mi contraseña <a href="#">Haga click aquí</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
