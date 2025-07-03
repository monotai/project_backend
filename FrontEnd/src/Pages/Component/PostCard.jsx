
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

const PostCard = ({ name, profile, text, image}) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profile} alt="Sina Ravy" className="avatar" />
        <div>
          <h3>
            {/* Sina Ravy */}
            {name}
          </h3>
          <p>1m • <FaGlobeAsia /></p>
        </div>
      </div>

      <div className="post-caption">
        {/* Miss you so much 😘#VY💗 */}
        {text}
      </div>

      <div className="post-image">
        <img src={image} alt="Post content" />
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
