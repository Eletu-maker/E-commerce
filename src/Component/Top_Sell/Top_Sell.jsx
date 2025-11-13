import React, { useEffect, useState, useRef } from 'react'
import './Top_Sell.css'
import { Link } from 'react-router-dom'

const Top_Sell = () => {
  const [apiData, setApiData] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const carouselRef = useRef(null)
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(res => {
        setApiData(res)
        // Select 10 random products
        const shuffled = [...res].sort(() => 0.5 - Math.random())
        setDisplayedProducts(shuffled.slice(0, 10))
      })
      .catch(err => console.error(err))
  }, [])

  const slideLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const slideRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className='top-sell'>
      <h1>TOP SELL</h1>
      
      <div className="carousel-wrapper">
        <button className="carousel-button left" onClick={slideLeft}>&#8249;</button>
        
        <div 
          className="top-sell-container"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {displayedProducts.map((data) => {
            return (
              <Link to={`/Detail/${data.id}`} key={data.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="sell-container">
                  <img src={data.image} alt="" className='item-image' />
                  <p className='item-name'>{data.title}</p>
                  <p className='item-price'>$ {data.price}</p>
                </div>
              </Link>
            )
          })}
        </div>
        
        <button className="carousel-button right" onClick={slideRight}>&#8250;</button>
      </div>
    </div>
  )
}

export default Top_Sell