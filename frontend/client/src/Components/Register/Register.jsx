import React,{useState} from 'react'
import './Register.css'
import '../../App.css'
import { Link ,useNavigate} from 'react-router-dom'
import Axios from 'axios'

// importamos los recursos a usar
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

//importamos los iconos
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from 'react-icons/md'

const Register = () => {
  // USAMOS usestate PARA MANTENER NUESTRAS ENTRADAS
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  // ONCLICK QUE OBTIENE QUE USUARIO ESTA ENTRANDO
  const createUser = (e)=>{
    e.preventDefault()
    // SE NECESITA axios PARA CREAR UNA API QUE CONECTE AL SERVIDOR - LA INSTALACION ESTAN EN INSTRUCCIONES
    Axios.post('http://localhost:8080/register',{
      // CREAR VARIABLE PARA ENVIAR AL SERVIDOR A TRAVEZ DE LA RUTA
      Email: email,
      UserName: userName,
      Password: password
    }).then(()=>{
      // DESPUES DEL REGISTRO SE VA A REDIRIGIR A LOGIN 
      navigateTo('/')

      // VAMOS A LIMPIAR LOS CAMPOS TAMBIEN
      setEmail('')
      setUserName('')
      setPassword('')
    })
  }

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>Oficina de Cooperacion Tecnica Internacional</h2>
            <p>Sistema de becas</p>
          </div>
          
          <div className="footerDiv flex">
            <span className="text">Tengo una cuenta</span>
            <Link to={'/'}>
              <button className='btn'>Ingresar</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Octi Cusco"/>
            <h3>Queremos conocerte!</h3>
          </div>

          <form action="" className='form grid'>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>  
                <input type="text" id="email" placeholder='Ingrese correo' onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
                </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className='icon'/>  
                <input type="text" id="username" placeholder='Ingrese usuario' onChange={(event)=>{
                  setUserName(event.target.value)
                }}/>
                </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contrasena</label>
              <div className="input flex"> 
                <BsFillShieldLockFill className='icon'/>  
                <input type="password" id="password" placeholder='Ingrese Contrasena' onChange={(event)=>{
                  setPassword(event.target.value)
                }}/>
                </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Registrarse</span>
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

export default Register