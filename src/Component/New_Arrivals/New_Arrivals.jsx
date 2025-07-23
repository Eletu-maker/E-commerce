import React, { useEffect, useState } from 'react'
import './New_Arrivals.css'

import demo_data from '../../assets/demo_data/demo_data'
import { Link } from 'react-router-dom'
const New_Arrivals = () => {

  const [apiData, setApiData]= useState([])

  const [open,setOpen] = useState(true)

 
useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => setApiData(res.products))
      .catch(err => console.error(err))
  }, [])
const firstFour = apiData.slice(0,4)
  console.log(apiData)

  return (
    <div className='new-arrivals'>
        <h1>NEW ARRIVALS</h1>
        
        <div className="new-arrivals-container">
            {(open?firstFour:apiData).map((data, index)=>{
           return(
            <Link to={`/Detail/${data.id}`} key={data.id } style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="arrivals-container"  >
              <img src={data.images[0]} alt="" className='item-image'/>
              <p className='item-name'>{data.title}</p>
              <p className="item-description">{data.rating}</p>

              <p className='item-price'>$ {data.price}</p>
            </div>
            
            </Link>
             )
          })}
        
        
        </div>

        <div className="button-wrapper">
  <button onClick={()=>setOpen(false)}>View All</button>
</div>
      
    </div>
  )
}

export default New_Arrivals
