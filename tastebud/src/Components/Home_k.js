import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar_k from "./Navbar_k";
import { FiArrowRight } from "react-icons/fi";
import "../css/landingpage.css";
import { useNavigate } from 'react-router-dom';
const Home_k = () => {
  const navigate = useNavigate();


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
  
    const startY = window.pageYOffset;
    const endY = section.getBoundingClientRect().top + startY;
    const duration = 1000; // Adjust duration as needed (in milliseconds)
  
    const startTime = performance.now();
  
    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      const newPos = startY + (endY - startY) * progress;
      window.scrollTo(0, newPos);
  
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };
  
    requestAnimationFrame(scroll);
  };
  


  const handleRecipeButtonClick = () => {
    // Navigate to the Diet component with the selected dietTitle
  
    // navigate(`/home`);
    scrollToSection("featuresSection");
  };
 

  return (
    <div className="home-container">
      <Navbar_k />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          < img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading" style={{marginLeft:'10vh'}}>
          "Life is a combination of magic and pasta."
          </h1>
          <p className="primary-text" style={{marginLeft:'10vh'}}>
          Cooking is not just about making food. It's about creating a moment that lasts a lifetime.
          </p>
          <button className="secondary-button" onClick={() => handleRecipeButtonClick()} style={{marginLeft:'10vh'}}>
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" /> 
        </div>
      </div>
    </div>
  );
};

export default Home_k;
















































