import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Deals from './components/Deals';
import Categories from './components/Categories';
import Shop from './components/Shop'
import Home from './components/Home';
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Wishlist from './components/Wishlist';


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes - no navbar/footer */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* App routes - wrapped in Layout with navbar/footer */}
        <Route path="/*" element={
          <Layout cartCount={0}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<div className="p-8">Account page</div>} />
              <Route path="*" element={<div className="p-8 text-center">404 - Page not found</div>} />
               <Route path="/product/:id" element={<ProductDetail />} />
               <Route path='/checkout' element={<Checkout />}/>
               <Route path='/order-success' element={<OrderSuccess />}/>
               <Route path='/wishlist' element={<Wishlist />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
