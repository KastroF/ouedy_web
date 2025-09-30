import React from 'react'

export default function ErrorMessage({errorMessage, width}) {
  return (
    <div className='acafad' style={{
        padding: "15px 20px", 
      
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: "red", 
        width: width ? "100%" : "80%", 
        boxSizing: "border-box", 
        textAlign: "center"
    }}>
        {errorMessage}
    </div>
  )
}
