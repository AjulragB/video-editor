import Home from '../pages/Home'
import Edit from '../pages/Editor/Edit'

import { Routes,Route } from 'react-router-dom'

const Routers= () => {
  return <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/edit' element={<Edit/>} />
    

  </Routes>
}

export default Routers