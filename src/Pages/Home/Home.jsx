import React from 'react'
import './Home.css'
import Navbar from '../../Component/Navbar/Navbar'
import Desginers from '../../Component/Desiners/Designers'
import New_Arrivals from '../../Component/New_Arrivals/New_Arrivals'
import Top_Sell from '../../Component/Top_Sell/Top_Sell'
import Comment from '../../Component/Comment/Comment'
import Footer from '../../Component/Footer/Footer'
const Home = ({handleItemSelect}) => {
   
  return (
    <div className='home'>
      <Navbar />
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
