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

const App: React.FC = () => {
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
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
