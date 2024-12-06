import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import ProductInfo from '../pages/ProductInfo/ProductInfo';
import DebtPage from '../pages/DebtPage/DebtPage';
import DebtInfo from '../pages/DebtInfo/DebtInfo';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/debts" element={<DebtPage />} />
      <Route path="/finished_products" element={<DashboardPage />} />
      <Route path="/product-info/:id" element={<ProductInfo />} />
      <Route path="/debt-info/:id" element={<DebtInfo />} />
    </Routes>
  );
};

export default AppRoutes;
