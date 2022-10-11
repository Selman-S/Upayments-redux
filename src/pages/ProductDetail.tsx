import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addFavorite,
  removeFavorite,
} from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'

const ProductDetail = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.product)
  const { state } = useLocation()
  const navigate = useNavigate();




  const handleFavorite = () => {
    if (products.favorites?.includes(state)) {
      dispatch(removeFavorite(state))
    } else {
      dispatch(addFavorite(state))
    }
  }

  return (<div className="flex flex-col align-center justify-center">
<i className="fa-solid fa-arrow-left text-3xl mt-10 ml-16 cursor-pointer" onClick={() => navigate('/')}></i>

    <div className="card sm:w-96 w-80 xs:w-full bg-base-100 shadow-xl mx-auto my-5">
      <figure>
        <img src={state.avatar} alt="Shoes" className=" object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {state.name}
          <div className="badge badge-secondary">{state.price}$</div>
        </h2>
        <div className="flex">
          <span className="text-xs font-light text-gray-400 mr-4">
            {state.createdAt.slice(0, 10)}
          </span>
          <span className="text-xs font-light text-gray-400">
            {state.createdAt.slice(11, 16)}
          </span>
        </div>
        <p>{state.description}</p>

        <div className="card-actions justify-between mt-5 ">
          <i
            className={
              'fa-solid fa-heart cursor-pointer  text-2xl ' +
              (products.favorites?.includes(state) ? 'text-red-600' : '')
            }
            onClick={() => handleFavorite()}
            ></i>
          <div className="badge badge-accent">{state.category}</div>
        </div>
      </div>
    </div>
            </div>
  )
}

export default ProductDetail
