import {BrowserRouter, Routes, Route} from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Home page</h1>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/nosotros' element={<h1>Nosotros</h1>} />
      <Route path='/control-de-usuarios' element={<h1>Control de Usuarios</h1>} />
      <Route path='/becas' element={<h1>Becas</h1>} />
      <Route path='/gestion-de-becas' element={<h1>Gestion de Becas</h1>} />
      <Route path='/historial-academico' element={<h1>Historial Academico</h1>} />
      <Route path='/comunicacion' element={<h1>Comunicacion</h1>} />
      <Route path='/ayuda-y-soporte' element={<h1>Ayuda y soporte</h1>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App