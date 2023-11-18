import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific blog post from your backend
    fetch(`http://localhost:3001/post/6550875d69979d29e16ac74e`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching blog post:', error));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>BLOG PAGE</h1>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Display other details like pictures, comments, ratings, etc. */}
    </div>
  );
};

export default BlogPage;
