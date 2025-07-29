import React, { useEffect, useRef, useState } from 'react'
import './Comment.css'
import { formatDistanceToNow } from 'date-fns';
import comments from '../../assets/demo_data/comment_data'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Comment = () => {

  const [comments, setComments] = useState([]);

  
    const cardsRef = useRef()

  const handleWheel = (event) => {
  event.preventDefault();
  if (cardsRef.current) {
    cardsRef.current.scrollLeft += event.deltaY;
  }
};

useEffect(() =>{
  const loadComments = async () =>{
    const q = query(collection(db,"comments"),orderBy("date","desc"));
    const querySnapshot = await getDocs(q);
    setComments(querySnapshot.docs.map(doc => doc.data()));
  };
  loadComments();
},[])

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
       {comments.slice().reverse().map((data,index)=>{
        return(
           <div className="comment-container" key={index}>
            <p>rating: {data.rating}/5</p>
            <h2 className='comment-name'>{data.name}</h2>
          <p className='comment-text'>{data.comment}</p>
          <div className="date">{data.date?.toDate? formatDistanceToNow(data.date.toDate(),{addSuffix: true}):"No date"}</div>
      </div>
        )
       })}
    </div>
    </div>
  )
}

export default Comment
