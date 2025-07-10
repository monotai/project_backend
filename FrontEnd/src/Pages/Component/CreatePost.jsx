import React from 'react';
import '../../Style/CreatePost.css'; // Adjust if needed
import colorImg from '../../assets/color.png';
import EmojiPicker from 'emoji-picker-react';
import addImage from '../../assets/addImage.png';
import addTag from '../../assets/addTag.png';
import addFeeling from '../../assets/addFeeling.png';
import addLocation from '../../assets/addMap.png';
import addGif from '../../assets/addGif.png';
import addMore from '../../assets/addMore.png';
import emoji from '../../assets/happiness.png';

export default function CreatePost() {
  const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleEmojiClick = (emojiObject) => {
    setText(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <hr className='line' />
      <div className='profile'></div>

      <div className='display-post'>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="post-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className='post-image'>
          {/* If image is set, show preview */}
          {image && <img src={image} alt="Preview" className="preview-image" />}
        </div>
        <div className='post-design'>
          <div className='picker'>
            <img src={colorImg} alt="Background Color" className='post-image' />
            <img src={emoji} alt="Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='add-image' />
          </div>
          {showEmojiPicker && (
            <div className='emoji-picker'>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <div className='add-to-post'>
          <p>Add to your post</p>
          <div className="add-icons">
            <img src={addImage} alt="Add Image" className='add-image' />
            <img src={addTag} alt="Add Tag" className='add-image' />
            <img src={addFeeling} alt="Add Feeling" className='add-image' />
            <img src={addLocation} alt="Add Location" className='add-image' />
            <img src={addGif} alt="Add GIF" className='add-image' />
            <img src={addMore} alt="Add More" className='add-image' />
          </div>
        </div>
      </div>
    </div>
  );
}
