import React, { useContext, useEffect } from 'react'
import '../styles/ProductCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../redux/productSlice'
import { Link } from 'react-router-dom';
import { SearchContext } from '../components/SearchContext'



export default function ProductCard() {

  const dispatch=useDispatch();
  const fetchProductData = useSelector((state) => state.product.listProduct)

  useEffect(()=>{
    dispatch(fetchProduct())
  }, [dispatch])


  const listProduct = fetchProductData.length > 0 ? fetchProductData[0].listProduct : [];
  const { search, dropdownValue } = useContext(SearchContext)
 
 //dropdown menu and search:
  const filteredProducts = listProduct.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(search.toLowerCase())
    const descriptionMatch= item.description.toLowerCase().includes(search.toLowerCase())
    const typeMatch = dropdownValue === '' || item.type.toLowerCase() === dropdownValue.toLowerCase();
    const isMatch = (titleMatch || descriptionMatch) && typeMatch;
    return isMatch
  });

  return (
      <> {
      

      filteredProducts.map((item)=>(
        <div className='container-productcard' key={item.productId}>
          <Link to={`/product/${item.productId}`}>
            <img src={item.picture} alt="" width="200" height="200" />
          </Link>
          <h1 className='title-productcard'>{item.title}</h1>
          <span className='price-productcard'>{item.price[0]}</span>
          <p className='desc-productcard'>{item.description}</p>
        </div>
      ))
      }

    </>
  )
}
