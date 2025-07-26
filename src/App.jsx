import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Product_Details from './Pages/Product_Details/Product_Details';
import React, { useState } from 'react';
import Login from './Pages/Login/Login';
import ProtectedRoute from './Component/ProtectedRoute'; // 👈
import { UserProvider } from './UserContext';


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleItemSelect = (product) => {
    setSelectedProduct(product);
  };

 


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/Home',
      element: (
        <ProtectedRoute>
          <Home handleItemSelect={handleItemSelect} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/Detail/:id',
      element: (
        <ProtectedRoute>
          <Product_Details />
        </ProtectedRoute>
      ),
    },
  ]);

  return(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  ) 
}

export default App;
