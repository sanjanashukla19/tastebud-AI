// import './App.css';
// import React, {useState,useEffect} from 'react';
// import Preloader from './Components/preloader';
// import HomeGroup from "./Components/homegroup";
// import Detailsboard from './Components/Detailsboard';
// import Login from "./Components/Login";
// import Signup from './Components/Signup';
// import Pantry from './Components/Pantry';
// import ExplorePage from './Components/ExplorePage';
// import Diet from './Components/Diet';
// import Imagecarousel from './Components/Imagecarousel';
// import Options from './Components/Options';
// import { useLocation } from 'react-router-dom';


// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Routes
// } from "react-router-dom";


// function App() {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to top when component mounts or location changes
//   }, [location]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);
//   return (

//     <>
//     {loading ? (<Preloader/>):
//     (
//     <>
//       <Router>
//         <Routes>
            
//         <Route path="/"
//             element={<HomeGroup />} />


//            <Route path="/options"
//             element={<Options />} />


//           <Route path="/Login"
//             element={<Login />} />

//           <Route path="/Signup"
//             element={<Signup />} />

//           <Route path="/Pantry"
//             element={<Pantry />} />

//           <Route path="/explore"
//             element={<ExplorePage />} /> 

//           <Route path="/diet/:dietType"
//             element={<Diet />} />

//           <Route path="/diet"
//             element={<Imagecarousel />} /> 

//           { <Route path="/detailsboard"
//             element={<Detailsboard />} />  }

        
//         </Routes>
        
//       </Router>
//     </>
//     )
//     }
//     </>
//   );
// }

// export default App;



















import './App.css';
import React, { useState, useEffect } from 'react';
import Preloader from './Components/preloader';
import HomeGroup from "./Components/homegroup";
import Detailsboard from './Components/Detailsboard';
import Login from "./Components/Login";
import Signup from './Components/Signup';
import Pantry from './Components/Pantry';
import ExplorePage from './Components/ExplorePage';
import Diet from './Components/Diet';
import Imagecarousel from './Components/Imagecarousel';
import Options from './Components/Options';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (<Preloader />) :
        (
          <>
            <Router>
              <ScrollToTop />
              <Routes>

                <Route path="/" element={<HomeGroup />} />
                <Route path="/options" element={<Options />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Pantry" element={<Pantry />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/diet/:dietType" element={<Diet />} />
                <Route path="/diet" element={<Imagecarousel />} />
                <Route path="/detailsboard" element={<Detailsboard />} />

              </Routes>
            </Router>
          </>
        )
      }
    </>
  );
}

export default App;
