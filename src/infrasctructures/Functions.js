import React, { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";

export const useFetchFunctions = () => {

    const {setToken, setUser} = useContext(AuthContext); 

    const fetchWithTimeout =  async (resource, options = {}) => {

        const {timeout = 30000} = options;

        const controller = new AbortController();

        const id = setTimeout(() => {
            
            controller.abort()

        }, timeout);

        const response = await fetch(resource, {
            ...options , 
            signal: controller.signal
        }); 


        clearTimeout(id)

        return response

    }


const postWithFile = async (url, body, token) => {
  
    if(token){

        try {
            const response = await fetch(url, {
              method: 'POST',
              body: body,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
      
            const responseJson = await response.json();


            
            return responseJson
    
          } catch (error) {
            console.error(error);
        
          }

    }else{

        try {
            const response = await fetch(url, {
              method: 'POST',
              body: body,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            const responseJson = await response.json();
            
            return responseJson
    
          } catch (error) {
            console.error(error);
           
          }
    }

   

}


const postFunction = async (url, body, token) => {

   // Alert.alert("i");

   if(token){

    try{
  
  
        const response = await fetchWithTimeout(url,  {
          method: 'POST', 
          
          headers: {
             'Content-Type': 'application/json', 
             'Authorization': `Bearer ${token}`,
             
          }, 
          
             body: JSON.stringify(body), 
             timeout: 100000, 
            
             
         
         })
      
         //setLoading(false);
      
        const responseJson = await response.json(); 
    
          
       return responseJson;
        
    
       
    
      }catch(e){
    
          console.log("c'est ici "+e); 
        
       
      }

   }else{

    try{
  
  
        const response = await fetchWithTimeout(url,  {
          method: 'POST', 
          
          headers: {
             'Content-Type': 'application/json', 
             
             
          }, 
          
             body: JSON.stringify(body), 
             timeout: 100000
             
         
         })
      
         //setLoading(false);
      
        const responseJson = await response.json(); 
    
          
       return responseJson;
        
    
       
    
      }catch(e){
    
          console.log("c'est ici "+e); 
         
       
      }

   }

  
  }

  const laFonctionGet =  async (url, token) => {

    if(token){


        try{

            const response = await fetchWithTimeout(url, {
                method: "GET",     
                headers: {
                
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token}`,
                }, 
                timeout: 50000, 
               
            }); 
      
            const responseJson = await response.json(); 
      
            return responseJson;
      
          
      
        }catch(e){
      
          console.log(e);
  
         // Alert.alert("Vérifiez votre connexion internet")
        
        }

    }else{

        try{

            const response = await fetchWithTimeout(url, {
                method: "GET",     
                headers: {
                
                  'Content-Type': 'application/json', 
                }, 
                timeout: 20000
            }); 
      
            const responseJson = await response.json(); 
      
            return responseJson;
      
          
      
        }catch(e){
      
          console.log(e);
     
        //  Alert.alert("Vérifiez votre connexion internet")
        
        }

    }


}


const disconnect = async () => {
   
      setToken(null); 
      setUser(null);

  }


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

    return {

        postFunction, 
        laFonctionGet, 
        validateEmail, 
        postWithFile, 
        disconnect

    }
}