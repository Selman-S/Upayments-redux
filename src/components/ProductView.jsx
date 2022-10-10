import React from 'react'

const ProductView = () => {
  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
          Shopping cart
        </h2>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close panel</span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">Throwback Hip Bag</a>
                    </h3>
                    <p className="ml-4">$90.00</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Salmon</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty 1</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default ProductView
