import React, { useEffect } from 'react'
import './Home.css'
import Navbar from '../../Component/Navbar/Navbar'
import Desginers from '../../Component/Desiners/Designers'
import New_Arrivals from '../../Component/New_Arrivals/New_Arrivals'
import Top_Sell from '../../Component/Top_Sell/Top_Sell'
import Comment from '../../Component/Comment/Comment'
import Footer from '../../Component/Footer/Footer'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUser } from '../../UserContext.jsx'
const Home = ({handleItemSelect}) => {
  const { user } = useUser();

 

  return (
    <div className='home'>
      <Navbar />
      {user && <div className="welcome-user">Welcome, {user.name}!</div>}
      <Desginers />
      <New_Arrivals  theIndex={handleItemSelect} />
      <hr />
      <Top_Sell />
      <Comment />
      <Footer/>
      
    </div>
  )
  
}

export default Home
