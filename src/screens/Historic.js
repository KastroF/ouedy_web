import React, {useState, useEffect, useContext} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import logo from "../assets/images/emoney2.jpg"; 
import { CiUser } from "react-icons/ci";
import { COLORS } from '../constants/theme';
import { useFetchFunctions } from '../infrasctructures/Functions';
import { TbReportAnalytics } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { AuthContext } from '../navigation/AuthProvider';
import Item from '../components/Item';
import Select from "react-select"
import { TbCircleCheckFilled } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";


//https://emoney1-206c4d0f8346.herokuapp.com/

//const GET_ORDER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getorders"
//const GET_ORDER_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/order/getorders"

//const GET_ORDER_URL = "https://emoney2.glitch.me/api/order/getorders"
const GET_ORDER_URL = "https://ouedy-node.onrender.com/api/order/getorders"

//const ADD_CASH_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/cash/addcash"
const ADD_CASH_URL = "https://ouedy-node.onrender.com/api/cash/addcash"
//const ADD_CASH_URL = "https://emoney-8a55a36f3b9d.herokuapp.com/api/cash/addcash"

//const GET_PENDING_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getpendingreturns"
const GET_PENDING_URL = "https://ouedy-node.onrender.com/api/order/getpendingreturns"
//const GET_PENDING_URL = "https://emoney2.glitch.me/api/order/getpendingreturns"


//const GET_LIST_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/getlist2"
const GET_LIST_URL = "https://ouedy-node.onrender.com/api/order/getlist2"
//const GET_LIST_URL = "https://emoney.onrender.com/api/order/getlist2"

const GET_NEW_REPORT_URL = "https://ouedy-node.onrender.com/api/order/getnewreportt";

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


export default function Historic() {

    const [active, setActive] = useState("historic"); 
    const navigate = useNavigate();
    const {token, user} = useContext(AuthContext); 
    const {laFonctionGet, postFunction} = useFetchFunctions(); 
    const [orders, setOrders] = useState([]); 
    const [goToOrders, setGoToOrders] = useState(false);
    const [startAt, setStartAt] = useState(0); 
    const [type, setType] = useState("Tout"); 
    const [amount2, setAmount2] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [load, setLoad] = useState(false);
    const [middleStartAt, setMiddleStartAt] = useState(null);
    const [sum, setSum] = useState(0);
    const [summ, setSumm] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [viewList, setViewList] = useState(false); 
    const [list, setList] = useState([]); 
    const [loadList, setLoadList] = useState(false);
    const [final, setFinal] = useState([]);
    const [readsOnly, setReadsOnly] = useState(false); 
    




    const onActive = (text) => {

        setActive(text);

        if(text === "profile"){

            navigate("/");

        }

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

  
    postFunction(GET_ORDER_URL, {type: type === "Return" ? "Tout" : type, goToOrders, readsOnly, retour: type === "Return" ? true: false, startAt: 0, userStatus: user.status   }, token).then((data) => {


        console.log(data);
        if(data && data.status === 0){

                setStartAt(data.startAt); 
                setOrders(data.orders);
                setAmount2(data.amount2);
                setFinal(data.final);

                let summm = 0; 
                let rest = 0; 
                for(let i of data.final){

                    summm += i.sum; 
                    rest += i.retours;
                }

                setSumm(parseInt(summm) - parseInt(rest))
                setLoading(false);
        } 

    })

    postFunction(GET_PENDING_URL, {status: user.status, web: true}, token).then((data) => {

        console.log(data);

        if(data && data.status === 0){

            setSum(data.sum);

        }
    })

  }, [refresh])

  const handleChange = (e) => {

    setType(e.value); 

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

       // alert(text); 

       

        if(text === "right" && startAt !== null){

            setMiddleStartAt(startAt);
            setLoading(true);

            postFunction(GET_ORDER_URL, {type: type === "Return" ? "Tout" : type, goToOrders, readsOnly, retour: type === "Return" ? true: false, startAt, userStatus: user.status   }, token).then((data) => {


                if(data && data.status === 0){
        
                        setStartAt(data.startAt); 
                        setOrders(data.orders);
                        setAmount2(data.amount2);
                        setLoading(false);
                } 
        
            })
        }


        if(text === "left" && ((startAt === null && middleStartAt) || (startAt && startAt > 10))){

           

            setLoading(true);

            setMiddleStartAt(parseInt(middleStartAt) - 10);
                
              

                postFunction(GET_ORDER_URL, {type: type === "Return" ? "Tout" : type, goToOrders, readsOnly, retour: type === "Return" ? true: false, startAt: parseInt(middleStartAt) - 10, userStatus: user.status   }, token).then((data) => {


                    if(data && data.status === 0){
            
                            setStartAt(data.startAt); 
                            setOrders(data.orders);
                            setAmount2(data.amount2);
                            setLoading(false);
                    } 
            
                })
        }

  }


  const handleClick2 = (text, item) => {

        if(text){

            setCurrentItem(item);
            setModalVisible(true);
        }
  }

  const handleClick3 = (text, gain) => {

    //alert(text._id+" "+gain); 

    postFunction(ADD_CASH_URL, {_id: text._id, amount: parseInt(gain)}, token).then((data) => {

            if(data && data.status === 0){

            
                console.log(data);

                     const orderrs =  orders.map(item => {

                                if(item.order._id === text._id){

                                    const item2 = item.order; 

                                          item2.amount  = item2.rest && item2.rest > 0 ? item2.amount : parseInt(item2.amount) - parseInt(gain)
                                          item2.rest  = item2.rest && item2.rest > 0 ?  parseInt(item2.rest) - parseInt(gain) : 0; 
                                          item2.message = data.message;

                                          item.order = item2; 

                                          return item; 
                                
                                }else{

                                    return item
                                }
                        })


                        setOrders(orderrs);
             

                setTimeout(() => {
                    
                    setModalVisible(false);
                    setLoad(!load);


                }, 2000);

            }
    })


    
  }


  const handleClick4 = () => {

    setIsClicked(true); 

    setLoadList(true);

    postFunction(GET_LIST_URL, {status: user.status}, token).then((data) => {

        if(data && data.status === 0){

                console.log(data.list); 
                setList(data.list);
                setLoadList(false);
        }

    },(err) => {

        console.log(err)
        setLoadList(false);
    })

    setTimeout(() => {
        setIsClicked(false);
        setViewList(true);
    }, 300);

  }


  
    return (

    <div >
        <div className='main-dash'>
    
        <Modal visible={modalVisible} status="return" item={currentItem} load={load} dismiss={() => setModalVisible(false)} onClick={(text, text2) => handleClick3(text, text2) } />
         
         {
            viewList && <div style={{
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0,0,0,0.3)", 
                position: "absolute", 
                zIndex: 100, 
                padding: 20, 
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "center"
            }} >

                <div style={{
                    height: "100%", 
                    width: "40%", 
                    backgroundColor: "#fff", 
                    borderRadius: 10, 
                    padding: 20, 
                    overflowY: "auto"
                }} >

                    <div onClick={() => setViewList(false) } style={{
                        cursor: "pointer"
                    }}>
                        <FaChevronLeft size={25} />
                    </div>

                    <div className='acafad' style={{
                        marginTop: 15, 
                        fontWeight: "bold", 
                        fontSize: 20
                    }}>
                        Liste des points qui doivent
                    </div>

                    { loadList ? <Loading width={true} /> : <div style={{
                        marginTop: 20
                    }}>
                        {
                            list.map((item, index) => {

                                return(
                                    
                                    <div onClick={() => navigate(`details/${item.id}`) } key={item.id} style={{
                                        display: "flex", 
                                        cursor: "pointer",
                                        alignItems: "center", 
                                        justifyContent: "space-between", 
                                        flexDirection: "row", 
                                        padding: "15px 0", 
                                        borderBottom: "1px solid #bbb"
                                    }}>
                                        <div>
                                        {index + 1}. {item.name}
                                        </div>

                                        <div >
                                            {item.sum.toLocaleString("FR-fr")} Fcfa
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> }

                </div>

                </div>
         }
        <div className='body-dash1'>
            <div>
                <img alt='le logo' src={logo} style={{
                    height: 100, 
                    width: 100, 
                    borderRadius:20, 
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
    
        <div style={{padding: 20, display: "flex", gap: 20}} className='body-dash2 acafad'>
            <div className='' style={{
                height: "100%", 
                width: "50%", 
                
            }}>
                <div style={{
                    fontWeight: 800
                }}>
                    Historique des commandes
                </div>
                <div onClick={handleClick4} className={isClicked ? "clickedd" : ""}  style={{
                    fontWeight: 800, 
                    marginTop: 10, 
                    color: "rgb(41, 89, 152)", 
                    cursor: "pointer"
                }}>
                   Liste
                </div>
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
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    marginTop: 10, 
                    color: "rgb(41, 89, 152)", 
                    paddingBottom: 5, 
                    borderBottom: "1px solid black"
                }} >
                    <div style={{
                        fontWeight: 800, 
                        fontSize: 20
                    }}>
                        {goToOrders ? "Les commandes non recouvrées" : "Recouvrées et non recouvrées"}
                    </div>
                    <div onClick={() => {setGoToOrders(!goToOrders); setRefresh(!refresh); } } style={{
                        cursor: "pointer"
                    }}>
                        {goToOrders ? <TbCircleCheckFilled size={30} /> : <TbCircleCheck size={30} />}
                    </div>
                    
                </div>
                <div style={{
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    marginTop: 10, 
                    color: "rgb(41, 89, 152)", 
                    paddingBottom: 5, 
                    borderBottom: "1px solid black"
                }} >
                    <div style={{
                        fontWeight: 300, 
                        fontSize: 16
                    }}>
                        {readsOnly ? "Les commandes non confirmées" : "Toutes les commandes"}
                    </div>
                    <div onClick={() => {setReadsOnly(!readsOnly); setRefresh(!refresh)} } style={{
                        cursor: "pointer"
                    }}>
                        {readsOnly ? <TbCircleCheckFilled size={30} /> : <TbCircleCheck size={30} />}
                    </div>
                    
                </div>
                <div style={{
                         display: "flex", 
                         alignItems: "center", 
                         justifyContent: "space-between", 
                         marginTop: 10, 
                         paddingBottom: 10,  
                         borderBottom: "1px solid black"
                    }}>
                        <div>
                            Gains Non recouvrés : <strong> {amount2 && amount2.toLocaleString("FR-fr")} Fcfa </strong>
                        </div>
                        <div>

                        </div>
                    </div>

                    <div style={{
                         display: "flex", 
                         alignItems: "center", 
                         justifyContent: "space-between", 
                         marginTop: 10, 
                         paddingBottom: 10,  
                         borderBottom: "1px solid black"
                    }}>
                        <div>
                            Espèces non remis : <strong> {sum && sum.toLocaleString("FR-fr")} Fcfa </strong>
                        </div>
                        <div>

                        </div>
                    </div>

                    {
                        final.map((item) => {

                                return(
                                    <div key={item.id} style={{
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "space-between", 
                                        marginTop: 10, 
                                        paddingBottom: 10,  
                                        borderBottom: "1px solid black"
                                   }}>
                                       <div>
                                           <strong> {item.name} </strong> : {item.sum.toLocaleString("FR-fr")} Fcfa -  {item.retours && item.retours.toLocaleString("FR-fr")} Fcfa
                                       </div>
                                       <div>
               
                                       </div>
                                   </div>
                                )
                        })
                    }

                    {
                        final.length > 0 &&   <div  style={{
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between", 
                            marginTop: 10, 
                            paddingBottom: 10,  
                            borderBottom: "1px solid black"
                       }}>

                           <strong>Total :</strong>  {summ && summ.toLocaleString("FR-fr")} Fcfa
            
                        </div>  
                    }
            </div>

          

            <div style={{
                overflow: "auto", 
                display: "flex", 
                alignItems: "center", 
                flexDirection: "column", 
                boxSizing: "border-box", 
                width: "50%",
                padding: 20
                
            }}>

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

                        return <Item item={item} key={item.order._id} type={type} background={background} status={status} cursor={cursorr} onClick={() => handleClick2(cursorr, item.order)} />
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
        <Outlet />
    </div>
      )
}
