import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Product_Details from './Pages/Product_Details/Product_Details'
import React, { useState } from 'react'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleItemSelect = (product) => {
    setSelectedProduct(product)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home handleItemSelect={handleItemSelect} />
    },
    {
      path: "/Detail/:id",
      element: <Product_Details  />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
