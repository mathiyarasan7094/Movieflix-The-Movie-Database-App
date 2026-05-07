import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../../assets/logo.png' 
import search_icon from '../../assets/search_icon.svg' 
import bell_icon from '../../assets/bell_icon.svg' 
import profile_img from '../../assets/profile_img.png' 
import caret_icon from '../../assets/caret_icon.svg' 

import { logout } from '../../Firebase'
import { useNavigate, NavLink } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <div ref={navRef} className='navbar'>   

      {/* LEFT */}
      <div className="navbar-left">
        <img 
          src={logo} 
          alt="logo" 
          className="logo"
          onClick={() => navigate('/')}
        />

        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/tv">TV Shows</NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
          <li><NavLink to="/new">New & Popular</NavLink></li>
          <li><NavLink to="/mylist">My List</NavLink></li>
          <li><NavLink to="/languages">Browse by Languages</NavLink></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* 🔍 SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <img 
            src={search_icon} 
            alt="search" 
            onClick={handleSearch}
          />
        </div>

        <p>Children</p> 

        <img src={bell_icon} alt="bell" className='icons' /> 

        <div 
          className="navbar-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={profile_img} alt="profile" className='profile' /> 
          <img src={caret_icon} alt="menu" />

          {showDropdown && (
            <div className="dropdown">
              <p onClick={() => logout()}>Sign Out</p>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default Navbar