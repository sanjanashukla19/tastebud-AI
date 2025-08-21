import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Options.css';
import "../css/landingpage.css";
import { FiArrowRight } from "react-icons/fi";

const Options = () => {

    const navigate = useNavigate();

    const handleDietPlansClick = () => {
      navigate('/diet');
    };
  
    const handleExploreRecipesClick = () => {
      navigate('/explore');
    };
  
    const handlePantrySpecificsClick = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Adjust this as per your actual implementation
      if (isLoggedIn) {
        navigate('/pantry');
      } else {
        navigate('/login');
      }
    };



  return (
    <div className="options-container" id="featuresSection">
        <p className="primary-subheading" style={{textAlign: 'center' }}>Our Features</p>
      <h1 className="options-heading">What are you thinking?</h1>
      <div className="options-cards">
        <div className="option-card">
          <h2>Explore Recipes</h2>
          <p >Discover delicious recipes from around the world.</p>
         
            <button className="secondary-button" onClick={handleExploreRecipesClick} style={{ padding: '0.4rem 1rem' }}>Learn More </button>
          
        </div>
        <div className="option-card">
          <h2>Diet Plans</h2>
          <p>Find the perfect recipes tailored to your diet plan.</p>
          
            <button className="secondary-button" onClick={handleDietPlansClick} style={{ padding: '0.4rem 1rem' }}>Learn More</button>
         
        </div>
        <div className="option-card">
          <h2>Pantry Specifics</h2>
          <p>Explore recipes based on your pantry ingredients.</p>
          
            <button className="secondary-button" onClick={handlePantrySpecificsClick} style={{ padding: '0.4rem 1rem' }}>Learn More</button>
         
        </div>
      </div>
    </div>
  );
};

export default Options;
