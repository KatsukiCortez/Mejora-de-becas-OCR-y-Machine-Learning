import React from 'react'
import './listing.css'
import AnalisisDatos from './Sections/AnalisisDatos'
import GestionBecas from './Sections/GestionBecas'
import Comunicacion from './Sections/Comunicacion'

const Listing = () => {
  return (
    <div>
      <Comunicacion/>
      <div>
        <AnalisisDatos/>
      </div>
    </div>
    // <div>
    //   <AnalisisDatos/>
    // </div>
  )
}

export default Listing