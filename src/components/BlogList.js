import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard'; 
import '../style/BlogList.css';
import NavBar from './NavBar'; 

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Check if the user is authenticated before making the request
    const checkAuthentication = async () => {
      try {
        
        console.log("Loggin In!");
        const response = await fetch('http://localhost:3001/user/login', {
          method: 'POST',
          // headers: {'Content-Type': 'application/json', 'Accept' : '/'},
          body: JSON.stringify({
            "username" : "Mahad4",
            "email" : "mahad4@gmail.com",
            "password" : "mahad4",
            "id" : "65507ea3ca1f2cfa58538b0e",
            "roles" : "admin",
            "title": "First Updated Post",
            "content" : "This is my first post!",
            "category" : "",
            "text" : "My first comment!",
            "author" : "65507ea3ca1f2cfa58538b0e",
            "value" : 2,
            "keyword" : "First Post",
            "sortBy" : "title"
          }),
        });
        console.log(response);
        console.log("Getting Post!");
        const postsResponse = await fetch('http://localhost:3001/post/', {
            method: 'GET', 
            headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTUwN2VhM2NhMWYyY2ZhNTg1MzhiMGUiLCJpYXQiOjE3MDAzMjA3MzksImV4cCI6MTcwMDMyNDMzOX0.PCpXvfQ9oJWzy2vgLBo_qAsEzIH-K7Q-8uRvWIgeou8`, // Replace with the actual token
            // 'Content-Type': 'application/json',  // Add this line to specify the content type
          },});
          console.log("Post Response: ", postsResponse); // Log the response object
          const postsData = await postsResponse.json();
          console.log("Posts Data: ", postsData); // Log the parsed JSON data

          setPosts(postsData.posts);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-list">
      <NavBar />
      <h1 className='blog-list-heading'>Blog List</h1>
      <ul className="blog-cards-container">
        {posts.map(post => (
          <li key={post._id} className="blog-card-wrapper">
            <Link className="Link-Heading" to={`/blog/${post._id}`}>
              {post.title}
            </Link>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
