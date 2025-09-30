import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../screens/Dashboard'
import Details from '../screens/Details'
import Historic from '../screens/Historic'
import Report from '../screens/Report'
import Test from '../screens/Test'


export default function DashRouter() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/test' element={<Test />} />
            <Route path='/historic' element={<Historic />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path='/report' element={<Report />} />
            
        </Routes>
    </Router>
  )
}
