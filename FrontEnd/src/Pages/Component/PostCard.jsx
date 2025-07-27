
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
import { createPostReaction, deletePost, getLocally, handleDeleteFile } from "../../control/index.js"; // Adjust the import path as necessary

const PostCard = ({name, profile, onDelelet, post}) => {
  const image = post.content_file_url && post.content_file_url !== "none"? `http://localhost:3001/api/upload/${post.content_file_url.replace(/(^"|"$)/g, '')}`: undefined
  const [reaction, setReaction] = React.useState('like');
  const user = getLocally('user');

  const handleDelete = async () => {
    const response = await deletePost(post.post_id);

    if (response) {
      console.log("Post deleted successfully");
      onDelelet?.();
    } else {
      console.error("Failed to delete post");
    }

    const deleteImageResponse = await handleDeleteFile(image)
    if (deleteImageResponse) {
      console.log("Image deleted successfully");
    } else {
      console.error("Failed to delete image");
    }
  };
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profile} alt="Sina Ravy" className="avatar" />
        <div>
          <h3>{name}</h3>
          <p>{post.created_at}<FaGlobeAsia /></p>
        </div>
        <img src="/cancel.png" alt="Cancel" className='add-image' onClick={() => handleDelete()}/>
      </div>
      <div className="post-caption">
      {post.content_text}
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
      <span>{post.like_count + post.love_count + post.haha_count + post.wow_count + post.sad_count + post.angry_count}</span>
      <span></span>
      </div>

      <div className="post-actions">
      <button><FaThumbsUp onClick={handleReaction}/> Like</button>
      <button><FaCommentAlt /> Comment</button>
      <button><FaShare /> Share</button>
      </div>
    </div>
    );
};

export default PostCard;
