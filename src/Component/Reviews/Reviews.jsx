import React, { useState } from 'react'
import frame from '../../assets/Frame.png'
import './Reviews.css'
import comments from '../../assets/demo_data/comment_data'
import MessageBox from '../messageBox/MessageBox'

const Reviews = () => {

    const [messageBox, setMessageBox] = useState(false)
    const firstFour = comments.slice(-2)
  const [data, setData] = useState(firstFour)

  return (
     <div>
     <div className="review">
        <p className="review-text">All Reviews <span>{`(${comments.length})`}</span></p>
        <div className="review-filter">
            <button className="frame">
                <img src={frame} alt="" />
            </button>
            <button className="latest">latest</button>
            <button className="write" onClick={()=>setMessageBox(true)}>Write a Review</button>
        </div>
        
        
     </div>
     <div>{messageBox?<MessageBox condition = {()=>setMessageBox(false)}/>:""}</div>
        <div className="comments">
            {data.slice().reverse().map((data,index)=>{
                return(
                    <div className="container" key={index}>
                        <div className="contsiner-top">
                            {data.rating}  <span>...</span>
                        </div>
                        <div className="name">{data.name}</div>
                        <div className="">{data.comment}</div>
                        <div className="date">{data.date}</div>
                    </div>
                )
            })}
        </div>
        
            <button className='button' onClick={()=>setData(comments)} >View more Review</button>
        
        
    </div>
        
  )
}

export default Reviews
