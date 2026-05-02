import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { AuthContext } from './AuthContext'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {user, setUser} = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/login',  {username, password}, {withCredentials: true})
      setUser(true)
      navigate('/fokus')
    } catch (err: any) {
      setError(err?.response?.data?.error || "Login Failed")
      setUser(false)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-24">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">Login</button>
        </form>
        <div>{error}</div>
      </div>
    </div>
  )
}

export default Login
