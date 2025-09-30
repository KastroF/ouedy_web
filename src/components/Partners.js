import React, {useState, useEffect, useContext} from 'react'
import { IoChevronBackCircle } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { COLORS } from '../constants/theme';
import { useFetchFunctions } from '../infrasctructures/Functions';
import { AuthContext } from '../navigation/AuthProvider';
import PartnerItem from './PartnerItem';



export default function Partners({status, partners,  userStatus, onChange, value, onStatus, nb, openModal, goBack}) {

    const [isClicked, setIsClicked] = useState("");
  
    useEffect(() => {


            console.log(partners);

    }, [partners])

    const onVoit = (text) => {

        setIsClicked(text); 

        setTimeout(() => {
            setIsClicked("");
        }, 200);

        if(text === "back"){

            goBack();
        }

        if(text === "plus"){

                

                openModal(status, "plus");
        }
    
    }

const onModify = (item) => {

 
    openModal(status, "edit", item._id)

}

  return (
    <div style={{
        padding: 20, 
        height: "100%", 
        boxSizing: "border-box"
    }}>

            <IoChevronBackCircle  className={isClicked === "back" ? "clickedd" : ""} size={50} style={{cursor: "pointer"}} onClick={() => onVoit("back")} color="rgb(41, 89, 152)" />

       <div style={{
            width: "100%", 
            height: "100%", 
            

       }}>
            <div className='acafad' style={{
                padding: "10px 0px", 
                fontSize: 20, 
                fontWeight: "bolder"
            }}>
                Liste des {status === "pos" ? "points de vente" : "recouvreurs"}
            </div>
            <div style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                width: "100%"
            }}>
                <div className='acafad' style={{
                    marginTop: 10, 
                    width: 500, 
                    height: 45, 
                    border: "1px solid #aaa", 
                    borderRadius: 7, 
                    display: "flex", 
                    alignItems: "center", 
                    padding: "0 10px"
                }} >
                    <IoSearchOutline />
                    <div style={{
                        flex: 1, 
                        boxSizing: "border-box"
                    }}>
                        <input 
                            placeholder='Tapez le nom ou le numéro du partenaire ...'
                            style={{
                                marginLeft: 10, 
                                width: "100%", 
                                height: "100%", 
                                border: "none", 
                                outline: "none", 
                                boxSizing: "border-box"
                            }}
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div  className={isClicked === "plus" ? "clickedd" : ""} onClick={() => onVoit("plus")} style={{
                    height: 50, 
                    width: 50, 
                    backgroundColor: COLORS.green, 
                    borderRadius: 25, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: "#fff", 
                    cursor: "pointer"
                }}>
                    <FaPlus />
                </div>
            </div>

            <div className='acafad' style={{
                 marginTop: 20, 

            }}>
                <div className='head' style={{
                   
                    height: 50, 
                    border: "1px solid #ddd", 
                  
                    fontWeight: 700,
                    backgroundColor: "rgb(250, 251, 252)", 
                    display: "flex", 
                    alignItems: "center"
                }}>
                    <div style={{
                        width: "25%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        Nom complet
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        Quartier
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        Phone
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                        borderRight: "1px solid #ddd"
                    }}>
                        Statut
                    </div>
                    <div style={{
                        width: "15%", 
                        height: "100%", 
                       
                    }}>
                        Edit
                    </div>
                </div>
            </div>

            {
                partners.map(item => {

                        return(
                            <PartnerItem key={item._id} onStatus={onStatus} item={item} openModal={openModal} onModify={() => onModify(item)}  />
                        )
                })
            }

        </div>     

    </div>
  )
}
