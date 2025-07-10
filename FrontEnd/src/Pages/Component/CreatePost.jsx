import React from 'react';
import '../../Style/CreatePost.css';
import colorImg from '../../assets/color.png';
import EmojiPicker from 'emoji-picker-react';
import addImage from '../../assets/addImage.png';
import addTag from '../../assets/addTag.png';
import addFeeling from '../../assets/addFeeling.png';
import addLocation from '../../assets/addMap.png';
import addGif from '../../assets/addGif.png';
import addMore from '../../assets/addMore.png';
import emoji from '../../assets/happiness.png';
import { getLocally, handleFileUpload, handleFileGet, createPost } from '../../control/index.js';
import { useNavigate } from 'react-router-dom';


export default function CreatePost() {
  const navigate = useNavigate();
  const user = getLocally('user');
  const [imagePreview, setImagePreview] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [text, setText] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleEmojiClick = (emojiObject) => {
    setText(prev => prev + emojiObject.emoji);
  };

  const generateRandomFilename = (originalName) => {
    const ext = originalName.split('.').pop(); // Get file extension
    const random = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    return `${random}.${ext}`;
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (text.trim() === "" && !imageFile) {
      alert("Please enter some text or upload an image.");
      return;
    }

    let uploadedFilename = "none";

    if (imageFile) {
      try {
        let randomName;
        let exists = true;

        // Try random names until one doesn't exist
        while (exists) {
          randomName = generateRandomFilename(imageFile.name);
          const fileURL = await handleFileGet(randomName);
          exists = !!fileURL;
        }

        // Create new File object with same data but new name
        const renamedFile = new File([imageFile], randomName, {
          type: imageFile.type,
          lastModified: imageFile.lastModified,
        });

        // Upload using the renamed file
        uploadedFilename = await handleFileUpload(renamedFile);
      } catch (error) {
        alert("Image upload failed");
        return;
      }
    }

    uploadedFilename = uploadedFilename.replace(/(^"|"$)/g, ''); // Ensure URL format

    const postData = {
      user_id: user ? user.user_id : "",
      content_text: text,
      content_image_url: uploadedFilename,
      content_video_url: "none"
    };

    const response = createPost(postData);
    if (!response) {
      alert("Post creation failed");
      return;
    }

    navigate('/home');

    // Reset form
    setText("");
    setImagePreview("");
    setImageFile(null);
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <hr className='line' />
      <div className='profile'></div>

      <div className='display-post'>
        <textarea
          placeholder={`What's on your mind, ${user ? user.username : ''}?`}
          className="add-post-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        <div className='add-post-image'>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="preview-image" />
          )}
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

        <button className='post-button' onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}
