import React, { useEffect, useState } from 'react'
import '../styles/Cart.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, saveCart, deleteCart, editCart, updateCart } from '../redux/buyerSlice'


export default function Cart() {
  const cartItems = useSelector((state) => state.buyerLogin.cart)
  const dispatch = useDispatch()
const subtotal = cartItems.reduce((total, item)=>total+item.price*item.quantity, 0)
 const [newQuantity, setNewQuantity]=useState(0)

/*   const handleEdit = (productId) => {
    dispatch(editCart({ productId, isEditing: true }))
  };
  const handleUpdate = (productId) => {
    dispatch(updateCart({ productId, quantity: newQuantity, isEditing: false}));
  }; */

  


  return (
    <>
      <div className='container-cart'>
        <div className='left-cart'>
          <table className='table-cart'>
            <thead>
              <tr className='trTitle-cart'>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                
                <tr className='tr-cart' key={cartItem.productId}>
                  <td>
                    <div className='imgContainer-cart'>
                      <img
                        src={cartItem.picture}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <span className='name-cart'>{cartItem.title}</span>
                  </td>
                  <td>
                    <span className='extras-cart'>
                      {cartItem.ingredients}
                    </span>
                  </td>
                  <td>
                    <span className='price-cart'>{cartItem.price}</span>
                  </td>
                  {/* {cartItem.isEditing ?(
                    <td>
                      <input className='quantity-cart'
                        type="number"
                        value={newQuantity}
                        onChange={e => setNewQuantity(parseInt(e.target.value))}
                      />
                      <button className='quantity-cart' onClick={handleUpdate(cartItem.productId)}>
                        Save
                      </button>
                    </td>
                  ): ( */}
                      <td>
                    <span className = 'quantity-cart'>{cartItem.quantity}</span>
                  </td>
                {/*   )} */}
                  
                  <td>
                    <span className='total-cart'>{(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                  </td>
                  <td>
                    {/* {!cartItem.isEditing && 
                      (<><button onClick={() => handleEdit(cartItem.productId)}>Edit</button></>
                      )} */}
                 <button onClick={() => dispatch(deleteCart(cartItem))}>Delete</button>
                    
                    
                  </td>
                </tr>
              ))

              }
            </tbody>
            </table>
        </div>
        <div className='right-cart'>
          <div className='wrapper-cart'>
            <h2 className='title-cart'>CART TOTAL</h2>
            <div className='totalText-cart'>
              <b className='totalTextTitle-cart'>Subtotal:</b>${subtotal.toFixed(2)}
            </div>
            <div className='totalText-cart'>
              <b className='totalTextTitle-cart'>Discount:</b>$0.00
            </div>
            <div className='totalText-cart'>
              <b className='totalTextTitle-cart'>Total:</b>${subtotal.toFixed(2)}
            </div>
            <Link to={'/product/cart/checkout'}>
              <button className='button-cart'>CHECKOUT NOW!</button>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  )
}
