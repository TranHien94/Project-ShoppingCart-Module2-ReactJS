import React from 'react'
import '../styles/Footer.scss'
import img from '../img/bg.jpg'

export default function Footer() {
  return (
    <>
          
          <div className='container2'>
              <div className='itemfooter'>
                   <img src={img} objectFit="cover" layout="fill" alt="" /> 
              </div>
              <div className='itemfooter'>
                  <div className='cardfooter'>
                      <h2 className='mottofooter'>
                          HERE,  YOU CAN FIND YOUR MEMORY AND SWEET CAKES
                      </h2>
                  </div>
                  <div className='cardfooter'>
                      <h1 className='titlefooter'>FIND OUR RESTAURANTS</h1>
                      <p className='textfooter'>
                          Chu Van An, Bao Loc
                          <br /> Lam Dong, Viet Nam
                          <br /> 08-999-58568
                      </p>
                      <p className='textfooter'>
                          TL22, Thanh Loc, District 12
                          <br /> Ho Chi Minh, Viet Nam
                          <br /> 08-999-58568
                      </p>
                    
                  </div>
                  <div className='cardfooter'>
                      <h1 className='titlefooter'>WORKING HOURS</h1>
                      <p className='textfooter'>
                          MONDAY UNTIL FRIDAY
                          <br /> 9:00 – 22:00
                      </p>
                      <p className='textfooter'>
                          SATURDAY - SUNDAY
                          <br /> 12:00 – 24:00
                      </p>
                  </div>
              </div>
          </div>
          
    
    </>
  )
}
