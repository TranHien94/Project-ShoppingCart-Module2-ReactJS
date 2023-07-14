import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LazyLoad from './LazyLoad'
import Header from './components/Header'

import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from './components/SearchContext'






export default function App() {
  return (
    <><Provider>
      <Header></Header>

      <Routes>
        <Route path='' element={LazyLoad(() => import('./page/Homepage'))()} />
        <Route path='/product/:productId' element={LazyLoad(() => import('./page/Product'))()} />
        <Route path='/product/cart' element={LazyLoad(() => import('./page/Cart'))()} />
        <Route path='/product/cart/checkout' element={LazyLoad(() => import('./page/Checkout'))()} />
        <Route path='/buyerRegister' element={LazyLoad(() => import('./page/BuyerRegister'))()} />
        <Route path='/buyerlogin' element={LazyLoad(() => import('./page/Buyerlogin'))()} />
        <Route path='/admin' element={LazyLoad(() => import('./page/Admin'))()} />
        <Route path='/admin/manager' element={LazyLoad(() => import('./page/AdminManager'))()} />

      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </Provider>
      
    
      


    </>
  )
}
