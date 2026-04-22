import { useState } from 'react'
import Fokus from './components/Fokus'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path='/' element={<Home />} ></Route>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path= '/fokus' element={<Fokus />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
