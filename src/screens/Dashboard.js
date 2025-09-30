import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import "../css/Dashboard.css"
import logo from "../assets/images/emoney2.jpg"; 
import { CiUser } from "react-icons/ci";
import profileimage from "../assets/images/profile.jpg"
import { COLORS } from '../constants/theme';
import { FiLogOut } from "react-icons/fi";
import { useFetchFunctions } from '../infrasctructures/Functions';
import airtel from "../assets/images/airtel.png"
import moov from "../assets/images/moov.png"
import flash from "../assets/images/flash.png"
import express from "../assets/images/images.png"
import { TbReportAnalytics } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import gsap from 'gsap';
import Partners from '../components/Partners';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { FcMindMap } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

//https://emoney1-206c4d0f8346.herokuapp.com/
//const GET_PARTNERS_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/partner/getpartners"
//const LOCK_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/partner/partnerstatus"; 

//const GET_PARTNERS_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/partner/getpartners"
const GET_PARTNERS_URL = "https://ouedy-node.onrender.com/api/partner/getpartners"


//const LOCK_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/partner/partnerstatus"; 
const LOCK_URL = "https://ouedy-node.onrender.com/api/partner/partnerstatus"; 


//const SEARCH_PARTNER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/partner/searchpartners";
const SEARCH_PARTNER_URL = "https://ouedy-node.onrender.com/api/partner/searchpartners";

//https://emoney.onrender.com/


export default function Dashboard() {

    const {user, token, setRecss} = useContext(AuthContext); 
    const [isClicked, setIsClicked] = useState("");
    const {disconnect} = useFetchFunctions()
    const [active, setActive] = useState("profile"); 
    const divRef1 = useRef(null); 
    const divRef = useRef(null); 
    const divRef2 = useRef(null);
    const partnersRef = useRef(null);
    const blockRef = useRef(null);
    const block2Ref = useRef(null)
    const [status, setStatus] = useState("");
    const [partners, setPartners] = useState([]);
    const {postFunction, laFonctionGet} = useFetchFunctions(); 
    const [load, setLoad] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currrentItem, setCurrentItem] = useState(null);
    const [leStatut, setLeStatut] = useState(false);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
  
    const [position, setPosition] = useState("");
    const [recs, setRecs] = useState([]);
    const [count, setCount] = useState(null);
    const navigate = useNavigate();
    const [laValue, setLaValue] = useState(""); 





  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, 500);
  
      // Clean up the timeout if the query changes before the timeout is over
      return () => {
        clearTimeout(handler);
      };
    }, [query]);
  
    useEffect(() => {
      if (debouncedQuery) {
        searchUsers(debouncedQuery);
      }
    }, [debouncedQuery]);
  
    const searchUsers =  (query) => {


      try {

        postFunction(SEARCH_PARTNER_URL, {query, status: user.status}, token).then((data) => {

                console.log("c'est chaud", data);

                if(data && data.status === 0){

                        setPartners(data.users);


                }


        })
      
      } catch (error) {
        console.error('Erreur lors de la recherche des utilisateurs:', error);
      }


    };

    useEffect(() => {

       // console.log(userStatus);
       


    },[])

  const handleClick = (text) => {
    setIsClicked(text);
    setStatus(text);
    setTimeout(() => {

        setIsClicked(""); 

        postFunction(GET_PARTNERS_URL, {status: text, userStatus: user.status, startAt: 0 }, token).then((data) => {

            if(data && data.status === 0){

                    setPartners(data.data);
                    
                    setCount(data.count);

                    const recs = data.recs.map(item => {

                        return {label: item.name, value: item._id}    
                    })
                    setRecs([{label: user.name, value: user._id}, ...recs]);
                    setRecss([{label: user.name, value: user._id}, ...recs])

                    console.log("les recs", recs);

            }
    })

        if(text === "rec" || text === "pos"){

                handleClick1()
        }

    } , 200); 
    
    // Réinitialise l'effet après 200ms

    if(text === "disconnect"){

        disconnect().then(() => {

            localStorage.removeItem("token"); 
            localStorage.removeItem("user");
    })

    }




  };

  const onActive = (text) => {

        setActive(text);

        if(text === "test"){

            navigate("/test");

        }

        if(text === "historic"){

            navigate("/historic");

        }

        if(text === "report"){

            navigate("/report");

        }
  }

    useEffect(() => {

       // setToken(null);
       //console.log(user);
        //localStorage.removeItem("token");

    },[]); 

    const handleClick1 = () => {

            const t1 = gsap.timeline(); 

            t1.to(divRef.current, {display: "flex"}).to([divRef1.current, divRef2.current], {

                    height: "50%", 
                    duration: 1.5
            }).to(blockRef.current, {
               
                opacity: 0, 
                display: "none"
            
            }).to(block2Ref.current, {display: "block"}).to([divRef.current], {

                    opacity: 0, 
                    display: "none", 
                    duration: 0.5, 
                    ease: "power2.inOut"
            })
    }

    const onStatus = (text, active) => {

            setLoad(true);

           postFunction(LOCK_URL, {_id: text, active}, token).then((data) => {

                if(data && data.status === 0){

                   // console.log(data);
                        setLoad(false)
                        setPartners(olPartners => (

                                olPartners.map((item) => 
                                
                                    item._id === text ? 
                                    {...item, active: !item.active} : 
                                    item
                                )
                            
                            )

                        )
                }
           }, (err) => {

                console.log(err); 
                setLoad(false);
           })
    }

    const onGoBack = () => {

        const t1 = gsap.timeline(); 
        
        t1.to(divRef.current, {opacity: 1, display: "flex", duration: 0.5, ease: "power2.inOut"})
        .to(block2Ref.current, {display: "none"})
        .to(blockRef.current, {opacity: 1, display: "block"}).to([divRef1.current, divRef2.current], {

            height: 0, 
            duration: 1
    }).to(divRef.current, {display: "none"})
    }

    const openModal = (_id, status, id) => {

           // alert(_id);

           if(_id === "rec" || _id === "pos"){

            setPosition(_id);
            
            if(id){

                    setCurrentItem(partners.filter(item => item._id === id)[0]);
            }

           }else{

            setCurrentItem(partners.filter(item => item._id === _id)[0]); 

           }


           setLeStatut(status);
           setModalVisible(true);
    }

    const goBack = () => {

            setModalVisible(false)
    }


    const onChange = (valeur) => {

        setQuery(valeur);
            
    }


    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedQuery(query);
        }, 500);
    
        // Clean up the timeout if the query changes before the timeout is over
        return () => {
          clearTimeout(handler);
        };
      }, [query]);
    
      useEffect(() => {
        if (debouncedQuery) {
          searchUsers(debouncedQuery);
        }
      }, [debouncedQuery]);
    

    

  return (
    <div style={{
        width: "100vw", 
        height: "100vh", 
        position: "relative", 
        boxSizing: "border-box"
    }}>


    <div className='main-dash'>

     
        <div className='body-dash1'>
            <div>
                <img alt='le logo' src={logo} style={{
                    height: 100, 
                    width: 100, 
                    borderRadius: 20, 
                    objectFit: "cover"
                }} />
            </div>
            <div className='menu-dash acafad'>
                <div onClick={() => onActive("profile")}  className={`menu-li ${active === "profile" ? "is-actived" : ""}` }>
                    <div>
                        <CiUser />
                    </div>
                    <div>
                        Mon Profil
                    </div>
                </div>

                <div  onClick={() => onActive("historic")}  className={`menu-li ${active === "historic" ? "is-actived" : ""}` }>
                    <div>
                        <TbReportAnalytics />
                    </div>
                    <div>
                        Historique
                    </div>
                </div>

                <div onClick={() => onActive("report")}   className={`menu-li ${active === "report" ? "is-actived" : ""}` }>
                    <div>
                        <FaChartBar />
                    </div>
                    <div>
                        Rapport
                    </div>
                </div>

            </div>
        </div>
        <div className='body-dash2'>

       <Modal dismiss={() => setModalVisible(false)} recs={recs}   visible={modalVisible} item={currrentItem} position={position} status={leStatut} /> 

        <div ref={divRef} style={{
            position: "absolute", 
            height: "100%", 
            width: "100%", 
            zIndex: 10,
            display: "none", 
            flexDirection: "column", 
            justifyContent: "space-between"
        }} >
            <div style={{
                width: "100%", 
                height: 0, 
                backgroundColor: COLORS.gray3
            }} ref={divRef1}>

            </div>
            <div style={{
                width: "100%", 
                height: 0, 
                backgroundColor: COLORS.gray3
            }} ref={divRef2}>

            </div>
        </div>
        <div ref={block2Ref} style={{
            width: "100%", 
            height: "100%", 
           
            display: "none"
        }}>
                {
        load ? <Loading /> : 
<Partners onStatus={(text, active) => onStatus(text, active)} 
status={status} userStatus={user.status} openModal={(_id, status, id) => openModal(_id, status, id)} 
value={query}
onChange={(e) => onChange(e.target.value)}
partners={partners} goBack={onGoBack} />}
        </div>
        <div ref={blockRef}>
            <div className='headerr'>

            </div>
            <div style={{
                marginLeft: 70, 
                marginTop: -50, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center"
            }}>
                <img alt='image_de_profil' src={profileimage} style={{
                    width: 120, 
                    height: 120, 
                    borderRadius: "50%", 
                    border: "6px solid #fff"
                }} />
                <div style={{marginTop: 5, fontSize: 20, fontWeight: "bold"}} className="acafad">
                    {user.name}
                </div>
                <div className='body-dash3 acafad'>
                     
                        {user.status === "agg" && <div onClick={() => handleClick("rec")} className={isClicked === "rec" ? "clicked" : ""}  style={{backgroundColor: COLORS.gray3}}>
                            {user.recouvreurs && user.recouvreurs}
                            <div style={{
                                marginTop: 4
                            }}>
                                Recouvreurs
                            </div>
                    </div> }

                    {(user.status === "agg" || user.status === "pos") && <div onClick={() => handleClick("pos")} className={isClicked === "pos" ? "clicked" : ""} style={{backgroundColor: COLORS.gray3}}>
                            {user.pos && user.pos}
                            <div style={{
                                marginTop: 4
                            }}>
                                Points de vente
                            </div>
                    </div> }

                        <div onClick={() => handleClick("disconnect")}  className={isClicked === "disconnect" ? "clicked" : ""} style={{
                            backgroundColor: "rgb(41, 89, 152)", 
                            cursor: "pointer"
                        }}> 
                            <FiLogOut size={50} color="#fff" />
                        </div>

                </div>
                <div className='acafad' style={{
                    marginTop: 30, 
                    
                   
                }}>
                    <div style={{
                        fontWeight: "bolder", 
                        fontSize: 20
                    }}>
                        Profils activés : 
                    </div>
                    
                    <div style={{ 
                        marginLeft: 20
                    }}>
                    <div style={{
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-around"
                    }}>
                         {
                        user.services.filter(item => item === 'am').length > 0 && <div style={{
                            marginTop: 10
                        }} 
                            className="flex-auto"
                        >
                                <div>
                                    <img alt='logo_am' src={airtel} style={{
                                        height: 50, 
                                        width: 50, 
                                        borderRadius: "50%"
                                    }} />
                                </div>
                                <div >   
                                    Airtel Money : <strong>{user.amPhone}</strong> 
                                    <div> solde : <strong> {user.amBalance && user.amBalance.toLocaleString("Fr-fr")} Fcfa </strong> </div>
                                </div>
                            </div>

                            
                        }

                        {
                        user.services.filter(item => item === 'mm').length > 0 && <div style={{
                            marginTop: 10
                        }} 
                            className="flex-auto"
                        >
                                <div>
                                    <img alt='logo_moov' src={moov} style={{
                                        height: 50, 
                                        width: 50, 
                                        borderRadius: "50%"
                                    }} />
                                </div>
                                <div >   
                                    Moov Money : <strong>{user.mmPhone}</strong> 
                                    <div> solde : <strong> {user.mmBalance && user.mmBalance.toLocaleString("Fr-fr")} Fcfa </strong> </div>
                                </div>
                            </div>

                            
                        }
                        </div>
                        <div  
                            style={{
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-between", 
                                paddingRight: 100, 
                                boxSizing: "border-box"
                            }}
                        >

                        
                        {
                        user.services.filter(item => item === 'flash').length > 0 && <div style={{
                            marginTop: 10
                        }} 
                            className="flex-auto"
                        >
                                <div>
                                    <img alt='logo_flash' src={flash} style={{
                                        height: 50, 
                                        width: 50, 
                                        borderRadius: "50%"
                                    }} />
                                </div>
                                <div >   
                                    Flash Airtel   : <strong >  {user.flashPhone}</strong> 
                                    <div> solde : <strong> {user.flashBalance && user.flashBalance.toLocaleString("Fr-fr")} Fcfa </strong> </div>
                                </div>
                            </div>

                            
                        }
                         {
                        user.services.filter(item => item === 'express').length > 0 && <div style={{
                            marginTop: 10
                        }} 
                            className="flex-auto"
                        >
                                <div>
                                    <img alt='logo_express' src={express} style={{
                                        height: 50, 
                                        width: 50, 
                                        borderRadius: "50%"
                                    }} />
                                </div>
                                <div >   
                                    Express Libretis   : <strong >  {user.expressPhone}</strong> 
                                    <div> solde : <strong> {user.expressBalance && user.expressBalance.toLocaleString("Fr-fr")} Fcfa </strong> </div>
                                </div>
                            </div>

                            
                        }
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
           
        </div>
    </div>
        
</div>
  )
}
