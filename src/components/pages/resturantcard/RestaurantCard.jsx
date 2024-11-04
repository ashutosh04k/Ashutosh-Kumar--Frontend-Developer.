import React from "react";
import './RestaurantCard.css';

const RestaurantCard = ({ name, image, rating }) => {
  // console.log("name",name);
  
  return (
    <div className="restaurant-card">
      <img src={image} alt={name} className="restaurant-image" />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        {/* <p className="restaurant-cuisines">{cuisines.join(", ")}</p> */}
        <div className="restaurant-details">
          <span className="restaurant-rating">⭐ {rating}</span>
          {/* <span className="restaurant-delivery-time">{deliveryTime}</span> */}
        </div>
        {/* {offer && <div className="restaurant-offer">{offer}</div>} */}
      </div>
    </div>
  );
};

export default RestaurantCard;
