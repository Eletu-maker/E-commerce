import React, { useEffect, useState } from 'react'
import './New_Arrivals.css'
import { Link } from 'react-router-dom'

const New_Arrivals = () => {
  const [apiData, setApiData] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(res => setApiData(res))
      .catch(err => console.error(err))
  }, [])

  const displayedProducts = showAll ? apiData : apiData.slice(0, 4)
  console.log(apiData)

  return (
    <div className='new-arrivals'>
      <h1>NEW ARRIVALS</h1>

      <div className="new-arrivals-container">
        {displayedProducts.map((data, index) => {
          return (
            <Link to={`/Detail/${data.id}`} key={data.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="arrivals-container">
                <img src={data.image} alt="" className='item-image' />
                <p className='item-name'>{data.title}</p>
                <p className="item-description">Rating: {data.rating?.rate}</p>
                <p className='item-price'>$ {data.price}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="button-wrapper">
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
    </div>
  )
}

export default New_Arrivals