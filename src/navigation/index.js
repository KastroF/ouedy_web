import React from 'react'
import AuthProvider  from './AuthProvider'
import Routess from './Routes'

export default function Provider() {


  return (
    <AuthProvider>
       <Routess /> 
    </AuthProvider>
  )
}
