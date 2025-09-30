import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import "../css/Dashboard.css"
import logo from "../assets/images/emoney2.png"; 
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
import Item from '../components/Item';

//https://emoney1-206c4d0f8346.herokuapp.com/\

//const GET_ORDERS_URL = "https://emoney2.glitch.me/api/order/getorderstest"
//const GET_ORDERS_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getorderstest"
const GET_ORDERS_URL = "https://emoney.onrender.com/api/order/getorderstest"
//https://emoney.onrender.com/

export default function Test() {

    const [active, setActive] = useState("test"); 
    const navigate = useNavigate();
    const {token} = useContext(AuthContext); 
    const {laFonctionGet} = useFetchFunctions(); 
    const [orders, setOrders] = useState([]); 


    const onActive = (text) => {

        setActive(text);

        if(text === "profile"){

            navigate("/");

        }

        if(text === "historic"){

            navigate("/historic");

        }
  }

  useEffect(() => {

    laFonctionGet(GET_ORDERS_URL, token).then((data) => {

            console.log("la data", data);

            if(data && data.status === 0){

                    setOrders(data.orders);
            }
    })

  },[])

  return (
    <div className='main-dash'>

     
    <div className='body-dash1'>
        <div>
            <img alt='le logo' src={logo} style={{
                height: 100, 
                width: 100, 
                borderRadius: "50%", 
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

            <div onClick={() => onActive("test")}   className={`menu-li ${active === "test" ? "is-actived" : ""}` }>
                <div>
                    <FcMindMap />
                </div>
                <div>
                    Test
                </div>
            </div>
        </div>
    </div>

    <div style={{padding: 20}} className='body-dash2'>
            {
                orders.map((item) => {

                        return (
                            <Item item={item} key={item._id} />
                        )
                })
            }
    </div>

    </div>
  )
}
