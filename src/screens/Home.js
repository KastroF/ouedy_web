import React, { useContext, useState } from 'react'
import "../css/Home.css"
import logo from "../assets/images/emoney2.jpg"
import { FaRegMoneyBill1 } from "react-icons/fa6";
import FormInput from '../components/FormInput';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import { useFetchFunctions } from '../infrasctructures/Functions';
import { COLORS } from '../constants/theme';

//https://emoney1-206c4d0f8346.herokuapp.com/


//const SIGN_IN_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/user/onlogin"

const SIGN_IN_URL =  "https://ouedy-node.onrender.com/api/user/onlogin"
//const SIGN_IN_URL = "https://emoney2.glitch.me/api/user/onlogin"

export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {setToken, setUser} = useContext(AuthContext);
  const {postFunction} = useFetchFunctions();


  const handleChange = (e) => {
    setUsername(e.target.value); // Met à jour l'état avec la nouvelle valeur
  };

  const handleChangee = (e) => {
    setPassword(e.target.value); // Met à jour l'état avec la nouvelle valeur
  };


  const handleClick = () => {

    setLoading(true); 

    setErrorMessage("");

    if(username && password){

        postFunction(SIGN_IN_URL, {phone: username, password: password.trim()}).then((data) => {

          console.log(data);

          if(data && data.status !== 0){


          
              setTimeout(() => {

                setLoading(false); 
                setErrorMessage(data.message)
          
              }, 3000);
          }


          if(data && data.status === 0){

            setTimeout(() => {

              setLoading(false); 
              localStorage.setItem("token", data.token);
              setToken(data.token);
              setUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
              
        
            }, 5000);
          }

        }, (err) => {

            setLoading(false); 
            setErrorMessage("Une erreur s'est produite");
            console.log(err)
        })

    }else{



      setTimeout(() => {

        setLoading(false); 
        setErrorMessage("Veuillez remplir tous les champs")
  
      }, 2000);

    }

  }


 // if(loading) return <Loading />

  return (
    <div className='wrapper'>
       <div className='body1'>
          <div className='sign-in-form'>
            <div className='acafad' style={{fontWeight: 900}}>
              <div className='flex1'>
                  <div className='flex11'>
                    <div style={{
                      display: "flex",
                      alignItems: "center", 
                      justifyContent: "center", 
                      backgroundColor: COLORS.primary, 
                      height: 60, 
                      width: 60, 
                      borderRadius: 30, 
                     
                    }}>
                      <FaRegMoneyBill1 color='#fff' size={35} />
                    </div>
                    <div style={{marginLeft: 15, fontSize: 17}}>
                        <div>
                          OUEDY SERVICES
                        </div>
                        <div>
                          APPLICATION
                        </div>
                    </div>
                    <div>

                    </div>
                  </div>
                  <div style={{marginTop: 50, fontWeight: 500, color:"red"}}>
                    <div style={{color: "#aaa", fontSize: 17}}>Fluidifiez le flux,</div>
                    <div style={{color: "rgb(80,90,121)", fontSize: 17, fontWeight: 900}}>maîtrisez votre réseau.</div>
                  </div>
              </div>
            </div>
            <div className="acafad">
              <div style={{
                fontSize: 85, 
                fontWeight: "bolder"
              }} > 
                Bienvenue!
              </div>
              <div style={{
                marginBottom: 30
              }}>
              Une solution numérique pour centraliser, organiser et suivre votre réseau de points de vente, leurs commandes et la comptabilité de celles-ci.
              </div>

              <div style={{marginTop: 10}}>
                <FormInput isNumber={true} Icon={CiUser} onChange={handleChange} value={username} label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur" />
              </div>

              <div style={{marginTop: 10}}>
                <FormInput password={true}  Icon={CiLock} onChange={handleChangee} value={password} label="Mot de passe" placeholder="Saisissez votre mot de passe" />
              </div>
              <div style={{marginTop: 20}}>
                <Button width={true} onClick={handleClick} text="Se connecter" />
              </div>
              {loading && <Loading />}
              {
                errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : ""
              }
            </div>
          </div>
          <div className='image1'>
              <div style={{padding: 5, width: 60, height: 60, borderRadius: 50, display: "flex", alignItems: "center", 
               marginTop: 50, marginLeft: -30, backgroundColor:"#fff", justifyContent: "center"}}>
                <img src={logo} style={{width: 60, height: 60, borderRadius: 30, }} />
              </div>
          </div>
        </div> 
    </div>
  )
}
    