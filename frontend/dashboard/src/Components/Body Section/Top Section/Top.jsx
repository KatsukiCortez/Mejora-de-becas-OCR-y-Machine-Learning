import React from 'react'
import './top.css'

// ICONOS
import {BiSearchAlt} from 'react-icons/bi'
import {TbMessageCircle} from 'react-icons/tb'
import {MdOutlineNotificationsNone} from 'react-icons/md'

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
        </div>

      </div>
    </div>
  )
}

export default Top