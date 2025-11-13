import React, { useEffect, useRef, useState } from 'react'
import './Comment.css'
import { formatDistanceToNow } from 'date-fns';
import { getAllComments } from '../../firebase';

const Comment = () => {
  
  const mockComments = [
    {
      name: 'Sarah Johnson',
      comment: 'Absolutely love this product! The quality is outstanding and it arrived quickly. Will definitely be ordering more.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      rating: 5
    },
    {
      name: 'Michael Chen',
      comment: 'Good value for money. The product meets my expectations and the customer service was helpful.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      rating: 4
    },
    {
      name: 'Emma Wilson',
      comment: 'I\'ve been using this for a few weeks now and I\'m really satisfied with my purchase. Highly recommended!',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      rating: 5
    },
    {
      name: 'David Brown',
      comment: 'The product is okay, but it took longer than expected to arrive. Overall decent quality though.',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      rating: 3
    },
    {
      name: 'Jessica Lee',
      comment: 'Exceeded my expectations! The material is better than I thought and the colors are vibrant.',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      rating: 5
    },
    {
      name: 'Robert Taylor',
      comment: 'Very happy with this purchase. The sizing is perfect and it\'s comfortable to wear.',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      rating: 4
    },
    {
      name: 'Amanda Clark',
      comment: 'Great product and fast shipping. Will buy again!',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      rating: 5
    }
  ];

  const [comments, setComments] = useState([]);
  const cardsRef = useRef();

  useEffect(() => {
    // Load both mock comments and database comments
    const loadAllComments = async () => {
      try {
        // Get comments from database
        const databaseComments = await getAllComments();
        
        // Transform database comments to match mock comment structure
        const formattedDatabaseComments = databaseComments.map(comment => ({
          name: comment.username || comment.name,
          comment: comment.description || comment.comment,
          date: comment.date?.toDate ? comment.date.toDate() : new Date(),
          rating: comment.rating
        }));
        
        // Combine mock comments with database comments
        const allComments = [...mockComments, ...formattedDatabaseComments];
        
        // Sort by date (newest first)
        allComments.sort((a, b) => b.date - a.date);
        
        setComments(allComments);
      } catch (error) {
        console.error("Error loading comments:", error);
        // Fallback to mock comments only
        setComments(mockComments);
      }
    };
    
    loadAllComments();
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  // Function to handle mouse drag scrolling (like in Top Sell)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - cardsRef.current.offsetLeft);
    setScrollLeft(cardsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - cardsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    cardsRef.current.scrollLeft = scrollLeft - walk;
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

  // Function to render star ratings
  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className='comment'>
      <h1>OUR HAPPY CUSTOMERS</h1>
      <div 
        className="comment-containers" 
        ref={cardsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
       {comments.map((data, index) => {
        return(
           <div className="comment-container" key={index}>
            <div className="rating">{renderRating(data.rating)}</div>
            <h2 className='comment-name'>{data.name}</h2>
            <p className='comment-text'>{data.comment}</p>
            <div className="date">{formatDistanceToNow(data.date, {addSuffix: true})}</div>
          </div>
        )
       })}
    </div>
    </div>
  )
}

export default Comment