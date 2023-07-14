import React, { useEffect, useState } from 'react'
import '../styles/Product.scss'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sizeimg from '../img/size.png'
import { useDispatch } from 'react-redux';
import { addToCart, saveCart } from '../redux/buyerSlice'
import { toast } from 'react-toastify';

export default function Product() {
    const { productId } = useParams();
    const dispatch = useDispatch()
    const [size, setSize] = useState(0);
    const [nameSize, setNameSize]=useState('')
    const [ingredients, setIngredients] = useState([]);
    const [quantity, setQuantity]=useState(1)


    const buyerLogin = useSelector((state) => state.buyerLogin)
    console.log(222, buyerLogin);
    const fetchProductData = useSelector((state) => state.product.listProduct);


    const selectedProduct = fetchProductData[0].listProduct.find((item) =>
        item.productId === Number(productId));
    
        const handleSizeClick = (size) => {
            setSize(size)
        if (size === 0) {
            setNameSize('Small');
        } else if (size === 1) {
            setNameSize('Medium');
        } else if (size === 2) {
            setNameSize('Large');
        }
    }; 
    if (!selectedProduct) {
        return <p>Product not found</p>
    }

   
    const handleIngredientChange = (event) => {
        const ingredientName = event.target.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            setIngredients((prevIngredients) => [...prevIngredients, ingredientName]);
        } else {
            setIngredients((prevIngredients) =>
                prevIngredients.filter((ingredient) => ingredient !== ingredientName)
            );
        }
    };
  
    const handleAdToCart = () => {
           
        const cartItem = {
            productId: selectedProduct.productId,
            quantity: quantity,
            picture: selectedProduct.picture,
            title: selectedProduct.title,
            price: selectedProduct.price[size],
            description: selectedProduct.description,
            size: nameSize,
            ingredients: ingredients,
     
    }
        dispatch(addToCart(cartItem));
        toast.success('Product added to cart');
      
        
}

   

    return (
        <>
            <div className='container-product'>
                <div className='left-product'>
                    <div className='imgContainer-product'>
                        <img src={selectedProduct.picture} objectFit="contain" layout="fill" alt="" />
                    </div>
                </div>
                <div className='right-product'>
                    <h1 className='title-product'>{selectedProduct.title}</h1>
                    <span className='price-product'>${selectedProduct.price[size]}</span>
                    <p className='desc-product'>{selectedProduct.description}</p>
                    <h3 className='choose-product'>Choose the size</h3>
                    <div className='sizes-product'>
                        <div className='size-product'
                            onClick={() => handleSizeClick(0)}>
                            <img src={sizeimg} layout="fill" alt="" />
                            <span className='number-product'>Small</span>

                        </div>
                        <div className='size-product' onClick={() => handleSizeClick(1)}>
                            <img src={sizeimg} layout="fill" alt="" />
                            <span className='number-product'>Medium</span>
                        </div>
                        <div className='size-product' onClick={() => handleSizeClick(2)}>
                            <img src={sizeimg} layout="fill" alt="" />
                            <span className='number-product'>Large</span>
                        </div>
                    </div>
                    <h3 className='choose-product'>Choose additional ingredients</h3>
                    <div className='ingredients-product'>
                        <div className='option-product'>
                            <input
                                type="checkbox"
                                id="double"
                                name="Double Sweet"
                                className='checkbox-product'
                                onChange={handleIngredientChange}
                            />
                            <label htmlFor="double">Double Sweet</label>
                        </div>
                        <div className='option-product'>
                            <input
                                className='checkbox-product'
                                type="checkbox"
                                id="medium"
                                name="Medium Sweet"
                                onChange={handleIngredientChange}
                            />
                            <label htmlFor="cheese">Medium Sweet</label>
                        </div>
                        <div className='option-product'>
                            <input
                                className='checkbox-product'
                                type="checkbox"
                                id="less"
                                name="Less Sweet"
                                onChange={handleIngredientChange}
                            />
                            <label htmlFor="spicy">Less Sweet</label>
                        </div>
                        <div className='option-product'>
                            <input
                                className='checkbox-product'
                                type="checkbox"
                                id="nosugar"
                                name="No sugar"
                                onChange={handleIngredientChange}
                            />
                            <label htmlFor="garlic">No sugar</label>
                        </div>
                    </div>
                    <div className='add-product'>
                        <input type="number" defaultValue={1} min={0} className='quantity-product' 
                        value={quantity} 
                        onChange={(e)=>setQuantity(e.target.value)} /> 
                        {buyerLogin.isAuthenticated && (
                            (size !== null && ingredients.length !== 0) ? (
                                <Link to={`/product/cart`}>
                                    <button className="button-product" onClick={handleAdToCart}>
                                        Add to Cart
                                    </button>
                                </Link>
                            ) : (
                                <button className="button-product" onClick={() => toast.error('Please choose size and ingredients')}>
                                    Add to Cart
                                </button>
                            )
                        )}

                        {!buyerLogin.isAuthenticated && (
                            <div className="add-product">
                                <button
                                    className="button-product"
                                    onClick={() => toast.error('Please login to purchase')}>
                                    Add to Cart
                                </button>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </>
    )
}
