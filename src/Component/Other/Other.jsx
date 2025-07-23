import React from 'react'
import './Other.css'
import demo_data from '../../assets/demo_data/demo_data'
const Other = () => {
     const firstFour = demo_data.slice(0, 4)
  return (
    <div className='other'>
        <h1>YOU MIGHT ALSO LIKE</h1>
    <div className="other-containers">
        {firstFour.map((data, index)=>{
           return(
            <div className="other-container" key={index}>
              <img src={data.image} alt="" className='item-image'/>
              <p className='item-name'>{data.name}</p>
              <p className='item-price'>{data.price}</p>
            </div>
             )
          })}
    </div>

      
    </div>
  )
}

export default Other
