import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { AuthContext } from '../navigation/AuthProvider';
import { useFetchFunctions } from '../infrasctructures/Functions';
import Select from "react-select"
import Item from '../components/Item';
import { COLORS } from '../constants/theme';
import Loading from '../components/Loading';
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

//const GET_ORDER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getorders"
const GET_ORDER_URL = "https://ouedy-node.onrender.com/api/order/getorders"
//https://emoney.onrender.com/
//const GET_ORDER_URL = "https://emoney2.glitch.me/api/order/getorders"

const datas = [
    {
        label: "Tout", value: "Tout"
    }, 
    {label: "Express", value: "express"}, 
    {label: "Flash Airtel", value: "flash"}, 
    {label: "Airtel Money", value: "am"}, 
    {label: "Moov Money", value: "mm"}, 
    {label: "Les retours", value: "Return"}
]; 

export default function Details() {

    const {id} = useParams(); 
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState("Tout"); 
    const {user, token} = useContext(AuthContext);
    const [startAt, setStartAt] = useState(0);
    const {postFunction} = useFetchFunctions(); 
    const [amount2, setAmount2] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [middleStartAt, setMiddleStartAt] = useState(null);


    useEffect(() => {

      //  console.log("On entend bien");
    
        let type; 
    
        if(filter === "Airtel Money"){
    
            type = "am"
        }
    
        if(filter === "Moov Money"){
    
          type = "mm"
        }
    
        if(filter === "Express"){
    
          type = "express"
        }
    
        if(filter === "Flash"){
    
          type = "flash"
        }
    
       // setStartAt(0); 
       

    
        postFunction(GET_ORDER_URL, {type: filter !== "Return" ? filter : null, userStatus: user.status, startAt: 0, retour: filter === "Return" ? true : false,
           _id: id}, token).then((data) => {
    
              if(data && data.status === 0){
    
                console.log(data)
    
                  setOrders(data.orders);
                  setAmount(data.amount);
                  setAmount2(data.amount3)
                  setStartAt(data.startAt);
                  setLoading(false);
              }
    
        }, (err) => {
    
            console.log(err)
        })
    
      }, [refresh]); 


      const handleChange = (e) => {

        setFilter(e.value); 
    
        setTimeout(() => {
            setRefresh(!refresh); 
        }, 1000);
    
    
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

        alert(text); 
 
        
 
         if(text === "right" && startAt !== null){
 
             setMiddleStartAt(startAt);
             setLoading(true);

             postFunction(GET_ORDER_URL, {type: filter, userStatus: user.status, startAt, retour: filter === "Return" ? true : false,
             _id: id}, token).then((data) => {
      
                if(data && data.status === 0){
      
                  console.log(data)
      
                    setOrders(data.orders);
                    setAmount(data.amount);
                    setAmount2(data.amount3)
                    setStartAt(data.startAt);
                    setLoading(false);
                }
      
          }, (err) => {
      
              console.log(err)
          })
         }
 
 
         if(text === "left" && ((startAt === null && middleStartAt) || (startAt && startAt > 10))){
 
            
 
             setLoading(true);
 
             setMiddleStartAt(parseInt(middleStartAt) - 10);
                 
               
             postFunction(GET_ORDER_URL, {type: filter, userStatus: user.status, startAt: parseInt(middleStartAt) - 10, retour: filter === "Return" ? true : false,
             _id: id}, token).then((data) => {
      
                if(data && data.status === 0){
      
                  console.log(data)
      
                    setOrders(data.orders);
                    setAmount(data.amount);
                    setAmount2(data.amount3)
                    setStartAt(data.startAt);
                    setLoading(false);
                }
      
          }, (err) => {
      
              console.log(err)
          })
         }
 
   }
    


  return (
    <div style={{
       position: "fixed", 
       top: 0, 
       left: 0, 
       width: "100vw", 
       height: "100vh", 
       boxSizing: "border-box", 
       backgroundColor: "rgb(41, 89, 152)", 
       zIndex: 100, 
       display: "flex", 
       

    }}>
        <div style={{
            height: "100%", 
            width: "50%", 
            boxSizing: "border-box", 
            padding: 30
        }}>
            <div style={{cursor: "pointer"}} onClick={() => navigate(-1)  }>
               <FaChevronLeft size={25} color="#fff" />
            </div>
        </div>
        <div style={{
            height: "100%", 
            width: "50%", 
            backgroundColor: "#fff", 
            padding: 50, 
            boxSizing: "border-box", 
            overflowY: "auto", 
            
        }}>
            
            <div>
                    <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 
                            marginTop: 5

                    }}>
                        Choix du service
                    </div>

                    <Select options={datas} styles={customStyles} onChange={(e) => handleChange(e)} defaultValue={datas[0]} menuPortalTarget={document.body} /> 

                </div>

                <div style={{
                    paddingTop: 15, 
                    paddingBottom: 15, 
                    borderBottom: "1px solid #ccc"
                }}>
                <strong>{orders[0] && orders[0].order && orders[0].order.user_info && orders[0].order.user_info.name}</strong>
                </div>
                
                <div style={{
                    paddingTop: 15, 
                    paddingBottom: 15, 
                    borderBottom: "1px solid #ccc"
                }}>
                <strong>Dette:</strong> {amount && amount.toLocaleString('fr-FR')} Fcfa {amount2 && amount2 > 0 && " - " + amount2.toLocaleString("FR-fr")} Fcfa
                </div>

                {
                    loading ? <Loading /> : <div>

                {
                orders.map((item) => {

                    let background; 
                    let type; 
                    let status;
                    
                    let cursorr = (item.order.status === "return" && !item.order.read || (item.order.read && item.order.rest && item.order.rest > 0 ) ) ? true : false;

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
            
                    if(item.order.status === "return"){
            
            
                        background = "yellow"; 
                        status = "retour"
                         
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

                        return <Item item={item} key={item.order._id} type={type} background={background} status={status} cursor={cursorr} onClick={() => {}} />
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
  )
}
