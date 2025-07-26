import React, { useState } from 'react'
import comments from '../../assets/demo_data/comment_data'

const MessageBox = ({condition }) => {

  const [comment, setComment] = useState('');

 const message = (e)=>{
  setComment(e.target.value)
 }
    
 const submit =(e)=>{
  
  let val ={
    name:'person1',
        comment:comment,
        date:'2020-01-01',
        rating:3
  }
  
  comments.push(val)
  alert("Review upload")
  condition()
 }


    
  return (
    <form onSubmit={submit}>
      <label>
        Enter your message:
        <br />
        <textarea  onChange={message} rows={5} cols={40} placeholder='Enter your message'></textarea>
      </label>
      <br />
      <button onClick={condition}>cancel</button>
      <button type="submit" >submit</button>
    </form>
  )
}

export default MessageBox
