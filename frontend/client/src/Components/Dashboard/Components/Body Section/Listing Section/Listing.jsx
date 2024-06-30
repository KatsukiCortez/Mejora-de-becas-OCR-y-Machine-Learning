import React from 'react'
import './listing.css'
import AdminUsers from './Sections/AdminUsers'
import Comunicacion from './Sections/Comunicacion'
import AnalisisDatos from './Sections/AnalisisDatos'
// import Estadisticas from './Sections/Estadisticas'
import GestionBecas from './Sections/GestionBecas'
import Historial from './Sections/Historial'

const Listing = ({selectedItem}) => {
  return (
    <div>
      {selectedItem === 'AdminUsers' && <AdminUsers/>}
      {selectedItem === 'Comunicacion' && <Comunicacion/>}
      {selectedItem === 'AnalisisDatos' && <AnalisisDatos/>}
      {/* {selectedItem === 'Estadisticas' && <Estadisticas/>} */}
      {selectedItem === 'GestionBecas' && <GestionBecas/>}
      {selectedItem === 'Historial' && <Historial/>}
    </div>
  )
}

export default Listing