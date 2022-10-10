import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { fetchCategory } from '../features/categorySlice/categorySlice'
import { fetchProduct, filteredCategory } from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { Category } from '../types/types'


const Home = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.category)
  const products = useAppSelector(state => state.product)
  const [allProducts, setAllProducts] = useState<boolean>(true)
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())

  }, [])

  const handleClick = (category: Category) => {
    dispatch(filteredCategory(category.name))
    setAllProducts(false)
  }

  const handleAllCategories = () => {
    setAllProducts(true)
  }
  return (
    <div className="mx-auto">
      <div className="container m-auto my-10 mx-auto">
        <div className="overflow-x-auto mx-auto ">

          {categories.loading ? <Loading /> : (<table className="table border   w-1/2 mx-auto"> <thead>
            <tr>
              <th className='bg-indigo-700 text-white '></th>
              <th className='bg-indigo-700 text-white'>Categories</th>

            </tr>
          </thead>
            <tbody>
              {categories.data?.categories.map((category, index) => (
                <tr className="cursor-pointer hover" key={index} onClick={() => handleClick(category)}>
                  <th>{index + 1}</th>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>)}
        </div>
        <div className="my-10">
          {products.data && (<div>
            <div className='text-center my-5'>
              <button onClick={() => handleAllCategories()} className='btn btn-primary text-white'>All Category</button>
            </div>

            <div>

              {allProducts ? products.data.map((product, index) => (
                <div className="max-w-2xl hover-div flex cursor-pointer mx-auto my-4" key={index} onClick={() =>
                  navigate('/details/' + product._id, { state: product, replace: false })
                }>
                  <img className='w-32 h-40 object-cover ' src={product.avatar} alt={product.name} />
                  <div className='mx-10'>
                    <h1 className='overflow-hidden font-semibold text-xl'>{product.name.slice(0, 40)}</h1>

                    <h3 className='overflow-hidden'>{product.category}</h3>

                    <p className="bg-fuchsia-100 mt-10 text-fuchsia-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded font-semibold text-xl">{product.price}$</p>
                  </div>
                </div>
              )) : products.filteredData?.map((product, index) => (
                <div className="max-w-2xl hover-div flex cursor-pointer mx-auto my-4" key={index} onClick={() =>
                  navigate('/details/' + product._id, { state: product, replace: false })
                }>
                  <img className='w-32 h-40 object-cover ' src={product.avatar} alt={product.name} />
                  <div className='mx-10'>
                    <h1 className='overflow-hidden font-semibold text-xl'>{product.name.slice(0, 40)}</h1>

                    <span className="bg-blue-100 mt-4 text-blue-700 text-md  mr-2 px-2.5 py-0.5 rounded font-medium font-semibold ">{product.category}</span>

                    <span className="bg-fuchsia-100 mt-4 text-fuchsia-700 text-md font-medium mr-2 px-2.5 py-0.5 rounded font-semibold ">{product.price}$</span>
                  </div>
                </div>
              ))}

            </div>

          </div>
          )}

        </div></div>
    </div>
  )
}

export default Home