import React from 'react'
import './product.css'
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'

import Order from '../../Component/Order/Order'
import Reviews from '../../Component/Reviews/Reviews'
import Other from '../../Component/Other/Other'
import { useParams } from 'react-router-dom'
import { useUser } from '../../UserContext'

const Product_Details = () => {

  const {user} = useUser

  const {id} = useParams()
  return (
    <div className='product_details'>
        <Navbar/>
        <div className='product_details_intro'>
            <span className="switch">Home - </span>
            <span className="switch">Shop - </span>
            <span className="switch">Men - </span>
            <span className="switch">T-shirts </span>
        </div>

        <Order theProduct={id} />
        <Reviews/>

        <Other/>
        

        <Footer/>
      
    </div>
  )
}

export default Product_Details
