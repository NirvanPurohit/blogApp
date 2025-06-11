import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";
import { Container, PostCard } from "../../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await service.getPosts();
        console.log("Fetched Posts:", fetchedPosts); // ✅ Debugging
        setPosts(fetchedPosts?.documents || []);
      } catch (err) {
        console.error("Error fetching posts:", err); // ✅ Log error
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  return (
    <Container>
      <h1 className="text-2xl font-bold text-center my-6">All Posts</h1>

      {/* Show loading state */}
      {loading && <p className="text-center">Loading posts...</p>}

      {/* Show error if any */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(posts) && posts.map((post) => {
  if (!post) return null; // Prevent undefined errors
  console.log("Rendering post:", post);
  return <PostCard key={post.$id} post={post} />;
})}

        </div>
      ) : (
        !loading && <p className="text-center">No posts found.</p>
      )}
    </Container>
  );
}

export default AllPosts;
