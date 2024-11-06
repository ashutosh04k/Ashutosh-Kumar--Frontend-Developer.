import React, { useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import Logo from '../../../assets/logo.png';

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurant and food"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Header;
