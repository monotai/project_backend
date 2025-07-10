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


  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <hr className='line' />
      <div className='profile'></div>

      <div className='display-post'>
        <textarea
          placeholder="What's on your mind?"
          className="add-post-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        <div className='add-post-image'>
          {/* If image is set, show preview */}
          {image && <img src={image} alt="Preview" className="preview-image" />}
        </div>
        <div className='add-post-design'>
          <div className='picker'>
            <img src={colorImg} alt="Background Color" className='add-post-image' />
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
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="add-image-input"
              onChange={handleUploadImage}
            />
            <img
              src={addImage}
              alt="Add Image"
              className='add-image'
              onClick={() => document.getElementById('add-image-input').click()}
            />
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
