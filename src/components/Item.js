import React from 'react'
import { FaCheckDouble } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { COLORS } from '../constants/theme';

export default function Item({item, background, type, status, cursor, recId, onClick}) {


  return (
    <div onClick={onClick} className='acafad' style={{
        marginTop: 15, 
        marginBottom: 15, 
        backgroundColor: background, 
        borderRadius: 8, 
        width: "100%", 
        padding: 15, 
        cursor: cursor ? "pointer" : "auto"

    }}>

        <div style={{fontWeight: 800}}>
            {(item.user_info && item.user_info.name) ? item.user_info.name : "Inconnu" } - {item.order.phone}
        </div>

        <div style={{marginTop: 3}}>
            Quartier : {item.user_info && item.user_info.street}
        </div>

        <div style={{marginTop: 3}}>
            Montant : <strong>{item.order.amount && item.order.amount.toLocaleString("FR-fr")} Fcfa</strong> 
        </div>

        <div style={{marginTop: 3}}>
            Reste : <strong>{item.order.rest ?  item.order.rest.toLocaleString("FR-fr") : "0"} Fcfa</strong> 
        </div>

        <div style={{marginTop: 3}}>
            {`${new Date(item.order.date).getDate()}/${new Date(item.order.date).getMonth() + 1}/${new Date(item.order.date).getFullYear()} à ${new Date(item.order.date).getHours()}h - ${new Date(item.order.date).getMinutes()}mn `}
        </div>

        <div style={{marginTop: 3}}>
            Statut : <strong> {status}  </strong> 
        </div>

        <div style={{marginTop: 3}}>
            Transation : <strong> {type}  </strong> 
        </div>

        <hr />

        {
            item.order.recoveries.map((item2, index) => {

                    return(
                        <div style={{
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between", 
                            gap: 10
                        }}>
                        <div >
                            {index + 1}. Recouvrement de {item2.amount && item2.amount.toLocaleString("FR-fr")} Fcfa <strong>{item2.return ? "En retour e-cash" : ""}</strong> le 
                            {` ${new Date(item2.date).getDate()}/${new Date(item2.date).getMonth() + 1}/${new Date(item2.date).getFullYear()} à ${new Date(item2.date).getHours()}h - ${new Date(item2.date).getMinutes()}mn `}
                        </div>

                        {
                            item2.author_id === recId && <div>
                                    <FaThumbsUp color= {COLORS.gray3} />
                                </div>
                        }
                        
                         </div>
                    )
            })
        }

        {
            item.order.message && <div>
                    {
                        item.order.message
                    }
                </div>
        }

        {
            item.order.read && <div style={{
                width: "100%", 
                textAlign: "right"
            }}>
                <FaCheckDouble />
            </div>
        }

    </div>
  )
}
