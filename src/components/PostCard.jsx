import React from 'react';
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  console.log("POST CARD", post);
  const {$id, title, featuredImage} = post;

  // Only call getFilePreview if featuredImage exists
  const imageUrl = featuredImage ? service.getFilePreview(featuredImage) : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6'>
        <div className='w-full justify-center mb-4'>
          {/* Render image only if imageUrl exists */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className='rounded-xl object-cover w-full h-64 transition-transform duration-300 ease-in-out transform hover:scale-105'
            />
          )}
        </div>
        <h2 className='text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300'>
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
