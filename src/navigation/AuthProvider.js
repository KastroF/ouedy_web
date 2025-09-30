import React, { createContext, useState } from 'react'


export const AuthContext = createContext();


export default function AuthProvider({children}) {

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null); 
  const [recss, setRecss] = useState([])

  return (
    <AuthContext.Provider value={{
        token, 
        setToken, 
        user,
        setUser, 
        recss, 
        setRecss
    }} >
        {children}
    </AuthContext.Provider>
  )
}
