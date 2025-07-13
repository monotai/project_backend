import React from 'react';
import { BiSolidHome } from "react-icons/bi";
import { MdOndemandVideo } from 'react-icons/md';
import { BsShop, BsSearch } from 'react-icons/bs';
import { FaUserFriends, FaFacebook } from 'react-icons/fa';
import { RiGamepadLine } from "react-icons/ri";
import { CgMenuGridR } from 'react-icons/cg';
import { BiLogoMessenger } from 'react-icons/bi';
import { HiMiniBell } from 'react-icons/hi2';
import '../../Style/Header.css';
import userProfile from '../../assets/user.png';
const Header = ({ user }) => {
  const navItems = [
    { icon: BiSolidHome , active: true },
    { icon: MdOndemandVideo, active: false },
    { icon: BsShop, active: false },
    { icon: FaUserFriends, active: false },
    { icon: RiGamepadLine, active: false },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Section */}
        <div className="header-left">
          <FaFacebook className="facebook-icon" />
          <div className="search-wrapper">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Facebook"
              className="search-box"
            />
          </div>
        </div>

        {/* Center Section */}
        <div className="header-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
                <button key={index} className="nav-button">
                  <Icon style={{ color: item.active ? "#3b82f6" : "#606770", fontSize: "24px" }} />
                </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="header-right">
          <button className="icon-button">
            <CgMenuGridR />
          </button>
          <button className="icon-button">
            <BiLogoMessenger />
          </button>
          <button className="icon-button">
            <HiMiniBell />
          </button>
          <div className="profile">
            <img
                src={userProfile} alt={userProfile} className="profile-img"
            />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
