import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import '../../Style/RightSidebar.css'; // Import the CSS file
import Sana from '../../assets/Sana.jpg';
import vat from '../../assets/Vat.jpg';
const RightSidebar = () => {
  const [friendRequests, setFriendRequests] = useState([
    {
      id: 1,
      name: 'Tes Sana',
      avatar: Sana,
      mutualFriends: 5,
    },
    {
      id: 2,
      name: 'Mann Vannda',
      avatar: vat,
      mutualFriends: 3,
    },
  ]);

  const [activeFriends, setActiveFriends] = useState([
    {
      id: 1,
      name: 'Vann Vat',
      avatar: vat,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Sok Pisey',
      avatar: Sana,
      isOnline: false,
    },
  ]);

  const handleAcceptRequest = (id) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleDeleteRequest = (id) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <aside className="right-sidebar">
      <div className="section">
        <h3>Friend Requests</h3>
        {friendRequests.map(req => (
          <div key={req.id} className="card">
            <img src={req.avatar} alt={req.name} className="avatar" />
            <div className="info">
              <strong>{req.name}</strong>
              <p>{req.mutualFriends} mutual friends</p>
              <div className="buttons">
                <button onClick={() => handleAcceptRequest(req.id)} className="btn accept">Accept</button>
                <button onClick={() => handleDeleteRequest(req.id)} className="btn delete">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="contact">
          <h3>Contacts</h3>
          <div className="icons">
            <IoMdSearch />
            <FiMoreHorizontal />
          </div>
        </div>
        {activeFriends.map(friend => (
          <div key={friend.id} className="friend">
            <img src={friend.avatar} alt={friend.name} className="avatar" />
            <span>{friend.name}</span>
            {friend.isOnline && <span className="online-dot"></span>}
          </div>
        ))}
      </div>

      <div className="section">
        <h3>People You May Know</h3>
        {[
          {
            name: 'Jennifer Kim',
            avatar: Sana,
          },
          {
            name: 'Ellie Bilish',
            avatar: vat,
          },
        ].map(person => (
          <div key={person.name} className="card">
            <img src={person.avatar} alt={person.name} className="avatar" />
            <div className="info">
              <strong>{person.name}</strong>
              <p>5 mutual friends</p>
              <button className="btn add">Add Friend</button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;

