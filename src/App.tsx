import React from 'react';
import { fetchCategory } from './features/categorySlice/categorySlice';
import { fetchProduct } from './features/productSlice/productSlice';
import { useAppDispatch, useAppSelector } from './store';



function App() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.category)
  const products = useAppSelector(state => state.product)


  return (
    <div >
      <button onClick={() => dispatch(fetchCategory())}>Fetch Category</button>

      <button onClick={() => dispatch(fetchProduct())}>Fetch Product</button>
      <div >
        {categories.loading ? <h1>Loading</h1> : (
          <div>{categories.data?.categories.map((category) => <p>{category.name}</p>)}</div>
        )}
      </div>
      <div >
        {products.loading ? <h1>Loading</h1> : (
          <p>{products.data?.products.map((product) => <h1>{product.name}</h1>)}</p>
        )}
      </div>
    </div>
  );
}

export default App;
