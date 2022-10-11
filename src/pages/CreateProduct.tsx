import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { fetchCategory } from '../features/categorySlice/categorySlice'
import { postProduct } from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'

const CreateProduct = () => {
  const [postObj, setPostObj] = useState({
    name: '',
    avatar: '',
    description: '',
    price: 0,
    category: 'Electronics',
    developerEmail: 'gunduzgece546@gmail.com',
  })
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.category)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const handleSubmit = (event:any) => {
    event.preventDefault()
    dispatch(postProduct(postObj))
    setPostObj({
      name: '',
      avatar: '',
      description: '',
      price: 0,
      category: 'Electronics',
      developerEmail: 'gunduzgece546@gmail.com',
    })
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add a new product
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="post"
                onSubmit={e => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required
                    value={postObj.name}
                    onChange={e =>
                      setPostObj({ ...postObj, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={postObj.price}
                    onChange={e =>
                      setPostObj({ ...postObj, price: +e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={postObj.category}
                    onChange={e =>
                      setPostObj({ ...postObj, category: e.target.value })
                    }
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Hobby">Hobby</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Desciption
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={postObj.description}
                    onChange={e =>
                      setPostObj({ ...postObj, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    id="avatar"
                    placeholder="avatar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={postObj.avatar}
                    onChange={e =>
                      setPostObj({ ...postObj, avatar: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateProduct
