import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-24">
      <h1 className="text-4xl font-bold mb-4">FoKus</h1>
      <p className="text-lg mb-8">Work Productively. Stay Focused. Achieve More.</p>
      <div className="space-x-4">
        <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Login</a>
        <a href="/register" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Register</a>
      </div>
    </div>
  )
}

export default Home
