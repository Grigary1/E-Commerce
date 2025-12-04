import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import OrderPlaced from './pages/OrderPlaced';
import Overview from './pages/Overview';
import Categories from './pages/Categories';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import LoginModal from './components/LoginModal';

import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { shopContext } from './context/ShopContext';


const App = () => {
  const location = useLocation();
  const { loginModalVisible } = useContext(shopContext);

  const [isVisible, setIsVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Hide Navbar & Footer on login/signup
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/signin') || path.includes('/signup')) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);

  useEffect(() => {
    setModalVisible(loginModalVisible);
  }, [loginModalVisible]);


  return (
    <div>
      {isVisible && <Navbar />}
      <SearchBar />
      <ToastContainer />

      {modalVisible && <LoginModal />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* EVERYTHING ELSE IS PROTECTED */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path='/about' element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />

        <Route path='/contact' element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />

        {/* Browsing */}
        <Route path='/shop/:tag' element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        } />

        <Route path='/collection' element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        } />

        <Route path='/collection/:category' element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        } />

        <Route path='/categories' element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />

        <Route path='/categories/:category' element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />

        <Route path='/product/details/:productId' element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />

        {/* User Actions */}
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        <Route path='/orders' element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />

        <Route path='/user/checkout' element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />

        <Route path='/order-placed' element={
          <ProtectedRoute>
            <OrderPlaced />
          </ProtectedRoute>
        } />

      </Routes>

      {isVisible && <Footer />}
    </div>
  );
};

export default App;
