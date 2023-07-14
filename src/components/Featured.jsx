import React, { useState } from 'react'
import '../styles/Featured.scss'
import img1 from '../img/arrowl.png'
import img2 from '../img/arrowr.png'
import imgfeatured1 from '../img/featured1.png'
import imgfeatured2 from '../img/featured2.png'
import imgfeatured3 from '../img/featured3.png'

export default function Featured() {
    const [index, setIndex] = useState(0)
    const images = [
        imgfeatured1,
        imgfeatured2, 
        imgfeatured3,
        
    ];

    const handleShow = (control) => {
        if (control === "l") {
            setIndex(index !== 0 ? index - 1 : images.length-1)
        }
        if (control === "r") {
            setIndex(index !== images.length-1 ? index + 1 : 0)
        }
    }

  return (
    <>
          <div className='container-featured'>
              <div className='arrowContainer-featured' style={{ left: 0 }} 
              onClick={() => handleShow("l")}>
                  <img src={img1} alt="" width="70%" height="70%" objectFit="contain" />
              </div>
              <div className='wrapper-featured' style={{ transform: `translateX(${-100 * index}vw)` }}
                  >
                  {images.map((img, i) => (
                      <div className='imgContainer-featured' key={i}>
                          <img src={img} alt="" layout="fill" objectFit="contain" />
                      </div>
                  ))}
              </div>
              <div className='arrowContainer-featured' style={{ right: 0 }}
                  onClick={() => handleShow("r")} >
                  <img src={img2} width="70%" height="70%"  alt="" objectFit="contain" />
              </div>
          </div>
    </>
  )
}
