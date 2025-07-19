// src/componenent/Sidebar.jsx
import React from 'react';
import '../../Style/Sidebar.css';
import {FaUserFriends} from 'react-icons/fa';
import userProfile from '../../assets/user.png';
import {
  RiBarChartBoxFill,
  TbCalendarTime,
  MdGroups,
  IoHome,
  PiVideoFill,
  GiBackwardTime,
  FcBookmark,
  TfiArrowCircleDown,
} from '../../assets/Icon/Icons';
import { getLocally } from '../../control';

const menuItems = [
  { icon: <FaUserFriends style={{ color: '#1877f2' }} />, label: 'Friends' },
  { icon: <RiBarChartBoxFill style={{ color: '#1877f2' }} />, label: 'Professional dashboard' },
  { icon: <TbCalendarTime style={{ color: '#1877f2' }} />, label: 'Feeds' },
  { icon: <MdGroups style={{ color: '#1877f2' }} />, label: 'Groups' },
  { icon: <IoHome style={{ color: '#1877f2' }} />, label: 'Markplaces' },
  { icon: <PiVideoFill style={{ color: '#1877f2' }} />, label: 'Reels' },
  { icon: <GiBackwardTime style={{ color: '#1877f2' }} />, label: 'Memories' },
  { icon: <FcBookmark  />, label: 'Saved' },
  { icon: <TfiArrowCircleDown style={{ color: '#65676b' }} />, label: 'See More' },
];
function Sidebar() {
  const user = getLocally('user');
  const username = user ? user.username : 'Guest';
  return (
    <div className="sidebar">

        
      {/* </div> */}
      {/* Profile Section */}
        <div className="profile">
        <img
          src={userProfile}
          alt={`${username}'s profile`}
          className="profile-img"
        />
        <span className="label">{`${username}`}</span>
      </div>

      {/* Menu Items */}
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;







