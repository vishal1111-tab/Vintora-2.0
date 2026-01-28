import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ProductList from './plp/Productlist';
// import TabSortBy from './plp/TabSortBy';
// import TabForm from './plp/TabForm';
import Header from './plp/Header';
// import UseMedia from './plp/Hook/UseMedia';
import { CartProvider } from './Store/CartContext';
import MyCart from './plp/AddToCart/MyCart';
import ImageCarousel from './pdp/ImageCarousel';
import Footer from './plp/Footer/Footer';
import HomePage from './plp/HomePage/HomePage';
import LoginPage from './plp/Auth/Login';
import RegisterPage from './plp/Auth/Register';
 
 
 
 
const Layout = ({ children}) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/Register";
 
  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};
 
const App = () => {
 
 
 
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/productdetail" element={<ImageCarousel />} />
          </Routes>
        </Layout>
      </Router>
      {/* <ImageCarousel /> */}
    </CartProvider>
  );
};
 
export default App;