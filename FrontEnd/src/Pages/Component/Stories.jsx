import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import '../../Style/Stories.css'; // Your custom CSS file
import  Me from '../../assets/Phea.jpg';
import ST from '../../assets/ST.jpg';
import Sana from '../../assets/Sana.jpg';
import SM from '../../assets/Sm.jpg';
import vat from '../../assets/Vat.jpg';
import Sv from '../../assets/SV.jpg';
import Phea from '../../assets/pea.jpg';
const Stories = () => {
  const [stories] = useState([
    {
      id: 1,
      user: 'Your Story',
      avatar: '',
      image: SM,
      isViewed: false
    },
    {
      id: 2,
      user: 'Ponh Sophea',
      avatar: Phea,
      image: ST,
      isViewed: false
    },
    {
      id: 3,
      user: 'Tes Sana',
      avatar: Sana,
      image: ST,
    },
    {
      id: 4,
      user: 'Mary Chetra',
      avatar: Me,
      image: ST,
      isViewed: false
    },
    {
      id: 5,
      user: 'Vann Vat',
      avatar: vat,
      image: Sv,
      isViewed: false
    }
  ]);

  const [selectedStory, setSelectedStory] = useState(null);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  return (
    <>
      <div className="stories-container">
        {stories.map((story) => (
          <div
            key={story.id}
            className={`story-card ${story.isViewed ? 'viewed' : 'unviewed'}`}
            onClick={() => handleStoryClick(story)}
          >
            <img src={story.image} alt={story.user} className="story-image" />
            <div className="overlay"></div>
            <div className="story-avatar">
              {story.id === 1 ? (
                <div className="add-story">
                  <AiOutlinePlus />
                </div>
              ) : (
                <img src={story.avatar} alt={story.user} />
              )}
            </div>
            <div className="story-username">{story.user}</div>
          </div>
        ))}
      </div>

{selectedStory && (
  <div className="modal-overlay">
    <div className="modal-content">
      
      {/* Modal Header */}
      <div className="modal-header">
        <div className="modal-user">
          <img src={selectedStory.avatar} alt={selectedStory.user} className="user-avatar" />
          <span className="user-name">{selectedStory.user}</span>
        </div>
        <button onClick={closeStoryModal} className="close-button">
          <IoClose />
        </button>
      </div>

      {/* Story Image */}
      <img
        src={selectedStory.image}
        alt={selectedStory.user}
        className="modal-image"
      />
    </div>
  </div>
)}
    </>
  );
};

export default Stories;
