import React from 'react'
import '../styles/Checkout.scss'
import imgpaid from '../img/paid.png'
import imgchecked from '../img/checked.png'
import imgbake from '../img/bake.png'
import imgbike from '../img/bike.png'
import imgdelivery from '../img/delivered.png'
import { useDispatch, useSelector } from 'react-redux'


export default function Checkout() {

    const status = 0;

    const statusClass = (index) => {
        if (index - status < 1) return 'done-checkout';
        if (index - status === 1) return 'inProgress-checkout';
        if (index - status > 1) return 'undone-checkout';
    };

    const cartItem = useSelector((state) => state.buyerLogin.cart)
    const info = useSelector((state) => state.buyerLogin.buyerInfo)

    const subtotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
          <div className='container-checkout'>
              <div className='left-checkout'>
                  <div className='row-checkout'>
                      <table className='table-checkout'>
                        <thead>
                              <tr className='trTitle-checkout'>
                                  <th>Order ID</th>
                                  <th>Customer</th>
                                  <th>Email</th>
                                  <th>Total</th>
                              </tr>
                        </thead>
                          <tbody>
                                <tr className='tr-checkout' >
                                    <td>
                                        <span className='id-checkout'>{Date.now()}</span>
                                    </td>
                                    <td>
                                      <span className='name-checkout'>{info.name}</span>
                                    </td>
                                    <td>
                                      <span className='address-checkout'>{info.email}</span>
                                    </td>
                                    <td>
                                      <span className='total-checkout'>{subtotal.toFixed(2)}</span>
                                    </td>
                                </tr>
                            
                              
                          </tbody>
                          
                      </table>
                  </div>
                  <div className='row-checkout'>
                      <div className={statusClass(0)}>
                          <img src={imgpaid} width={30} height={30} alt="" />
                          <span>Payment</span>
                          <div className='checkedIcon-checkout'>
                              <img
                                  className='checkedIcon-checkout'
                                  src={imgchecked}
                                  width={20}
                                  height={20}
                                  alt=""
                              />
                          </div>
                      </div>
                      <div className={statusClass(1)}>
                          <img src={imgbake} width={30} height={30} alt="" />
                          <span>Preparing</span>
                          <div className='checkedIcon-checkout'>
                              <img
                                  className='checkedIcon-checkout'
                                  src={imgchecked}
                                  width={20}
                                  height={20}
                                  alt=""
                              />
                          </div>
                      </div>
                      <div className={statusClass(2)}>
                          <img src={imgbike} width={30} height={30} alt="" />
                          <span>On the way</span>
                          <div className='checkedIcon-checkout'>
                              <img
                                  className='checkedIcon-checkout'
                                  src={imgchecked}
                                  width={20}
                                  height={20}
                                  alt=""
                              />
                          </div>
                      </div>
                      <div className={statusClass(3)}>
                          <img src={imgdelivery} width={30} height={30} alt="" />
                          <span>Delivered</span>
                          <div className='checkedIcon-checkout'>
                              <img
                                  className='checkedIcon-checkout'
                                  src={imgchecked}
                                  width={20}
                                  height={20}
                                  alt=""
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div className='right-checkout'>
                  <div className='wrapper-checkout'>
                      <h2 className='title-checkout'>CART TOTAL</h2>
                      <div className='totalText-checkout'>
                          <b className='totalTextTitle-checkout'>Subtotal:</b>${subtotal.toFixed(2)}
                      </div>
                      <div className='totalText-checkout'>
                          <b className='totalTextTitle-checkout'>Discount:</b>$0.00
                      </div>
                      <div className='totalText-checkout'>
                          <b className='totalTextTitle-checkout'>Total:</b>${subtotal.toFixed(2)}
                      </div>
                      <button disabled className='button-checkout'>
                          PAID
                      </button>
                  </div>
              </div>
          </div>
    </>
  )
}

