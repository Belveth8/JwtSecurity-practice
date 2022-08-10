import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function Router() {

  return (
    <BrowserRouter>
        <Login />
        <Routes>
            <Route path='/' element={<Login /> } />
            <Route path='/boardList' element={""} />
            <Route path='/register' element={<Register />} />

            {/* boardList */}
        </Routes>
    </BrowserRouter>

  )
}

export default Router