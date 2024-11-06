import React, { useState } from "react";
import './RestaurantCard.css';
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ name, image, rating }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function handleclick() {
    navigate(`/restaurant/${name}`);
  }

  return (
    <div className="restaurant-card" onClick={handleclick}>
      {loading && <div className="loading shimmer"></div>}
      <img
        src={image}
        alt={name}
        className="restaurant-image"
        style={{ display: loading ? "none" : "block" }}
        onLoad={() => setLoading(false)}
      />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        <div className="restaurant-details">
          <span className="restaurant-rating">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
