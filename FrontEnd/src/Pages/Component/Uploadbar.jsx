import '../../Style/PostCard.css';
import { useNavigate } from 'react-router-dom';

export default function Uploadbar({name}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/create-post');
  };
  return (
    <div className="post-card">
      <div className="upload-container">
        <img src="/images/profile.png" alt="User Profile" className="avatar" />
        <input type="text" placeholder={`What's on your mind, ${name}?`} className="upload-input" onClick={() => handleClick()} />
      </div>
      <hr className='line' />
      <div className="upload-options">
        <button className="upload-button" onClick={handleClick}>Photo/Video</button>
        <button className="upload-button" onClick={handleClick}>Tag Friends</button>
        <button className="upload-button" onClick={handleClick}>Feeling/Activity</button>
      </div>
    </div>
  );
};