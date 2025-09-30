import React, {useState, useContext} from 'react'
import { COLORS } from '../constants/theme'
import { FaUserEdit } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from '../navigation/AuthProvider';

export default function PartnerItem({item, onStatus, openModal, onModify}) {

    const [isClicked, setIsClicked] = useState("");
    const {user} = useContext(AuthContext);

    const handleClick = (text, text2, _id) => {

            setIsClicked(text); 

            if(text2 === "status"){

                   // alert(text);
                    onStatus(text, item.active);
            }


            if(text2 === "send"){

                openModal(_id, "send")

            }

            setTimeout(() => {
                
                setIsClicked("");

            }, 200);
    }

  return (
    <div className='head acafad' style={{
        display: "flex", 
        alignItems: "center", 
        height: 50, 
        border: "1px solid #ddd", 
       
        width: "100%"
    }}>

                    <div style={{
                        width: "25%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                       {(item.status === "pos" && user.status === "agg") ? <IoIosSend onClick={() => handleClick(`${item.phone}_${item._id}`, "send", item._id)} className={isClicked === `${item.phone}_${item._id}` ? "clickedd" : ""} size={20} style={{marginRight: 10, cursor: "pointer"}} /> : ""}
                        <div>{item.name}</div>    
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        {item.street}
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        {item.phone}
                    </div>
                    <div className={isClicked === item._id ? "clickedd" : ""} style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }} 
                        onClick={() => handleClick(item._id, "status", "hi")}
                    >
                        <div style={{
                            padding: "5px 10px", 
                            borderRadius: 5, 
                            backgroundColor: item.active ? COLORS.primary : COLORS.green, 
                            cursor: "pointer", 
                            color: item.active ?  "#fff" : "#000", 
                            fontWeight: 600
                        }}>{item.active ? "Bloquer le compte" : "Débloquer le compte"}</div>
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                       
                    }}>
                        <div>
                            <FaUserEdit  className={isClicked === item.phone ? "clickedd" : ""}  onClick={() => onModify(item)} style={{
                                cursor: "pointer"
                            }} />
                        </div>
                    </div>

    </div>
  )
}
