import React from 'react'
import cart from '../../assets/cart.png'
import profile from '../../assets/profile.png'
import searchIcon from '../../assets/search.png'
import './Navbar.css' 
import Signup from '../SignUp/Signup'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <Signup />
    <div className='navbar'>
        
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><h1>SHOP.CO</h1></Link>
        <ul>
            <li>Shop</li>
            <li>On Site</li>
            <li>New Arrivals</li>
            <li>Brands</li>
        </ul>

        <div className="search-bar">
            <img src={searchIcon} alt="Search Icon" className='Search-Icon' />
            <input type="text"  placeholder='Search for products' />
            
        </div>
        <div className="cart">
            <img src={cart} alt="Cart" className='Cart' />
            
            </div>
        <div className="profile">
            <img src={profile} alt="Profile" className='Profile' />
        </div>
    </div>
     </div>
  )
}

export default Navbar
