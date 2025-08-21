import React from "react";
import ProfilePic from "../Assets/images.png";
import { AiFillStar } from "react-icons/ai";
import "../css/landingpage.css";
const Testimonial = () => {
  return (
    <div className="work-section-wrapper" id="testimonialsSection">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        "This recipe app is a game-changer! The interface is intuitive, and the recipes are diverse and delicious. 
        The step-by-step instructions make cooking a breeze."
        
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
        "Great app with a wide variety of recipes. The visuals are appealing, and the categorization is helpful. 
        Adding a feature to create shopping lists directly from recipes would make it even better."
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Jackson</h2>
      </div>
    </div>
  );
};

export default Testimonial;
