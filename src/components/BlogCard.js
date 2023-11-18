import React, { useState, useEffect } from 'react'; 
import '../style/BlogCard.css';

const BlogCard = ({ post }) => {
    const { title, content, author, pictures, comments, ratings } = post;
    const [authorDetails, setAuthorDetails] = useState(null);
    console.log("Blog Author: ", author);
    useEffect(() => {
        const fetchAuthorDetails = async () => {
          try {
            // Check if author is defined before making the fetch call
            if (!author) {
              return;
            }
    
            // Replace 'your-api-endpoint' with the actual endpoint to fetch user details by ID
            const response = await fetch(`http://localhost:3001/user/${author}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTUwN2VhM2NhMWYyY2ZhNTg1MzhiMGUiLCJpYXQiOjE3MDAzMjA3MzksImV4cCI6MTcwMDMyNDMzOX0.PCpXvfQ9oJWzy2vgLBo_qAsEzIH-K7Q-8uRvWIgeou8`, // Replace with the actual token
              },
            });
    
            if (response.ok) {
              const authorData = await response.json();
              setAuthorDetails(authorData);
            } else {
              console.error('Error fetching author details:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching author details:', error);
          }
        };
    
        fetchAuthorDetails();
      }, [author]);
    
  console.log(author);
  return (
    <div className="blog-card">

    <div className="blog-images-container">
            {pictures && pictures.length > 0 ? (
            <div className="blog-images">
                {pictures.map((picture, index) => (
                <img
                    key={index}
                    src={picture.url}
                    alt={picture.description || 'Blog Image'}
                    className="blog-image"
                />
                ))}
            </div>
            ) : (
            <div className="empty-blog-images">No Image</div>
            )}
      </div>
      <h2 className="blog-title">{title}</h2>
      <p className="blog-content">{content}</p>
      <p className="blog-author">Author: {authorDetails ? authorDetails.username : "Blog User"}</p>

      {pictures && pictures.length > 0 && (
        <div className="blog-images">
          {pictures.map((picture, index) => (
            <img
              key={index}
              src={picture.url}
              alt={picture.description || "Blog Image"}
              className="blog-image"
            />
          ))}
        </div>
      )}

      <div className="blog-comments">
        <h3 className="comments-heading">Comments</h3>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <strong className="comment-author">{comment.author}:</strong> {comment.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-ratings">
        <h3 className="ratings-heading">Ratings</h3>
        <ul className="ratings-list">
          {ratings.map((rating, index) => (
            <li key={index} className="rating-item">
              <strong className="rating-author">{rating.author}:</strong> {rating.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogCard;
