/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../css/landingpage.css";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LunchDining from "@mui/icons-material/LunchDining";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { useNavigate } from 'react-router-dom';
import ta from "../Assets/ta.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton } from '@mui/material';
import LogoutModal from './logoutModal'; 

const Navbar_k = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  useEffect(() => {
    // Check local storage or authentication state to determine if user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Adjust this as per your actual implementation
    setIsLoggedIn(userLoggedIn);
  }, []);
  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    navigate("/detailsboard");
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
  };
  const handleLogout = () => {
    // Perform logout actions
    localStorage.clear();
    setIsLoggedIn(false); 
    setIsLogoutModalOpen(false);
  };
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
  

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => scrollToSection("homeSection"),
    },
    {
      text: "About",
      icon: <InfoIcon />,
      onClick: () => scrollToSection("aboutSection"),
    },
    {
      text: "Features",
      icon: <LunchDining />, // Change the icon as needed
      onClick: () => scrollToSection("featuresSection"), // Define the scroll target
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
      onClick: () => scrollToSection("testimonialsSection"),
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      onClick: () => scrollToSection("contactSection"),
    },
  ];


  const handlelogin = () => {
    // Navigate to the Diet component with the selected dietTitle
    navigate(`/Login`);
  };

  const handlesignup = () => {
    // Navigate to the Diet component with the selected dietTitle
    navigate(`/Signup`);
  };

  return (
    <nav>
    <div className="nav-logo-container" style={{marginLeft:'10vh'}}>
      <img src={ta} alt="" />
    </div>
    <div className="navbar-links-container">
      {menuOptions.map((item) => (
        <a
          href="#"
          key={item.text}
          onClick={(e) => {
            e.preventDefault();
            item.onClick();
          }}
        >
          {item.text}
        </a>
      ))}
      {/* Conditional rendering based on user authentication status */}
      {isLoggedIn ? (
        <>
            <IconButton onClick={handleUserIconClick}>
              <AccountCircleIcon style={{ fontSize: '3rem', color: 'black' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
            <LogoutModal isOpen={isLogoutModalOpen} closeModal={handleCloseModal} onConfirm={handleLogout} />
          </>
      ) : (
        <>
          <button className="primary-button" onClick={handlelogin}>Login</button>
          <button className="primary-button" onClick={handlesignup}>Signup</button>
        </>
      )}
    </div>
    <div className="navbar-menu-container">
      <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
    <Drawer
      open={openMenu}
      onClose={() => setOpenMenu(false)}
      anchor="right"
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpenMenu(false)}
        onKeyDown={() => setOpenMenu(false)}
      >
        <List>
          {menuOptions.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </nav>
  );
};

export default Navbar_k;
