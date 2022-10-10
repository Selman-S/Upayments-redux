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
  console.log(products);


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


            {/* <div className='my-5 mx-auto text-center'>


              <select className="select select-primary  w-full max-w-xs" id='filterCategory' defaultValue='All Category'>
                <option   >All Category</option>
                {categories.data?.categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)}


              </select>
            </div> */}
            <div className='text-center my-5'>

              <button onClick={() => handleAllCategories()} className='btn btn-primary text-white'>All Category</button>
            </div>
            <table className='table border table-fixed w-1/2 mx-auto '>
              <thead>
                <tr>
                  <th className='bg-indigo-700 text-white w-10'></th>
                  <th className='bg-indigo-700 text-white w-50'>  Products</th>
                  <th className='bg-indigo-700 text-white'>  Category</th>
                  <th className='bg-indigo-700 text-white'>Price</th>
                </tr>
              </thead>
              <tbody>
                {allProducts ? products.data.map((product, index) => (
                  <tr className="w-full hover cursor-pointer" key={index} onClick={() =>
                    navigate('/details/' + product._id, { state: product, replace: false })
                  }>
                    <th >{index + 1}</th>
                    <td className='overflow-hidden'>{product.name}</td>
                    <td className='overflow-hidden'>{product.category}</td>
                    <td >{product.price}</td>
                  </tr>
                )) : products.filteredData?.map((product, index) => (
                  <tr className="w-full hover cursor-pointer" key={index} onClick={() =>
                    navigate('/details/' + product._id, { state: product, replace: false })
                  }>
                    <th >{index + 1}</th>
                    <td className='overflow-hidden'>{product.name}</td>
                    <td className='overflow-hidden'>{product.category}</td>
                    <td >{product.price}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          )}

        </div></div>
    </div>
  )
}

export default Home