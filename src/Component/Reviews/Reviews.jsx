import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import frame from '../../assets/frame.svg'
import './Reviews.css'
import MessageBox from '../MessageBox/MessageBox'
import { getAllComments } from '../../firebase'
import { useUser } from '../../UserContext'

const Reviews = () => {

    const { newReview, clearNewReview } = useUser()
    const [messageBox, setMessageBox] = useState(false)
    const [comments, setComments] = useState([]);
    useEffect(()=>{
        const loadComments = async () =>{
            const commentsData = await getAllComments();
            setComments(commentsData);
        };
        loadComments();
        
        // Clear new review on page load
        clearNewReview();
    },[])

    
    const firstFour = comments.slice(0, 2)

    console.log(firstFour)
  const [data, setData] = useState(firstFour)

  // Function to render star ratings
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
     <div>
     <div className="review">
        <p className="review-text">All Reviews <span>{`(${comments.length + (newReview ? 1 : 0)})`}</span></p>
        <div className="review-filter">
            <button className="frame">
                <img src={frame} alt="" />
            </button>
            <button className="latest">latest</button>
            <button className="write" onClick={()=>setMessageBox(true)}>Write a Review</button>
        </div>
        
        
     </div>
     <div>{messageBox?<MessageBox condition = {()=>setMessageBox(false)}/>:""}</div>
       
        <div className='comment'>
            
            <div className="comment-containers">
                
                {newReview && (
                    <div className="comment-container">
                        <div className="rating">{renderRating(newReview.rating)}</div>
                        <h2 className='comment-name'>{newReview.username}</h2>
                        <p className='comment-text'>{newReview.description}</p>
                        <div className="date">
                            {formatDistanceToNow(newReview.date, {addSuffix: true})}
                        </div>
                    </div>
                )}
                {comments.map((data, index) => {
                    return (
                        <div className="comment-container" key={data.id || index}>
                            <div className="rating">{renderRating(data.rating)}</div>
                            <h2 className='comment-name'>{data.username || data.name}</h2>
                            <p className='comment-text'>{data.description || data.comment}</p>
                            <div className="date">
                                {data.date?.toDate ? formatDistanceToNow(data.date.toDate(), {addSuffix: true}) : "No date"}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
        
  )
}

export default Reviews