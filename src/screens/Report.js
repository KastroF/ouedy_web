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
import Select from 'react-select'
import Item from '../components/Item';
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";




//const GET_RECS_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/user/getrecs"
const GET_RECS_URL = "https://ouedy-node.onrender.com/api/user/getrecs"
//const GET_RECS_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/user/getrecs"

//const GET_REPORT_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/order/getreports"
//const GET_REPORT_URL = "https://emoney2.glitch.me/api/order/getreports"
//const GET_REPORT_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getreports"
const GET_REPORT_URL = "https://ouedy-node.onrender.com/api/order/getreports"

//https://emoney.onrender.com/

export default function Dashboard() {

    const {user, token} = useContext(AuthContext); 
    const [isClicked, setIsClicked] = useState(false);
    const {disconnect, laFonctionGet, postFunction} = useFetchFunctions()
    const [active, setActive] = useState("report"); 
    const navigate = useNavigate();
    const [recs, setRecs] = useState([]);
    const [services, setServices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [startAt, setStartAt] = useState(0);
    const [amount, setAmount] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [service, setService] = useState("Airtel Money"); 
    const [recId, setRecId] = useState(user._id);
    const [loading, setLoading] = useState(false);
    const [middleStartAt, setMiddleStartAt] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const currentYear = new Date().getFullYear();

    const [day2, setDay2] = useState('');
    const [month2, setMonth2] = useState('');
    const [year2, setYear2] = useState('');
    const monthRef2 = useRef(null);
    const yearRef2 = useRef(null);
    const currentYear2 = new Date().getFullYear();
    const [datee, setDatee] = useState(new Date());
    const [datee2, setDatee2] = useState(new Date());
 

    const handleDayChange = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 2 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 31)) {
            setDay(value);
            if (value.length === 2) {
              monthRef.current.focus(); // Passe automatiquement à l'input du mois
            }
          }
        }
      };
    
      // Gérer la saisie du mois
      const handleMonthChange = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 2 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 12)) {
            setMonth(value);
            if (value.length === 2) {
              yearRef.current.focus(); // Passe automatiquement à l'input de l'année
            }
          }
        }
      };
    
      // Gérer la saisie de l'année
      const handleYearChange = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 4 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) <= currentYear)) {
            setYear(value);
          }
        }
      };



      const handleDayChange2 = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 2 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 31)) {
            setDay2(value);
            if (value.length === 2) {
              monthRef2.current.focus(); // Passe automatiquement à l'input du mois
            }
          }
        }
      };
    
      // Gérer la saisie du mois
      const handleMonthChange2 = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 2 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 12)) {
            setMonth2(value);
            if (value.length === 2) {
              yearRef2.current.focus(); // Passe automatiquement à l'input de l'année
            }
          }
        }
      };
    
      // Gérer la saisie de l'année
      const handleYearChange2 = (e) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 4 && /^\d*$/.test(value))) {
          if (value === '' || (parseInt(value, 10) <= currentYear2)) {
            setYear2(value);
          }
        }
      };



  const onActive = (text) => {

        setActive(text);

        if(text === "test"){

            navigate("/test");

        }

        if(text === "profile"){

            navigate("/");

        }

        if(text === "historic"){

            navigate("/historic");

        }

        if(text === "report"){

            navigate("/report");

        }
  }


    useEffect(() => {

        

    const lesServices = (user.services.map(item => {

                if(item === "am"){

                    return {label: "Airtel Money", value: "Airtel Money"}
                }

                if(item === "mm"){

                    return {label: "Moov Money", value: "Moov Money"}
                }

                if(item === "flash"){

                    return {label: "Flash Airtel", value: "Flash"}
                }

                if(item === "express"){

                    return {label: "Express Libertis", value: "Express"}
                }
        }))

        setServices(lesServices);

        laFonctionGet(GET_RECS_URL, token).then((data) => {

                if(data && data.status === 0){

                    const recss = data.recs.map(item => {

                        return {label: item.name, value: item._id}    
                    })
                    setRecs([{label: user.name, value: user._id}, ...recss]);
                }
        })

    },[])


    useEffect(() => {


        postFunction(GET_REPORT_URL, {date1: datee, date2: datee2,
            _id: recId, name: service, startAt: 0}, token).then((data) => {

               console.log(data);

           if(data && data.status === 0){


               
                   setOrders(data.orders.map(item => {

                    return {order: item, user_info: item.user_info}
            }))
                   //console.log(data.orders); 
                   setAmount(data.amount); 
                   setAmount2(data.cash);
                   setStartAt(data.startAt);
                  // console.log(data.startAt)
           }

       })

    }, [recId, service])

    function formatDateToISO(date) {
        // Utilise la méthode toISOString pour obtenir la date en UTC
        return date; // Récupère uniquement la partie date
    }


    const customStyles = {
        control: (base) => ({
          ...base,
          zIndex: 2,  // Priorité pour le Select
        }),
        menu: (base) => ({
          ...base,
          zIndex: 3,  // Priorité pour le menu déroulant
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999, // S'assurer que le menu est au-dessus de tout
        }),
      };


      const handleClick = (text) => {

     

        if(text === "right"  && startAt !== null ){
            setLoading(true);

            setMiddleStartAt(startAt);

            postFunction(GET_REPORT_URL, {date1: datee, date2: datee2 ,
                _id: recId, name: service, startAt}, token).then((data) => {
    
                  // console.log(data);
    
               if(data && data.status === 0){
    
    
                   
                       setOrders(data.orders.map(item => {
    
                        return {order: item, user_info: item.user_info}
                }))
                       //console.log(data.orders); 
                       setAmount(data.amount); 
                       setAmount2(data.cash);
                       setStartAt(data.startAt);
                
                       setLoading(false);
                      // console.log(data.startAt)
               }
    
           })
        }


        if(text === "left" && ((startAt === null && middleStartAt) || (startAt && startAt > 10))){
            setLoading(true);

                setMiddleStartAt(parseInt(middleStartAt) - 10);

                postFunction(GET_REPORT_URL, {date1: datee, date2: datee2,
                    _id: recId, name: service, startAt : parseInt(middleStartAt) - 10}, token).then((data) => {
        
                      // console.log(data);
        
                   if(data && data.status === 0){
        
        
                       
                           setOrders(data.orders.map(item => {
        
                            return {order: item, user_info: item.user_info}
                    }))
                           //console.log(data.orders); 
                           setAmount(data.amount); 
                           setAmount2(data.cash);
                           setStartAt(data.startAt);
                           setLoading(false);
                          // console.log(data.startAt)
                   }
        
               })


        }

      }


      function compareDates(date1, date2) {
        // Extraction des parties de la date en utilisant le format jj/mm/yyyy
        const [day1, month1, year1] = date1.split('/').map(Number);
        const [day2, month2, year2] = date2.split('/').map(Number);
      
        // Conversion en objets Date (format yyyy-mm-dd)
        const d1 = new Date(year1, month1 - 1, day1);
        const d2 = new Date(year2, month2 - 1, day2);
      
        // Comparaison des dates
        return d1 <= d2;
      }
      

      const handleClickk = () => {

        setIsClicked(true); 

        if(day && month && year && day2 && month2 && year2){

           // alert(day)

            const date1 = day + "/" + (parseInt(month) +1) + "/" + year; 
            const date2 = day2 + "/" + (parseInt(month2) + 1) + "/" + year2; 

            if(compareDates(date1, date2)){

                //alert("la date", date1)

                setDatee(new Date(Date.UTC(year, month -1, day)));
                setDatee2(new Date(Date.UTC(year2, month2 - 1, day2)));


        postFunction(GET_REPORT_URL, {date1: (new Date(Date.UTC(year, month -1, day))), date2: (new Date(Date.UTC(year2, month2 - 1, day2))),
            _id: recId, name: service, startAt: 0}, token).then((data) => {

               console.log(data);

           if(data && data.status === 0){


               
                   setOrders(data.orders.map(item => {

                    return {order: item, user_info: item.user_info}
            }))
                   //console.log(data.orders); 
                   setAmount(data.amount); 
                   setAmount2(data.cash);
                   setStartAt(data.startAt);
                  // console.log(data.startAt)
           }

       })

            }else{

                alert("la Date1 doit être inférieure à la Date2");
            }

        }else{

            alert("Veuillez renseigner les dates requises")
        }

        setTimeout(() => {
            
            setIsClicked(false);

        }, 300);

      }


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
        <div style={{
            width: "100%", 
            height: "100%", 
            display: "flex", 
            padding: 20, 
            boxSizing: "border-box", 
            gap: 10
        }} className='body-dash2 acafad'>

            <div style={{
                width: "50%", 
                boxSizing: "border-box"
            }}>
                <Select styles={customStyles} onChange={(e) => setRecId(e.value)} value={ recs.length > 0 ? {label:recs.filter(item => item.value === recId)[0].label, value : recId} : recs[0] }  defaultValue={recs[0]} menuPortalTarget={document.body} options={recs} />

                <div style={{
                    marginTop: 10
                }}>
                    <Select styles={customStyles} onChange={(e) => setService(e.value)} value={ services.length > 0 ? {label:services.filter(item => item.value === service)[0].label, value : service} : services[0] }  defaultValue={services[0]} menuPortalTarget={document.body} options={services} />
                </div>

                <div style={{
                    marginTop: 10, 
                    marginLeft: 3, 
                    paddingBottom: 10, 
                    borderBottom: "1px solid #bbb"
                }}>
                    Montant : <strong> {amount && amount.toLocaleString("FR-fr")} Fcfa </strong>
                </div>

                <div style={{
                    marginTop: 10, 
                    marginLeft: 3, 
                    paddingBottom: 10, 
                    borderBottom: "1px solid #bbb"
                }}>
                    Espèces remis : <strong> {amount2 && amount2.toLocaleString("FR-fr")} Fcfa </strong>
                </div>
                <div style={{
                    width: "100%", 
                    marginTop: 10, 
                    paddingBottom: 20, 
                    borderBottom: "1px solid #bbb", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 20
                }}>
                    <div>
                        Date 1 :
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: 10,  alignItems: "center" }}>
                            <input
                            type='text'
                            value={day}
                            onChange={handleDayChange}
                            maxLength={2}
                            placeholder='JJ'
                            style={{ width: '30px', height: "30px",  textAlign: 'center' }}
                            />
                            <span>/</span>
                            <input
                            type='text'
                            value={month}
                            onChange={handleMonthChange}
                            maxLength={2}
                            placeholder='MM'
                            ref={monthRef}
                            style={{ width: '30px', height: "30px", textAlign: 'center' }}
                            />
                            <span>/</span>
                            <input
                            type='text'
                            value={year}
                            onChange={handleYearChange}
                            maxLength={4}
                            placeholder='AAAA'
                            ref={yearRef}
                            style={{ width: '50px', height: "30px",  textAlign: 'center' }}
                            />
                        </div>
                </div>
                <div style={{
                    width: "100%", 
                    marginTop: 10, 
                    paddingBottom: 20, 
                    borderBottom: "1px solid #bbb", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 20
                }}>
                    <div>
                        Date 2 : 
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: 10,  alignItems: "center" }}>
                            <input
                            type='text'
                            value={day2}
                            onChange={handleDayChange2}
                            maxLength={2}
                            placeholder='JJ'
                            style={{ width: '30px', height: "30px",  textAlign: 'center' }}
                            />
                            <span>/</span>
                            <input
                            type='text'
                            value={month2}
                            onChange={handleMonthChange2}
                            maxLength={2}
                            placeholder='MM'
                            ref={monthRef2}
                            style={{ width: '30px', height: "30px", textAlign: 'center' }}
                            />
                            <span>/</span>
                            <input
                            type='text'
                            value={year2}
                            onChange={handleYearChange2}
                            maxLength={4}
                            placeholder='AAAA'
                            ref={yearRef2}
                            style={{ width: '50px', height: "30px",  textAlign: 'center' }}
                            />
                        </div>
                   
                </div>
                <div className={`button ${isClicked ? "clicked" : ""}`} onClick={handleClickk} style={{
                    marginTop: 15, 
                    width: "100%", 
                  
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }}>
                    Rechercher
                </div>
            </div>

            <div style={{
                width: "50%", 
                padding: 15, 
                boxSizing: "border-box", 
                overflowY:"auto"
            }}>


{
                    loading ? <Loading /> : <div>

{
                orders.map((item) => {

                    let background; 
                    let type; 
                    let status;

                    if(item.order.status === "recovery"){


                       background = COLORS.green; 
                       status = "recouvrée"
            
                    }
            
            
                    if(item.order.status === "partial"){
            
            
                        background = "#F08080"; 
                        status = "recouvrée partiellement"

                        
                    }
            
                    if(item.order.status === "initial" && item.order.read === true){
            
            
                        background = "red"; 
                        status = "En attente de recouvrement"
                        
                    }

                    if(item.order.status === "initial" && item.order.read !== true){
            
            
                        background = "orange"; 
                        status = "En attente de recouvrement"
                        
                    }
            
                    if(item.order.status === "order"){
            
            
                        background = "#fff"; 
                        status = "commande"
                        
                    }
            

            
            
                    if(item.order.type === "am"){
            
                            type = "Airtel Money"
                    }
            
                    if(item.order.type === "mm"){
            
                        type = "Moov Money";
                    }
                    
                    
                    if(item.order.type === "flash"){
            
                        type = "Flash Airtel";
                    }
            
                    if(item.order.type === "express"){
            
                        type = "Express Libertis";
                    }

                        return <Item item={item} key={item.order._id} recId={recId} type={type} background={background} status={status}   />
                })
            }

                        </div>
                }
            <div style={{
                    display: "flex", 
                    alignItems: "center", 
                    gap: 20
                }}>
                    <div onClick={() => handleClick("left") } style={{
                        cursor: (startAt <= 10 && startAt !== null) || (startAt === null && !middleStartAt) ? 'auto' : "pointer"
                    }}>
                        <HiOutlineArrowLeftStartOnRectangle color={((startAt <= 10 && startAt !== null) || (startAt === null && !middleStartAt)) ? "#bbb" : "red"} size={30} />
                    </div>
                    <div  onClick={() => handleClick("right") } style={{
                        cursor: startAt === null ? "auto" : "pointer"
                    }}>
                        <HiOutlineArrowRightOnRectangle color={startAt === null ? "#bbb" : "red"}  size={30} />
                    </div>
                </div>

            </div>
           
        </div>
    </div>
        
</div>
  )
}
