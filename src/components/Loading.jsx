import React from 'react'
import '../styles/Loading.scss'
import Img from '../img/logo.png'



export default function Loading() {
  return (
   <>
          <div className="loading_container">
              <img className="rotating-image" src={Img} />
          </div>
   </>
  )
}
