import React, { useState } from 'react'
import './Top_Sell.css'
import item1 from '../../assets/item1.png'

import demo_data from '../../assets/demo_data/demo_data'
const Top_Sell = () => {
  const firstFour = demo_data.slice(0, 4)
  const [data, setData] = useState(firstFour)

  return (
    <div className='top-sell'>
      <h1>TOP SELL</h1>
              
              <div className="top-sell-container">
                  {data.map((data,index)=>{
                    return (
                        <div className="sell-container" key={index}>
                  <img src={data.image} alt="" className='item-image'/>
                  <p className='item-name'>{data.name}</p>
                  <p className='item-price'>{data.price}</p>
                </div>
                    )
                  })}
                  
                  
              
              
              </div>
             <div className="button-wrapper">
  <button onClick={()=>setData(demo_data)}>View All</button>
</div>
    </div>
  )
}

export default Top_Sell
