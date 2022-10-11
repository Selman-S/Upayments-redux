import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductView from '../components/ProductView'
import { fetchCategory } from '../features/categorySlice/categorySlice'
import { addFavorite, deleteProduct, fetchProduct, filteredCategory, removeFavorite } from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { Category, Product } from '../types/types'


const Home = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.category)
  const products = useAppSelector(state => state.product)
  const [allProducts, setAllProducts] = useState<boolean>(true)




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
      <div className="container  my-10 mx-auto">
        <div className="overflow-x-auto  ">

          {categories.loading ? <Loading /> : (<table className="table border  w-full lg:w-1/2  lg:mx-auto "> <thead>
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

            <div className=''>

              {allProducts ? products.data.map((product:Product, index) => (
                <ProductView {...product} />

              )) : products.filteredData?.map((product, index) => (
                <ProductView {...product} />
              ))}

            </div>

          </div>
          )}

        </div></div>
    </div>
  )
}

export default Home