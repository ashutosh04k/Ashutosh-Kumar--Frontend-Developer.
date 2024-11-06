import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spin,Button } from "antd";
import './meal.css';
import { SiYoutubeshorts } from "react-icons/si";
import { FaCarrot, FaDrumstickBite } from "react-icons/fa";

const Meal = () => {
  const { category } = useParams();
  const [details, setDetails] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(3); 
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const [expandedInstructions, setExpandedInstructions] = useState({}); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
        console.log("meal", response.data?.meals); 
        setDetails(response.data?.meals || []);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [category]);

  const lastMealRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleMeals < details.length) {
          setVisibleMeals((prev) => prev + 3);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, visibleMeals, details.length]
  );

  const toggleInstructions = (mealId) => {
    setExpandedInstructions(prev => ({
      ...prev,
      [mealId]: !prev[mealId], 
    }));
  };

  return (
    <div className="meal-detail">
      {loading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        details.slice(0, visibleMeals).map((meal, index) => (
          <div
            key={meal.idMeal}
            className="meal-container"
            ref={index === visibleMeals - 1 ? lastMealRef : null} 
          >
            <div className="mealtitle-box">
              <div className="meal-title">{meal.strMeal}
              {meal?.strCategory.toLowerCase() === "vegetarian" ? (
                  <FaCarrot style={{ marginLeft: '10px', color: 'green' }} />
                ) : (
                  <FaDrumstickBite style={{ marginLeft: '10px', color: 'red' }} />
                )}
                </div>
              {meal.strYoutube && (
                <div className="meal-video">
                  <div className="youtube">Watch on <SiYoutubeshorts/></div>
                  <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                    {meal.strYoutube}
                  </a>
                </div>
              )}
            </div>
            <div className="mealtitle-box1">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
              <div className="meal-instructions-box">
                <span className="ing-text" style={{fontSize:'20px', justifyContent:"center", fontWeight:'700'}}>Instructions</span>
                <p className="meal-instructions">
                  {expandedInstructions[meal.idMeal] || meal.strInstructions.split(" ").length <= 100
                    ? meal.strInstructions
                    : meal.strInstructions.split(" ").slice(0, 100).join(" ") + "..."}
                </p>
                {meal.strInstructions.split(" ").length > 100 && (
                  <Button onClick={() => toggleInstructions(meal.idMeal)}>
                    {expandedInstructions[meal.idMeal] ? "Read Less" : "Read More"}
                  </Button>
                )}
              </div>
            </div>
            <h3>Ingredients</h3>
            <ul className="meal-ingredients">
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i} className="ingredient-item">
                      {measure} {ingredient}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Meal;
