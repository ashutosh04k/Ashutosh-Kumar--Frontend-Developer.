import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import axios from "axios";
import './Home.css';
import { FaFilter } from 'react-icons/fa';
import RestaurantCard from "../resturantcard/RestaurantCard";
import Header from "../header/Header";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        console.log(response.data?.categories);
        const data = response.data?.categories || [];
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    if (query.length >= 1) {
      const filteredData = restaurants.filter((restaurant) =>
        restaurant?.strCategory?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filteredData);
    } else {
      setFilteredRestaurants(restaurants);
    }
    setCurrentPage(1); 
  };

  const getRandomRating = () => {
    return (Math.random() * (5 - 1) + 1).toFixed(1); 
  };

  const handleSortByName = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
      const nameA = a?.strCategory.toLowerCase();
      const nameB = b?.strCategory.toLowerCase();
      if (nameA < nameB) return sortAscending ? -1 : 1;
      if (nameA > nameB) return sortAscending ? 1 : -1;
      return 0;
    });
    setFilteredRestaurants(sortedRestaurants);
    setSortAscending(!sortAscending);
    setCurrentPage(1); 
  };

  
  const indexOfLastRestaurant = currentPage * itemsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Pagination controls
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <Header onSearch={handleSearch} />
      <h2>Restaurants with online food delivery in Pune</h2>

      <div className="filter-buttons">
        <button> Filter <FaFilter /> </button>
        <button>
          Filter By Area
        </button>
        <button onClick={handleSortByName}>Sort By {sortAscending ? "Z-A" : "A-Z"}</button>
        <button>Fast Delivery</button>
        <button>New on Swiggy</button>
        <button>Rating 4.0+</button>
      </div>

      <div className="restaurant-list">
        {loading ? (
          <div className="spinner">
            <Spin />
          </div>
        ) : (
          currentRestaurants.map((restaurant, index) => {
            const data = restaurant || {};
            return (
              <RestaurantCard
                key={index}
                name={data?.strCategory || "N/A"}
                image={data?.strCategoryThumb}
                cuisines={data?.info?.cuisines || []}
                rating={getRandomRating()}
              />
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
