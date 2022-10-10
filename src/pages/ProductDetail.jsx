import React from 'react'
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {
  const { state } = useLocation()
  console.log(state)
  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-14">
      <figure>
        <img src={state.avatar} alt="Shoes" />
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

        <div className="card-actions justify-end">
          <div className="badge badge-accent">{state.category}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
