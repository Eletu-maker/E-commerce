import React, { useEffect, useRef } from 'react'
import './Comment.css'
import comments from '../../assets/demo_data/comment_data'
const Comment = () => {


  
    const cardsRef = useRef()

  const handleWheel = (event) => {
  event.preventDefault();
  if (cardsRef.current) {
    cardsRef.current.scrollLeft += event.deltaY;
  }
};


   useEffect(() => {
    const container = cardsRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);


  return (
    <div className='comment'>
      <h1>OUR HAPPY CUSTOMERS</h1>
      <div className="comment-containers" ref={cardsRef}>
       {comments.map((data,index)=>{
        return(
           <div className="comment-container" key={index}>
            <p>{data.rating}</p>
            <h2 className='comment-name'>{data.name}</h2>
          <p className='comment-text'>{data.comment}</p>
      </div>
        )
       })}
    </div>
    </div>
  )
}

export default Comment
