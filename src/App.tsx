import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import AllItemsPage from './pages/AllItemsPage';
import CartPage from './pages/CartPage';
import OrderCompletePage from './pages/OrderCompletePage';
import TrackPage from './pages/TrackPage';
import { useAppDispatch, useAppSelector } from './store/store';
import { setCart } from './store/slices/cartSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartItemsSaveToLS = () => {
    window.localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('save to LS!!!');
  };

  const getCartItemsFromLS = () => {
    const cartItems =
      JSON.parse(window.localStorage.getItem('cart') || '') || [];
    console.log('get from LS!!!');
    dispatch(setCart(cartItems));
  };

  React.useEffect(getCartItemsFromLS, []);
  React.useEffect(cartItemsSaveToLS, [cartItems]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/all-items" element={<AllItemsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-complete" element={<OrderCompletePage />} />
          <Route path="/track" element={<TrackPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
