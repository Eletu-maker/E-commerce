import React from 'react'
import cartIcon from '../../assets/cart.svg'
import profile from '../../assets/profile.svg'
import searchIcon from '../../assets/search.svg'
import './Navbar.css' 
import Signup from '../SignUp/Signup'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext'

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useUser();

    // Calculate total number of items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
           
        <div className='navbar'>
            
            <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}><h1>SHOP.CO</h1></Link>
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
                <div className="cart-icon-container" onClick={()=>{navigate("/Cart")}}>
                    <img src={cartIcon} alt="Cart" className='Cart' />
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                    )}
                </div>
            </div>
            <div className="profile" onClick={() => navigate("/Profile")}>
                <img src={profile} alt="Profile" className='Profile' />
            </div>
        </div>
         </div>
    )
}

export default Navbar