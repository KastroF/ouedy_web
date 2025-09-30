import React, { useEffect, useRef, useState } from 'react'

import gsap from 'gsap';


export default function FormInput({label, placeholder, isNumber, onChange, value, Icon, full,  password, focuss}) {
  
    const [isFocused, setIsFocused] = useState(false);
    const divRef = useRef();

    useEffect(() => {

            if(focuss){

                   // setIsFocused(true); 
                    gsap.to(divRef.current, {
                        top: -17, 
                        duration: 0.5, 
                        fontWeight: 600
                    })
            }
    })

      // Gérer le focus (onFocus)
  const handleFocus = () => {
    setIsFocused(true);
    
    // Met l'état à true lorsque l'input est focus

    if(!value){

        gsap.to(divRef.current, {
            top: -17, 
            duration: 0.5, 
            fontWeight: 600
        })

    }

  };

  // Gérer la perte du focus (onBlur)
  const handleBlur = () => {


    if(!value){

        gsap.to(divRef.current, {
            top: 7, 
            duration: 0.5, 
            fontWeight: 300
        })

    }


    setIsFocused(false); // Met l'état à false lorsque l'input perd le focus


 
};

    return (
    <div style={{marginTop: 20}} className='formBlock acafad'>
        <div style={{
            width: full ? "100%" : "80%", 
            height: 50, 
            border: "1px solid #bbb", 
            padding: "0 20px", 
            boxSizing: "border-box",
            borderRadius: 10, 
            position: "relative", 
            display: "flex", 
            alignItems: "center"

        }}>
            <div ref={divRef} style={{
                position: "absolute", 
                padding: "5px 5px", 
               
                backgroundColor: "#fff"
            }} >{label}</div>
            <input style={{
                zIndex: 10,
                border: "none", 
                flex: 1,
                outline: "none", 
                marginLeft: 5,
                width: "100%", 
                height: "100%", 
                backgroundColor: "transparent"
            }} placeholder={(!isFocused && value === "") ? '' : placeholder} 
            onFocus={handleFocus} // Capture l'événement focus
            onBlur={handleBlur} 
            value={value}
            onChange={onChange}
            type={password ? "password" : isNumber ? "number" : "text"}
            />

            <div>
                <Icon />
            </div>
        </div>
    </div>
  )
}
