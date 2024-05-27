import React from 'react'
import './top.css'

// ICONOS
import {BiSearchAlt} from 'react-icons/bi'
import {TbMessageCircle} from 'react-icons/tb'
import {MdOutlineNotificationsNone} from 'react-icons/md'

// IMPORTAR IMAGENES
import img from '../../../Assets/f1.jpg'

const Top = () => {
  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Bienvenido a OCTI.</h1>
          <p>Hola, bienvenido de nuevo</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder='Buscar'/>
          <BiSearchAlt className='icon'/>
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className='icon'/>
          <MdOutlineNotificationsNone className='icon'/>
          <div className="adminImage">
            <img src={img} alt="Admin image" />
          </div>
        </div>

      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Calicacion de becas</h1>
          <p>Oficina de coperacion tecnica internacional esta destinada a....</p>

          <div className="buttons flex">
            <button className='btn'>Explorar</button>
            <button className='btn'>Top estudiantes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top