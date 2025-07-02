
import React from "react";
import "./PostCard.css";
import {
  FaGlobeAsia,
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaHeart,
  FaKissWinkHeart,
} from "react-icons/fa";

const PostCard = () => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src="/images/image.png" alt="Sina Ravy" className="avatar" />
        <div>
          <h3>Sina Ravy</h3>
          <p>1m • <FaGlobeAsia /></p>
        </div>
      </div>

      <div className="post-caption">
        Miss you so much 😘#VY💗
      </div>

      <div className="post-image">
        <img src="/images/image.png" alt="Post content" />
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
