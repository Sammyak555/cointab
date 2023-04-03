import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Home from '../Pages/Home'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route  path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>} />
        </Routes>
        
    </div>
  )
}

export default AllRoutes