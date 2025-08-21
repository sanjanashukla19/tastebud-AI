import React, { useState } from 'react';
import '../css/detailsboard.css';
import { Button, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, MenuOutlined, HomeOutlined, HistoryOutlined, HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const DetailsBoard = () => {
  const [selectedOption, setSelectedOption] = useState('personalInfo');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [historyRecipes, setHistoryRecipes] = useState([]);
  const handlePersonalInfoClick = () => {
    setSelectedOption('personalInfo');
  };

  const handleUserFavoritesClick = async () => {
    setSelectedOption('userFavorites');
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post('http://localhost:5000/api/favorite-recipes', { user_id: userId });
      const recipeIds = response.data;
      // Fetch detailed recipe information for each recipe ID
      const promises = recipeIds.map(id => axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=40e34375ddaa4e3abdc1e21fa4aabd61`));
      const recipeDetails = await Promise.all(promises);
      // Set the fetched recipe details
      setFavoriteRecipes(recipeDetails.map(res => res.data));
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };
  const handleHistoryClick = async () => {
    setSelectedOption('history');
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post('http://localhost:5000/api/history', { user_id: userId });
      const historyRecipes = response.data;
      // Fetch detailed recipe information for each recipe ID and get date_of_access
      const promises = historyRecipes.map(async recipe => {
        const recipeDetail = await axios.get(`https://api.spoonacular.com/recipes/${recipe.recipe_id}/information?apiKey=40e34375ddaa4e3abdc1e21fa4aabd61`);
        return { ...recipeDetail.data, date_of_access: recipe.date_of_access };
      });
      const recipeDetailsWithDate = await Promise.all(promises);
      // Set the fetched recipe details along with date_of_access
      setHistoryRecipes(recipeDetailsWithDate);
    } catch (error) {
      console.error('Error fetching history recipes:', error);
    }
  };
  return (
    <div className="details-board-container">
      <div className="sidebar">
        <h2 style={{ marginTop: '10px' }}>Details Board</h2>
        <a href="#" onClick={handlePersonalInfoClick} style={{ fontSize: '18px' }}>
          <HomeOutlined style={{ marginLeft: '10px', marginRight: '20px' }} />
          Personal Information
        </a>
        <a href="#" onClick={handleUserFavoritesClick} style={{ fontSize: '18px' }}>
          <HeartOutlined style={{ marginLeft: '10px', marginRight: '20px' }} />
          Favourite recipes
        </a>
        <a href="#" onClick={handleHistoryClick} style={{ fontSize: '18px' }}>
          <HistoryOutlined style={{ marginLeft: '10px', marginRight: '20px' }} />
          History
        </a>
        {/* Other sidebar links */}
      </div>
      <div className="content">
      {selectedOption === 'personalInfo' && (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Personal Information</h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserOutlined style={{ fontSize: '1.2rem', marginRight: '10px' }} />
            <p style={{ fontSize: '1rem' }}>Name: {localStorage.getItem('name')}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserOutlined style={{ fontSize: '1.2rem', marginRight: '10px' }} />
            <p style={{ fontSize: '1rem' }}>Username: {localStorage.getItem('username')}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <MailOutlined style={{ fontSize: '1.2rem', marginRight: '10px' }} />
            <p style={{ fontSize: '1rem' }}>Email: {localStorage.getItem('email')}</p>
          </div>
        </div>
      )}
        {selectedOption === 'userFavorites' && (
          <div>
            {favoriteRecipes.length > 0 ? (
              <React.Fragment>
                <h2>Favorite Recipes</h2>
                {favoriteRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id} // Ensure each card has a unique key
                    id={recipe.id}
                    image={recipe.image}
                    heading={recipe.title}
                    servings={recipe.servings}
                    cuisines={recipe.cuisines}
                    recipeURL={recipe.sourceUrl}
                  />
                ))}
              </React.Fragment>
            ) : (
              <>
              <h2>Favourite Recipes</h2>
              <p>No favorite recipes found</p>
              </>
            )}
          </div>
        )}
        {selectedOption === 'history' && (
          <div>
          <h2>Recipe History</h2>
          {historyRecipes.length > 0 ? (
      // Group recipes by date
              Object.entries(
                historyRecipes.reduce((acc, recipe) => {
                  const date = new Date(recipe.date_of_access).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  });
                  acc[date] = [...(acc[date] || []), recipe];
                  return acc;
                }, {})
              ).map(([date, recipes]) => (
                <div key={date}>
                  <h5>{date}</h5>
                  {recipes.map(recipe => (
                    <div key={recipe.id}>
                      <RecipeCard
                        id={recipe.id}
                        image={recipe.image}
                        heading={recipe.title}
                        servings={recipe.servings}
                        cuisines={recipe.cuisines}
                        recipeURL={recipe.sourceUrl}
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No history recipes found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsBoard;
