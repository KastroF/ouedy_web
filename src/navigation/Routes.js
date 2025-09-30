import React, { useContext, useEffect } from 'react'
import { useFetchFunctions } from '../infrasctructures/Functions';
import { AuthContext } from './AuthProvider'
import DashRouter from './DashRouter';
import HomeRouter from './HomeRouter';

//https://emoney1-206c4d0f8346.herokuapp.com/
//const GET_USER_URL = "https://emoney2.glitch.me/api/user/getuser"
//const GET_USER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/user/getuser";
const GET_USER_URL = "https://emoney.onrender.com/api/user/getuser";


//https://emoney.onrender.com/
export default function Routes() {

  const {token, setToken, setUser} = useContext(AuthContext); 
  const {laFonctionGet} = useFetchFunctions()

  useEffect(() => {

    const token = localStorage.getItem("token"); 
    const user =  JSON.parse(localStorage.getItem("user"));

   console.log("le token 1 est ", token);
   console.log("le token 2 est ", user);

    setToken(token); 

    if(user){

      setUser(user);

      laFonctionGet(GET_USER_URL, token).then((data) => {

          if(data && data.status === 0){

              setUser(data.user);
              localStorage.removeItem("user"); 
              localStorage.setItem("user", JSON.stringify(data.user))
          }
      })

    }




    

  },[])
  
      return(
        <>
          {token ? <DashRouter /> : <HomeRouter />}
        </>
      )
}
