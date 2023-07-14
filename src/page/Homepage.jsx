import React from 'react'
import ProductCard from './ProductCard'
import '../styles/Homepage.scss'
import Featured from '../components/Featured'


 function Homepage() {
  return (
 <>
 <Featured></Featured>
          <div className='container-homepage'>
              <h1 className='title-homepage'>THE BEST CAKE IN HEART</h1>
              <p className='desc-homepage'>
                  Coming to H bakery, you will not only find delicious sweet cakes, but also a place that stores your own sweet memories.
                  Let H bakery awaken your taste buds and your mind.
              </p>
              <div className='wrapper-homepage'>
                  <ProductCard></ProductCard>
              </div>
          </div>

 </>
  )
}
export default Homepage
