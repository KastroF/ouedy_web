import React from 'react'

export default function Button({text, onClick, full, width}) {
  return (
    <div className={`button ${full ? "full-width" : ""}` }  style={{width: width ? "80%" : "100%"}}   onClick={onClick}>
        {text}
    </div>
  )
}
