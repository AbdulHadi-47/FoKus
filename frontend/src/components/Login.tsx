import React from 'react'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-24">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <input type="email" placeholder="Email" className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white" />
          <input type="password" placeholder="Password" className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
