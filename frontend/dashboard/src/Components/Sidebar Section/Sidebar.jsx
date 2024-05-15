import React from 'react'
import './sidebar.css'

import logo from '../../Assets/logo.png'

const Sidebar = () => {
  return (
    <div className='sideBar grid'>
      <logoDiv className="flex">
        <img src={logo} alt="" />
        <h2>Octi cusco.</h2>
      </logoDiv>
    </div>
  )
}

export default Sidebar