import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductView from '../components/ProductView'
import { fetchCategory } from '../features/categorySlice/categorySlice'
import { addFavorite, deleteProduct, fetchProduct, filteredCategory, removeFavorite } from '../features/productSlice/productSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { Category, Product } from '../types/types'

const Home = () => {
  const navigate = useNavigate();
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

  const handleFavorite = (product: Product) => {
    if (products.favorites?.includes(product)) {
      dispatch(removeFavorite(product))
    } else {
      dispatch(addFavorite(product))
    }
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
            {allProducts ? products.data.map((product: Product, index) => (
            // <ProductView {...product} key={product._id} />
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
              
              )) : products.filteredData?.map((product, index) => (
                // <ProductView {...product} key={product._id} />
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
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home