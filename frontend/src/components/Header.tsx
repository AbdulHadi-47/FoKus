import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='flex bg-gray-500 w-full text-2xl text-center py-4   top-0 left-0 z-50'>
      <Link to="/" className='ml-20' >FoKuS</Link>
      <Link to="/fokus" className='mx-10'>Home</Link>
      <Link to="/register" className='mx-10'>Register</Link>
      <Link to="/login" className='mx-10'>Login</Link>
    </div>
  )
}

export default Header
