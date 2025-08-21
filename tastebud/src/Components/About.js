import React from "react";
import "../css/landingpage.css";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <>
    <div className="about-section-container" id="aboutSection">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Welcome to TasteBud – your go-to destination for culinary inspiration and delightful home-cooked meals!
        </h1>
        <p className="primary-text">
          At TasteBud, we believe that cooking should be a joyful and rewarding experience. Our mission is to empower home cooks of all skill levels by providing a diverse collection of mouthwatering recipes that are easy to follow and guaranteed to impress.
        </p>
        {/* <p className="primary-text">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p> */}
      </div>
    </div>
    </>
  );
};

export default About;

