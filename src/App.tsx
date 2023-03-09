import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
