import React ,{useState,useEffect} from 'react';
import ta from '../Assets/ta.svg';
import '../css/Mainnav.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton } from '@mui/material';
import LogoutModal from './logoutModal';
import { useNavigate } from 'react-router-dom';
import navi from '../Assets/navigation.svg';
 

const Mainnav = () => {
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
  const handlelogin = () => {
    // Navigate to the Diet component with the selected dietTitle
    navigate(`/Login`);
  };

  const handlesignup = () => {
    // Navigate to the Diet component with the selected dietTitle
    navigate(`/Signup`);
  };

  const handlePantryLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent default redirection
      window.location.href = '/login'; // Redirect to login page
    }
  };

  return (
    <div className="navbar_container">
      <div className="navbar-logo">
        <img src={ta} alt="TA Logo" className="ta_logo" />
        <img src={navi} alt="Navbar Logo" className="bar" />
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/pantry" onClick={handlePantryLinkClick}>Pantry</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/diet">Diet Plans</Link>
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
      </div>
    </div>
  );
};

export default Mainnav;

