import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import frame from '../../assets/Frame.png'
import './Reviews.css'
import MessageBox from '../messageBox/MessageBox'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

const Reviews = () => {

    const [messageBox, setMessageBox] = useState(false)
     const [comments, setComments] = useState([]);
     useEffect(()=>{
        const loadComments = async () =>{
            const q = query(collection(db,"comments"),orderBy("date","desc"));
            const querySnapshot = await getDocs(q);
            setComments(querySnapshot.docs.map((doc) => doc.data()));
        };
        loadComments();
     },[])

    
    
    const firstFour = comments.slice(-2)

    console.log(firstFour)
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
            {data.map((data,index)=>{
                return(
                    <div className="container" key={index}>
                        <div className="contsiner-top">
                            {data.rating}  <span>...</span>
                        </div>
                        <h2 className="name">{data.name}</h2>
                        <div className="reviews">{data.comment}</div>
                        <div className="date">Time: {data.date?.toDate? formatDistanceToNow(data.date.toDate(),{addSuffix: true}):"No date"}</div>
                    </div>
                )
            })}
        </div>
        
            <button className='button' onClick={()=>setData(comments)} >View more Review</button>
        
        
    </div>
        
  )
}

export default Reviews
