import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './Home'

export default function Main() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
