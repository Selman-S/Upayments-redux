import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteProduct, removeFavorite } from '../features/productSlice/productSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { Product } from '../types/types';



const ProductView = (product:Product) =>{
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.product)

  const handleFavorite = (product: Product) => {
    if (products.favorites?.includes(product)) {
      dispatch(removeFavorite(product))
    } else {
      dispatch(addFavorite(product))
    }
  }
  return (
    <div className='flex ' >
    <div className="w-80 sm:w-4/6 lg:w-4/6  hover-div flex cursor-pointer  my-4 mx-auto " onClick={() =>
    navigate('/details/' + product._id, { state: product, replace: false })
  }>

    <img className='w-32 h-40 object-cover ' src={product.avatar} alt={product.name} />
    <div className='mx-10'>
      <h1 className='overflow-hidden font-semibold text-xl'>{product.name.slice(0, 40)}</h1>

      <h3 className='overflow-hidden'>{product.category}</h3>

      <p className="bg-fuchsia-100 mt-10 text-fuchsia-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded font-semibold text-xl">{product.price}$</p>
    </div>
    </div>
    
<div className='display-inline'> <i
className={
'fa-solid fa-heart cursor-pointer mt-28 text-2xl ' +
(products.favorites?.includes(product) ? 'text-red-600' : '')
}
onClick={() => handleFavorite(product)}
></i>

<button className="bg-rose-500  hover:bg-rose-700 text-white font-medium py-1 px-2 rounded ml-5" onClick={() => dispatch(deleteProduct(product))} >
Delete
</button>
</div>
   
  </div>
  )
}

export default ProductView
