import React, { useState } from 'react'

import { useUser } from '../../UserContext';
import { submitComment } from '../../firebase';
import { showSuccess, showError } from '../../utils/notification';
import './MessageBox.css';

const MessageBox = ({condition }) => {

  const {user, addNewReview} = useUser()

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

 const message = (e)=>{
  setComment(e.target.value)
 }
    
 const submit = async(e)=>{
  e.preventDefault();
  if (!comment.trim() || rating === 0) {
    showError("Please provide both a review and a rating");
    return;
  }

  try{
    // Prepare comment data
    const commentData = {
      username: user.name,
      userId: user.uid,
      description: comment,
      rating: rating
    };

    // Submit comment to Firestore
    await submitComment(commentData);

    // Add the new review to context for immediate display
    const newReviewData = {
      ...commentData,
      id: Date.now(), // Temporary ID for immediate display
      date: new Date() // Current date for immediate display
    };
    
    addNewReview(newReviewData);

    showSuccess("Review submitted successfully!")
    condition()
  }catch(err){
    showError("Error submitting review: " + err.message)
    console.log(err)
  }
  
 }

 // Function to handle star rating
 const handleStarClick = (starRating) => {
   setRating(starRating);
 };

  return (
    <div className="message-box-overlay">
      <div className="message-box-container">
        <h2>Write a Review</h2>
        <form onSubmit={submit}>
          <label>
            Your Review:
            <textarea 
              onChange={message} 
              rows={5} 
              placeholder='Share your experience with this product...'
              value={comment}
              required
            ></textarea>
          </label>
          
          <label>
            Rating:
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-rating ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
              <span style={{ marginLeft: '10px', fontSize: '16px', color: '#555' }}>
                {rating}/5
              </span>
            </div>
          </label>
          
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={condition}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageBox