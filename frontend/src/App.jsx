import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'
import Signup from './components/Signup'
import Reservations from './pages/Reservations'
import Account from './pages/Account'



export const backendUrl = 'http://localhost:4000'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/reservations' element={<Reservations />}/>
        <Route path='/account' element={<Account/>}/>
        
        </Routes>    
    </div>
  )
}

export default App
