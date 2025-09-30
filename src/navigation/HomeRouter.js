import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../screens/Home'


export default function HomeRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </Router>
  )
}
