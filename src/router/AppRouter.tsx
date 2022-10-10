
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import CreateProduct from '../pages/CreateProduct';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';


const AppRouter = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/details/:id" element={<ProductDetail />} />


        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;