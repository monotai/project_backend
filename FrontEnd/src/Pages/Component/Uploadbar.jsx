import '../../Style/PostCard.css';
export default function Uploadbar() {
  return (
    <div className="post-card">
      <div className="upload-container">
        <img src="/images/image.png" alt="User Profile" className="avatar" />
        <input type="text" placeholder="What's on your mind?" className="upload-input" />
      </div>
      <hr className='line' />
      <div className="upload-options">
        <button className="upload-button">Photo/Video</button>
        <button className="upload-button">Tag Friends</button>
        <button className="upload-button">Feeling/Activity</button>
      </div>
    </div>
  );
}