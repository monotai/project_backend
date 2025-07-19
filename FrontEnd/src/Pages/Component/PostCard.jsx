
import React from "react";
import "../../Style/PostCard.css"; // Adjust the path as necessary
import {
  FaGlobeAsia,
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaHeart,
  FaKissWinkHeart,
} from "react-icons/fa";
import { deletePost } from "../../control/index.js"; // Adjust the import path as necessary

const PostCard = ({ id, name, profile, text, image, onDelelet}) => {
  const handleDelete = async () => {
    const response = await deletePost(id);
    if (response) {
      console.log("Post deleted successfully");
      onDelelet?.();
    } else {
      console.error("Failed to delete post");
    }
  };
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profile} alt="Sina Ravy" className="avatar" />
        <div>
          <h3>{name}</h3>
          <p>1m • <FaGlobeAsia /></p>
        </div>
        <img src="/cancel.png" alt="Cancel" className='add-image' onClick={() => handleDelete()}/>
      </div>
      <div className="post-caption">
      {text}
      </div>

      <div className="post-image">
      {image ? (
        image.endsWith(".mp4") || image.endsWith(".webm") || image.endsWith(".ogg") ? (
        <video controls width="100%">
          <source src={image} type={`video/${image.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
        ) : (
        <img src={image} alt="Post content" />
        )
      ) : null}
      </div>

      <div className="post-reactions">
      <span><FaThumbsUp /> <FaHeart /> <FaKissWinkHeart /> 19K</span>
      <span>19K comment</span>
      </div>

      <div className="post-actions">
      <button><FaThumbsUp /> Like</button>
      <button><FaCommentAlt /> Comment</button>
      <button><FaShare /> Share</button>
      </div>
    </div>
    );
};

export default PostCard;
