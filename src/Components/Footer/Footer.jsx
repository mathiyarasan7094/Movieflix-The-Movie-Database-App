import React from 'react';
import './Footer.css';

import youtube_icon from '../../assets/youtube_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';

const Footer = () => {
  return (
    <footer className="footer">

      {/* SOCIAL ICONS */}
      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebook_icon} alt="Facebook" />
        </a>

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagram_icon} alt="Instagram" />
        </a>

        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitter_icon} alt="Twitter" />
        </a>

        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={youtube_icon} alt="YouTube" />
        </a>
      </div>

      {/* LINKS */}
      <ul className="footer-links">
        {[
          "Audio Description",
          "Help Center",
          "Gift Cards",
          "Media Center",
          "Investor Relations",
          "Jobs",
          "Terms of Use",
          "Privacy",
          "Legal Notices",
          "Cookie Preferences",
          "Corporate Information",
          "Contact Us"
        ].map((item, index) => (
          <li key={index}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>

      {/* COPYRIGHT */}
      <p className="copyright-text">
        © {new Date().getFullYear()} Movieflix. All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;