import React, {useState, useEffect, useRef, useContext} from 'react'
import { IoChevronBackSharp } from "react-icons/io5";
import gsap from 'gsap';
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import FormInput from './FormInput';
import { MdOutlineAttachMoney } from "react-icons/md";
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { AuthContext } from '../navigation/AuthProvider';
import { useFetchFunctions } from '../infrasctructures/Functions';
import { IoHomeOutline } from "react-icons/io5";
import { TiPhoneOutline } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Select from 'react-select'
import { amounts, times } from '../constants/theme';


//const ADD_ORDER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/order/addorder"; 
const ADD_ORDER_URL = "https://emoney.onrender.com/api/order/addorder"; 


//const ADD_PARTNER_URL = "hhttps://emoney1-206c4d0f8346.herokuapp.com/api/partner/addPartner"
const ADD_PARTNER_URL = "https://emoney.onrender.com/api/partner/addPartner"

//const UPDATE_PARTNER_URL = "https://emoney1-206c4d0f8346.herokuapp.com/api/partner/updatepartner"; 
const UPDATE_PARTNER_URL = "https://emoney.onrender.com/api/partner/updatepartner"

//const UPDATE_PARTNER_URL = "https://emoney2.glitch.me/api/partner/updatepartner"
//const ADD_PARTNER_URL = "https://emoney2.glitch.me/api/partner/addPartner"; 
//const GET_ORDER_URL = "https://emoney2.glitch.me/api/order/getorders"



//https://emoney.onrender.com/

export default function Modal({item, visible, dismiss,  status, recs, position, onClick, load}) {

    const [isClicked, setIsClicked] = useState(""); 
    const [service, setService] = useState("");
    const divRef = useRef(null);
    const {token, user} = useContext(AuthContext);
    const [amount, setAmount] = useState("");
    const [amount3, setAmount3] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); 
    const {postFunction} = useFetchFunctions(); 
    const [name, setName] = useState("");
    const [street, setStreet] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState("");
    const [amPhone, setAmPhone] = useState("");
    const [mmPhone, setMmPhone] = useState("");
    const [flashPhone, setFlashPhone] = useState("");
    const [expressPhone, setExpressPhone] = useState("");
    const [recId, setRecId] = useState("");
    const [amount2, setAmount2] = useState(null); 
    const [time, setTime] = useState(24);
    const [loadingg, setLoadingg] = useState(false);






    useEffect(() => {

        setLoading(false);

    },[load])

    useEffect(() => {



            if(status === "edit"){

                setName(item.name); 
                setStreet(item.street);
                
                if(item.amPhone){
    
                    setAmPhone(item.amPhone)
                }
    
                if(item.mmPhone){
    
                    setMmPhone(item.mmPhone)
                }
                if(item.flashPhone){
    
                    setFlashPhone(item.flashPhone)
                }
    
                if(item.expressPhone){
    
                    setExpressPhone(item.expressPhone)
                }

                if(item.phone){

                        setPhone(item.phone);
                }

                if(item.rec_id){

                    setRecId(item.rec_id);
                }

                if(item.time){

                    setTime(item.time);
                }

                if(item.amount){

                    setAmount2(item.amount);
                }
    
                //alert(item.time)
              
            
            }
            
  



    }, [item])

    const onSend = () => {

        setLoading(true); 

       // alert(amount3);

        setErrorMessage("");

        if(status === "return"){

            if(amount3){

                const somme = item.rest && item.rest > 0 ?  item.rest  : item.amount; 

                if(parseInt(amount3) <= parseInt(somme)){

                    onClick(item, amount3);

                    setTimeout(() => {
                        
                        dismissModal();

                    }, 2000);

                }else{

                        setErrorMessage("Le montant est supérieur au retour E-cash"); 
                        setLoading(false);
                }

            }else{

                setErrorMessage("Veuillez remplir tous les champs");
                setLoading(false); 
            }

       


        }else{

        

        if(!position){


        if(service && amount ){

            let phone; 

            if(service === "am"){

                phone = item.amPhone;
            }

            if(service === "mm"){

                phone = item.mmPhone;
            }

            if(service === "flash"){

                phone = item.flashPhone;
            }

            if(service === "express"){

                phone = item.expressPhone;
            }


         

            postFunction(ADD_ORDER_URL, {type: service, amount, _id: item._id, phone, goodPhone: true}, token).then(() => {

                setLoading(false);
               // setModalVisible3(false);
                
               alert("Commande enregistrée avec succès");

               dismissModal()
            
                    }, (err) => {
            
                            console.log(err);
                            setLoading(false);
                    })


        }else{
            setLoading(false);
            setErrorMessage("Veuillez sélectionner le service, et renseigner le montant")
        }


        }else{

            const regex =  /^(07[746]\d{6}|06[2560]\d{6})$/

            if(position === "rec"){

                if(name && phone && password){

                    if(password.length === 4){

                        if(regex.test(phone)){

                            postFunction(ADD_PARTNER_URL, {name, street, phone, password, status: position}, token).then((data) => {

                                if(data){

                                    if(data.status === 0){

                                            alert(data.message); 
                                            setLoading(false);
                                            window.location.reload(false);
                                    }

                                }else{

                                    alert("Une erreur s'est produite"); 
                                    setLoading(false);
                                }
                            })

                        }else{

                            setLoading(false); 
                            setErrorMessage("Format du numéro de téléphone invalide");
                        }

                    }else{

                            setLoading(false); 
                            setErrorMessage("Format de mot de passe invalide"); 
                    }

                }else{

                    setErrorMessage("Veuillez remplir tous les champs"); 
                    setLoading(false);
                }
            }



            if(position === "pos"){



                    if(name && street && (amPhone || mmPhone || flashPhone || expressPhone) && recId && amount2 && time){

                        let lePhone; 
                        let lePassword;

                        if(amPhone){

                            lePhone = amPhone; 
                            lePassword = `${amPhone[5]}${amPhone[6]}${amPhone[7]}${amPhone[8]}`
                        
                        }else if(mmPhone){

                            lePhone = mmPhone; 
                            lePassword = `${mmPhone[5]}${mmPhone[6]}${mmPhone[7]}${mmPhone[8]}`
                        
                        }else if(flashPhone){

                            lePhone = flashPhone; 
                            lePassword = `${flashPhone[5]}${flashPhone[6]}${flashPhone[7]}${flashPhone[8]}`
                        
                        
                        }else if(expressPhone){

                            lePhone = expressPhone; 
                            lePassword = `${expressPhone[5]}${expressPhone[6]}${expressPhone[7]}${expressPhone[8]}`
                            
                        }


                        if((amPhone && !regex.test(amPhone)) || (mmPhone && !regex.test(mmPhone)) 
                        || (expressPhone && ! regex.test(expressPhone)) || (flashPhone && !regex.test(flashPhone))){

                            setErrorMessage("Vérifier le(s) numéro(s) de téléphone; Format invalide");
                            setLoading(false); 

                        }else{


                            postFunction(ADD_PARTNER_URL, {name, street, amPhone, mmPhone, 
                                expressPhone, flashPhone, status, phone: lePhone, password: lePassword, 
                            time, amount2, recId}, token).then((data) => {


                                if(data && data.status === 0){

                                    setLoading(false); 
                                 
                                    alert(data.message);
                                    window.location.reload(false);
                                    
                                   
                                }

                                if(data && data.status === 1){

                                        setErrorMessage(data.message); 
                                        setLoading(false); 
                                      //  scrollViewRef.current.scrollToEnd({ animated: true });
                                }




                            }, (err) => {

                                    console.log(err)
                            })


                        }


                    
                    }else{

                            setErrorMessage("Veuillez vérifier les champs obligatoires");
                            setLoading(false)
                    }
            }
                
        }
        
        }
    }

    useEffect(() => {

        setAmount3("");

        if(visible){

            gsap.to(divRef.current, {

                opacity: 1, 
               
                duration: 1, 
                ease: "power2.inOut",
                display: "flex", 
            }); 

            dismiss()

        }

    }, [visible])

    const dismissModal = () => {

            setService("");
            setAmount("");
            setName("");
            setAmPhone(""); 
            setMmPhone(""); 
            setStreet("");
            setFlashPhone(""); 
            setExpressPhone("");
            setErrorMessage("");

            gsap.to(divRef.current, {

                opacity: 0, 
               
                duration: 1, 
                ease: "power2.inOut",
                display: "none", 
            })
    }


    const handleClick = (text) => {

        setIsClicked(text); 

        if(text === "icon"){

                dismissModal();
        }

        setTimeout(() => {
            
            setIsClicked("");

        }, 200);
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

    const diss = () => {


    }


    const handleChange = (text, e) => {

            console.log(text +" " + e.value);

            if(text === "rec"){

                    setRecId(e.value)
            }

            if(text === "amount"){

                    setAmount2(e.value);
            }

            if(text === "time"){

                setTime(e.value);
            }
    }

    const onValid = () => {

        const partner = item;
        setErrorMessage("");

        setLoading(true)
        const body = {}; 


            if(partner && partner.name !== name){

                body.name = name; 

            }

            if(partner && partner.street !== street){

                body.street = street; 

            }

            if(partner && partner.amPhone !== amPhone){

                body.amPhone = amPhone; 
               

                if(partner.amPhone === partner.phone){

                        body.phone = amPhone;
                        body.password = `${amPhone[5]}${amPhone[6]}${amPhone[7]}${amPhone[8]}`
                }

            }

            if(partner && partner.flashPhone !== flashPhone){

                body.flashPhone = flashPhone; 

                if(partner.flashPhone === partner.phone){

                        body.phone = flashPhone;
                        body.password  = `${flashPhone[5]}${flashPhone[6]}${flashPhone[7]}${flashPhone[8]}`
                }

            }

            if(partner && partner.mmPhone !== mmPhone){

                body.mmPhone = mmPhone; 

                if(partner.mmPhone === partner.phone){

                        body.phone = mmPhone;
                        body.password  = `${mmPhone[5]}${mmPhone[6]}${mmPhone[7]}${mmPhone[8]}`
                }

            }

            if(partner && partner.expressPhone !== expressPhone){

                body.expressPhone = expressPhone; 

                if(partner === partner.phone){

                        body.phone = expressPhone;
                        body.password  = `${expressPhone[5]}${expressPhone[6]}${expressPhone[7]}${expressPhone[8]}`
                }

            }

            if(partner && partner.rec_id !== recId){

                    body.rec_id = recId; 
            }

            if(partner && partner.time !== time){

                body.time = time; 
            }

            if(partner && partner.amount !== amount2){

                body.amount = amount2; 
            }

            const regex =  /^(07[746]\d{6}|06[2560]\d{6})$/

            if(!name) {

                setErrorMessage("Le nom est obligatoire");
                setLoading(false);
            
            
            }else{

                if(amPhone && !regex.test(amPhone)){

                    setErrorMessage("Vérifier le(s) numéro(s) de téléphone; Format invalide");
                    setLoading(false);
                
                }else{

                    
                    if(mmPhone && !regex.test(mmPhone)){

                        setErrorMessage("Vérifier le(s) numéro(s) de téléphone; Format invalide");
                        setLoading(false);
                    
                    }else{
    
                        if(flashPhone && !regex.test(flashPhone)){

                            setErrorMessage("Vérifier le(s) numéro(s) de téléphone; Format invalide");
                            setLoading(false);
                        
                        }else{
        
                            if(expressPhone && !regex.test(expressPhone)){

                                setErrorMessage("Vérifier le(s) numéro(s) de téléphone; Format invalide");
                                setLoading(false);
                            
                            }else{
            
                                console.log(body)
                   

                                    body._id = item._id; 

                                    postFunction(UPDATE_PARTNER_URL, body, token).then((data) => {

                                        if(data && data.status === 0){

                                            alert("Modification effectuée avec succès"); 
                                          
                                            setLoading(false);
                                            window.location.reload(false);
                                            dismiss()
                                        }


                                            if(data && data.status === 1){

                                                setErrorMessage(data.message); 
                                                setLoading(false); 
                                              //  scrollViewRef.current.scrollToEnd({ animated: true });
                                        }








                                    }, (err) => {

                                            console.log(err)
                                    })

                                
                              

                            }
                                
                        }
                            
                    }
                    
                }

            }


    }


  return (
    <div ref={divRef} style={{
        position: "absolute", 
        top: 0, 
        left: 0, 
        zIndex: 100,
        width: "100%", 
        height: "100%", 
        boxSizing: "border-box", 
        backgroundColor: "rgba(0,0,0,0.4)", 
        padding: "30px 0", 
        display: "none",
        opacity: 0, 
        alignItems: "center", 
        justifyContent: "center"
    }}>
      <div style={{
            width: "40%", 
            height: "100%", 
            backgroundColor: "#fff", 
            overflowY: "auto", 
            borderRadius: 8,
            padding: 20, 
            paddingBottom: 50, 
            boxSizing: "border-box"
        }}>
            <div>
                <IoChevronBackSharp className={isClicked ? "clickedd" : ""} onClick={() => handleClick("icon")} size={30} style={{cursor: "pointer"}} /> 
            </div>

            <div className='acafad' style={{
                fontWeight: 700, 
                marginTop: 15, 
                width: "100%", 
                textAlign: "center", 
                fontSize: 25
            }}>
                {status === "send" ? "FAIRE UN ENVOI" : ""} 
                {status === "send" ? <div> À </div> : ""}
                {status === "send" ? <div> {item.name} </div> : ""}
                {status === "plus" ? ` AJOUTER UN ${position === "pos" ? "POINT DE VENTE" : "RECOUVREUR" }` : ""} 
                {status === "return" ? "REMISE DES ESPÈCES" : ""}
                {status === "edit" ? "MODIFIER UN PARTENAIRE" : ""}
            </div>
            <div className='acafad' style={{
                fontWeight: "normal", 
                marginTop: 15, 
                width: "100%", 
                textAlign: "center", 
                
            }}>
                {status === "send" ? "Choisissez le service avec lequel vous souhaitez faire le dépôt, saissez le montant et cliquez sur envoyer" : ""}
                {status === "plus" ? "Saisissez les différentes informations (lorsqu'elles sont disponibles) concernant le partenaire que vous voulez rajouter." : ""} 
                {status === "edit" ? "Modifiez les champs concernés et cliquer sur le bouton Envoyer pour enregistrer vos modifications" : ""}
                {status === "return" ? `Entrez ci-dessous le montant remis en espèce dans les ${item && item.rest && item.rest > 0 ? item.rest.toLocaleString("FR-fr") : item.amount &&  item.amount.toLocaleString("FR-fr") } Fcfa` : ""}

           </div>

            {
                item && item.amPhone && status === "send" ? <div onClick={() => setService("am") } style={{
                    display: "flex", 
                    alignItems: "center", 
                    marginTop: 20, 
                    fontWeight: 800,
                    borderBottom: "1px solid #ccc", 
                    padding: "10px 0", 
                    cursor: "pointer"
                }}>
                            {service === "am" ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} 
                            <div style={{marginLeft: 10}}>Airtel Money</div>
                    </div> : ""
            }
            {
                item && item.mmPhone && status === "send" ? <div onClick={() => setService("mm") } style={{
                    display: "flex", 
                    alignItems: "center", 
                    marginTop: 20, 
                    fontWeight: 800,
                    borderBottom: "1px solid #ccc", 
                    padding: "0px 0 20px 0", 
                    cursor: "pointer"
                }}>
                            {service === "mm" ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} 
                            <div style={{marginLeft: 10}}>Moov Money</div>
                    </div> : ""
            }
             {
                item && item.flashPhone && status === "send" ? <div onClick={() => setService("flash") } style={{
                    display: "flex", 
                    alignItems: "center", 
                    marginTop: 20, 
                    fontWeight: 800,
                    borderBottom: "1px solid #ccc", 
                    padding: "0px 0 20px 0", 
                    cursor: "pointer"
                }}>
                            {service === "flash" ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} 
                            <div style={{marginLeft: 10}}>Flash Airtel</div>
                    </div> : ""
            }
             {
                item && item.expressPhone && status === "send" ? <div onClick={() => setService("express") } style={{
                    display: "flex", 
                    alignItems: "center", 
                    marginTop: 20, 
                    fontWeight: 800,
                    borderBottom: "1px solid #ccc", 
                    padding: "0px 0 20px 0", 
                    cursor: "pointer"
                }}>
                            {service === "express" ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} 
                            <div style={{marginLeft: 10}}>Express Libertis</div>
                    </div> : ""
            }


           { status === "send" && <div style={{
                marginTop: 15
            }} >
                <FormInput onChange={(e) => setAmount(e.target.value)} label="Montant" placeholder="Montant Minimal : 10 000 Fcfa" Icon={MdOutlineAttachMoney} full={true} value={amount} />
            </div> }




            { status === "return" && <div style={{
                marginTop: 15
            }} >
                <FormInput onChange={(e) => setAmount3(e.target.value)} label="Montant" placeholder="Entrez le montant ici..." Icon={MdOutlineAttachMoney} full={true} value={amount3} />
            </div> }

            {
                status === "plus" && 

                <div className='acafad' style={{
                    marginTop: 15
                }}>
                    <div style={{
                        marginTop: 15
                    }}>
                        <FormInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez son nom ici" label={`Nom du ${position === "rec" ? "recouvreur" : "point de vente"} `} Icon={CiUser} full={true} />
                    </div>

                    <div style={{
                        marginTop: 15
                    }}>
                        <FormInput value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Entrez le nom de son quartier" label="Quartier" Icon={IoHomeOutline} full={true} />
                    </div>

                    {
                        position === "rec" && <div style={{marginTop: 30, marginBottom: 10, fontWeight: 700, color: "red", 
                        textDecorationLine: "underline"}}>
                                    Informations de connexion : 
                            </div>
                    }

                    {
                        position === "rec" && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={phone} onChange={(e) => setPhone(e.target.value)} label="Numéro de connexion" placeholder="Le numéro qui lui permettra de se connecter" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }
                    
                   

                    {
                        position === "rec" && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput label="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} password={true} placeholder="Mot de passe (4chiffres)" full={true} Icon={CiLock}/>
                            </div>
                    }

                    {
                        position === "pos" && user && user.amPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={amPhone} onChange={(e) => setAmPhone(e.target.value)} label="Numéro Airtel Money" placeholder="Ex: 077010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {   
                        position === "pos" && user && user.mmPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={mmPhone} onChange={(e) => setMmPhone(e.target.value)} label="Numéro Moov Money" placeholder="Ex: 066010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                        {
                        position === "pos" && user && user.flashPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={flashPhone} onChange={(e) => setFlashPhone(e.target.value)} label="Numéro Flash Airtel " placeholder="Ex: 077010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {
                        position === "pos" && user && user.expressPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={expressPhone} onChange={(e) => setExpressPhone(e.target.value)} label="Numéro Express Libertis " placeholder="Ex: 066010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Choisir un recouvreur
                            </div>

                             <Select options={recs} styles={customStyles} onChange={(e) => handleChange("rec", e)} isDisabled={recs.length === 0} defaultValue={recs[0]} menuPortalTarget={document.body} /> 

                        </div>
                    }


                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Fixer un montant maximum de commande
                            </div>

                             <Select options={amounts} onChange={(e) => handleChange("amount", e)} styles={customStyles} defaultValue={amounts[0]} menuPortalTarget={document.body} /> 

                        </div>
                    }

                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Fixer une heure maximale pour commander
                            </div>

                             <Select options={times} styles={customStyles} onChange={(e) => handleChange("time", e)} defaultValue={times[1]} menuPortalTarget={document.body} /> 

                        </div>
                    }
                    




                </div>
            }




            {
                status === "edit" && 

                <div className='acafad' style={{
                    marginTop: 15
                }}>
                    <div style={{
                        marginTop: 15
                    }}>
                        <FormInput value={name} focuss={true} onChange={(e) => setName(e.target.value)} placeholder="Entrez son nom ici" label={`Nom du ${position === "rec" ? "recouvreur" : "point de vente"} `} Icon={CiUser} full={true} />
                    </div>

                    <div style={{
                        marginTop: 15
                    }}>
                        <FormInput value={street} focuss={true} onChange={(e) => setStreet(e.target.value)} placeholder="Entrez le nom de son quartier" label="Quartier" Icon={IoHomeOutline} full={true} />
                    </div>

                    {
                        position === "rec" && <div style={{marginTop: 30, marginBottom: 10, fontWeight: 700, color: "red", 
                        textDecorationLine: "underline"}}>
                                    Informations de connexion : 
                            </div>
                    }

                    {
                        position === "rec" && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput value={phone} focuss={true} onChange={(e) => setPhone(e.target.value)} label="Numéro de connexion" placeholder="Le numéro qui lui permettra de se connecter" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }
                    
                   

                    {
                        position === "rec" && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput label="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} password={true} placeholder="Mot de passe (4chiffres)" full={true} Icon={CiLock}/>
                            </div>
                    }

                    {
                        position === "pos" && user && user.amPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput focuss={true} value={amPhone} onChange={(e) => setAmPhone(e.target.value)} label="Numéro Airtel Money" placeholder="Ex: 077010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {   
                        position === "pos" && user && user.mmPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput focuss={true} value={mmPhone} onChange={(e) => setMmPhone(e.target.value)} label="Numéro Moov Money" placeholder="Ex: 066010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                        {
                        position === "pos" && user && user.flashPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput focuss={true} value={flashPhone} onChange={(e) => setFlashPhone(e.target.value)} label="Numéro Flash Airtel " placeholder="Ex: 077010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {
                        position === "pos" && user && user.expressPhone && <div style={{
                                marginTop: 15, 

                        }}>
                            <FormInput focuss={true} value={expressPhone} onChange={(e) => setExpressPhone(e.target.value)} label="Numéro Express Libertis " placeholder="Ex: 066010101" full={true} Icon={TiPhoneOutline}/>
                            </div>
                    }

                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Choisir un recouvreur
                            </div>

                             <Select options={recs} styles={customStyles} onChange={(e) => handleChange("rec", e)} isDisabled={recs.length === 0} value={(status === "edit"  && !recId) ? recs.filter(itemm => itemm.value === item.rec_id )[0] : recs.filter(itemm => itemm.value === recId)[0]} defaultValue={status === "edit" ? recs.filter(itemm => itemm.value === item.rec_id )[0] : recs[0] } menuPortalTarget={document.body} /> 

                        </div>
                    }


                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Fixer un montant maximum de commande
                            </div>

                             <Select options={amounts} onChange={(e) => handleChange("amount", e)} styles={customStyles} defaultValue={status === "edit" ? amounts.filter(itemm => itemm.value === item.amount)[0] : amounts[0]} value={(status === "edit" && !amount2) ? amounts.filter(itemm => itemm.value === item.amount)[0] : amounts.filter(itemm => itemm.value === amount2)[0]} menuPortalTarget={document.body} /> 

                        </div>
                    }

                    {
                        position === "pos" && <div style={{
                                marginTop: 15
                        }}> <div style={{
                            marginBottom: 4, 
                            fontWeight: 500, 

                        }}>
                                Fixer une heure maximale pour commander
                            </div>

                             <Select options={times} styles={customStyles} onChange={(e) => handleChange("time", e)} defaultValue={status === "edit" ? times.filter(itemm => itemm.value === item.times)[0] : times[1]} value={(status === "edit" && !time) ? times.filter(itemm => itemm.value === item.time)[0] : times.filter(itemm => itemm.value === time )[0]} menuPortalTarget={document.body} /> 

                        </div>
                    }
                    




                </div>
            }



           
            <div style={{
                marginTop: 15
            }}> 
                  <Button onClick={() => { !loading ? status === "edit" ? onValid() : onSend() : diss()}} text="Envoyer" full={true} />
            </div>
          

            {errorMessage && <ErrorMessage width={true} errorMessage={errorMessage} />}
            {loading  && <Loading width={true}  />}
        </div>
    </div>
  )
}
