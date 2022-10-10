import React from 'react'
import {
  addFavorite,
  removeFavorite,
} from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'

const Favorites = () => {
  const products = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()

  const handleFavorite = state => {
    if (products.favorites?.includes(state)) {
      dispatch(removeFavorite(state))
    } else {
      dispatch(addFavorite(state))
    }
  }
  return (
    <div className="container">

    <div className="flex flex-wrap gap-1">
      {products.favorites?.map((state, i) => (
        <div className="card xs:w-full w-96 bg-base-100 object-cover shadow-xl mx-auto my-14">
          <figure className="h-96 overflow-hidden ">
            <img src={state.avatar} className="object-cover" alt={state.name} />
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
                onClick={() => handleFavorite(state)}
                ></i>
              <div className="badge badge-accent">{state.category}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
  )
}

export default Favorites
