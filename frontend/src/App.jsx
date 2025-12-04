import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import './index.css';
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from './components/LoginModal'
import { shopContext } from './context/ShopContext'
import Checkout from './pages/Checkout'
import OrderPlaced from './pages/OrderPlaced'
import Overview from './pages/Overview'
import Categories from './pages/Categories'

const App = () => {
  const location = useLocation();
  const {loginModalVisible,setLoginModalVisible}=useContext(shopContext);
  const [isVisible, setIsVisible] = useState(true);
  const [modalVisible,setModalVisible]=useState(false);
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/signin') || path.includes('/signup')) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);
  useEffect(()=>{
    loginModalVisible?setModalVisible(true):setModalVisible(false);
  },[loginModalVisible])
  return (
    <div >
      {isVisible && <Navbar />}
      <SearchBar />
      <ToastContainer />
      {modalVisible&&<LoginModal/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop/:tag' element={<Overview />} />
        <Route path='/collection' element={<Collections />} />
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/categories/:category' element={<Categories/>}/>
        <Route path='/collection/:category' element={<Collections />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/details/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/checkout' element={<Checkout />} />
        <Route path='/order-placed' element={<OrderPlaced />} />
      </Routes>
      {isVisible && <Footer />}
    </div>
  )
}

export default App