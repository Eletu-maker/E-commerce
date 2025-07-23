import React from 'react'
import './Footer.css'
import mail from '../../assets/mail.png'
import twitter from '../../assets/twitter.png'
import fb from '../../assets/fb.png'
import instagram from '../../assets/instagram.png'
import github from '../../assets/github.png'
import a_pay from '../../assets/apple-pay.png'
import g_pay from '../../assets/g-pay.png'
import visa from '../../assets/visa.png'
import paypal from '../../assets/paypal.png'
const Footer = () => {
  return (
    <div className='footer'>
        
        <div className="footer-top">
            <div className="footer-top-text">
                <p>STAY UPTO DATE ABOUT</p>
                <p>OUR LATEST OFFERS</p>
            </div>
            <div className="footer-top-button">
                <div className="input">
                    <img src={mail} alt="" className='mail-icon' />
                <input type="text" placeholder='Enter your email address' />
                </div>
                <button className='subscribe'> Subscribe to Newsletter</button>
            </div>
        </div>
        <div className="footer-buttom">
            <div className="footer-collection">
            <div className="logo">
                <h1>SHOP.CO</h1>
                <p>We have cloths that suits your style and which you're proud to wear. From women to men.</p>
                <div className="logos">
                    <img src={twitter} alt="" className='twitter'/>
                    <img src={fb} alt="" className='fb'/>
                    <img src={instagram} alt="" className='twitter'/>
                    <img src={github} alt="" className='twitter'/>
                </div>
            </div>
            <div className="footer-buttom-list">
                <h2>COMPANY</h2>
                <ul>
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>
            <div className="footer-buttom-list">
                <h2>COMPANY</h2>
                <ul>
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>
            <div className="footer-buttom-list">
                <h2>COMPANY</h2>
                <ul>
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>
            </div>
            <hr />
            <div className="end">
                <div className="end-text">
                    Shop.co @ 2000-2023, All Rights Reserved
                </div>
                <div className="end-img">
                <div className="payment">
                    <img src={a_pay} alt="" />
                </div>
                <div className="payment">
                    <img src={g_pay} alt="" />
                </div>
                <div className="payment">
                    <img src={paypal} alt="" />
                </div>
                <div className="payment">
                    <img src={visa} alt="" />
                </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
