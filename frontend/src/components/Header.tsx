import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from './AuthContext'
function Header() {
  const [pressLO, setpressLO] = useState(false)
  const {user, setUser} = useContext(AuthContext)

  const navigate = useNavigate()
   
  useEffect(() => {
    api.get("/me")
    .then(res => {
      setUser(true)
    })
    .catch(() => {
      setUser(false);
    })
  }, [pressLO])

  const handleLogout =(() => {
    api.post('/logout')
    navigate('/login')
    setpressLO(!pressLO)
  })      


  
  return (
    <div className='flex bg-gray-500 w-full text-2xl text-center py-4   top-0 left-0 z-50'>
      <Link to="/" className='ml-20' >FoKuS</Link>
      {user ? <Link to="/fokus" className='mx-10'>Home</Link> : <Link to="/login" className='mx-10'>Home</Link>}
      {user ? (<button className='cursor-pointer' onClick={handleLogout}>Logout</button>)
      : <>
      <Link to="/register" className='mx-10'>Register</Link>
      <Link to="/login" className='mx-10'>Login</Link>
      </>}
    </div>
  )
}

export default Header
