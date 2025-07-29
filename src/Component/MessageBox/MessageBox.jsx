import React, { useState } from 'react'
import comments from '../../assets/demo_data/comment_data'
import { useUser } from '../../UserContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';


const MessageBox = ({condition }) => {

  const {user} = useUser()

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

 const message = (e)=>{
  setComment(e.target.value)
 }
    
 const submit = async(e)=>{
  e.preventDefault();
  if (!comment.trim()) return;

  try{
    await addDoc(collection(db,"comments"),{
        name: user.name,
        uid: user.uid,
        comment ,
        rating,
        date: serverTimestamp(),
    })

  alert("Review upload")
  condition()
  }catch(err){
    alert(err)
    console.log(err)
  }
  
 }


    
  return (
    <form onSubmit={submit}>
      <label>
        Enter your message:
        <br />
        <textarea  onChange={message} rows={5} cols={40}
         placeholder='Enter your message' value={comment}></textarea>
      </label>
      <br />
      <label>
  Rating (1 to 5): 
  <input
    type="number"
    min="1"
    max="5"
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
  />
</label>

      <button onClick={condition}>cancel</button>
      <button type="submit" >submit</button>
    </form>
  )
}

export default MessageBox
