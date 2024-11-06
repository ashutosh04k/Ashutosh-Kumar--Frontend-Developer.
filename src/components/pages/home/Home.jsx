import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Modal, Radio, Button, Dropdown, Menu } from "antd";
import axios from "axios";
import './Home.css';
import { FaFilter } from 'react-icons/fa';
import { MdArrowDropDown } from "react-icons/md";
import RestaurantCard from "../resturantcard/RestaurantCard";
import Header from "../header/Header";
import { setCousins, setLoading } from "../../store/store-slice/CousinSlice";

const Home = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.cousin.cousins);
  const loading = useSelector((state) => state.cousin.loading);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [showFilterdata, setShowFilterdata] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [appliedArea, setAppliedArea] = useState("Indian");

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        setShowFilterdata(response.data?.meals || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${appliedArea}`);
        const restaurantsWithRating = response.data?.meals.map((restaurant) => ({
          ...restaurant,
          rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        }));
        dispatch(setCousins(restaurantsWithRating || []));
        setFilteredRestaurants(restaurantsWithRating || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [appliedArea, dispatch]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleApplyFilter = () => {
    setAppliedArea(selectedArea);
    closeModal();
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    if (query.length >= 1) {
      const filteredData = restaurants.filter((restaurant) =>
        restaurant?.strMeal?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filteredData);
    } else {
      setFilteredRestaurants(restaurants);
    }
    setCurrentPage(1);
  };

  const sortByNameAsc = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) =>
      a?.strMeal.localeCompare(b?.strMeal)
    );
    setFilteredRestaurants(sortedRestaurants);
    setCurrentPage(1);
  };

  const sortByNameDesc = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) =>
      b?.strMeal.localeCompare(a?.strMeal)
    );
    setFilteredRestaurants(sortedRestaurants);
    setCurrentPage(1);
  };

  const sortByRatingAsc = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => a.rating - b.rating);
    setFilteredRestaurants(sortedRestaurants);
    setCurrentPage(1);
  };

  const sortByRatingDesc = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => b.rating - a.rating);
    setFilteredRestaurants(sortedRestaurants);
    setCurrentPage(1);
  };

  const sortingMenu = (
    <Menu>
      <Menu.Item onClick={sortByNameAsc}>Sort by Name A-Z</Menu.Item>
      <Menu.Item onClick={sortByNameDesc}>Sort by Name Z-A</Menu.Item>
      <Menu.Item onClick={sortByRatingAsc}>Sort by Rating Ascending</Menu.Item>
      <Menu.Item onClick={sortByRatingDesc}>Sort by Rating Descending</Menu.Item>
    </Menu>
  );

  const indexOfLastRestaurant = currentPage * itemsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <Header onSearch={handleSearch} />
      <span className="banner">Food loved by {appliedArea}</span>

      <div className="filter-buttons">
        <Button onClick={openModal}>Filter <FaFilter /></Button>
        <Dropdown overlay={sortingMenu} trigger={['click']}>
          <Button>Sort Options<MdArrowDropDown/></Button>
        </Dropdown>
      </div>

      <Modal
        title="Filter By Area"
        open={showModal}
        onOk={handleApplyFilter}
        onCancel={closeModal}
        okText="Apply"
        cancelText="Cancel"
      >
        <Radio.Group
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          style={{ display: "flex", flexDirection: "column" }}
          className="radio-group"
        >
          {showFilterdata.map((area, index) => (
            <Radio key={index} value={area.strArea}>
              {area.strArea}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>

      <div className="restaurant-list">
        {loading ? (
          <div className="spinner">
            <Spin />
          </div>
        ) : (
          currentRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              name={restaurant?.strMeal || "N/A"}
              image={restaurant?.strMealThumb}
              cuisines={restaurant?.info?.cuisines || []}
              rating={restaurant.rating}
            />
          ))
        )}
      </div>

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
