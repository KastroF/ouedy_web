import React from 'react'
import Lottie from "lottie-react";
import looading from "../assets/lotties/data.json";

export default function Loading({width}) {
  return (
    <div style={{ width: width ? "100%" : "80%", justifyContent: "center", display: "flex",  height: 100 }}>
       
       <Lottie  animationData={looading}  />
     
    </div>
  )
}
