import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, Popover } from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  CloseOutlined
} from '@ant-design/icons';
import ingredientData from './ingredientData';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const Sidebar = ({ setRecipes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
    //Fetch data from Spoonacular API
    try {
      const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&apiKey=40e34375ddaa4e3abdc1e21fa4aabd61`);
      const data = await response.json();
      console.log("API Response:", data); 
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };


  const handleClick = (name) => {
    // Check if the selected ingredient is already in the list of selected ingredients
    const isInSelectedIngredients = selectedIngredient.includes(name);
  
    if (isInSelectedIngredients) {
      // If it's already selected, remove it from the list
      setSelectedIngredient(selectedIngredient.filter(item => item !== name));
    } else {
      // If it's not selected, add it to the list
      setSelectedIngredient([...selectedIngredient, name]);
    }
  };

  const handleDelete = (name) => {
    setSelectedIngredient(selectedIngredient.filter(item => item !== name));
  };
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (selectedIngredient.length === 0) {
          // Clear recipes if no ingredients selected
          setRecipes([]);
          return;
        }
  
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${selectedIngredient.join(",")}&number=10&apiKey=c2c00766233746258aff9e15c00e6ec1`);
        const data = await response.json();
  
        // Extract recipe IDs
        const recipeIds = data.map(recipe => recipe.id);
  
        // Fetch details for each recipe using Promise.all
        const recipeDetailsPromises = recipeIds.map(id =>
          fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=7a78301ba9914884a84420a51701b05b`)
        );
        
        const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);
        const recipeDetailsData = await Promise.all(recipeDetailsResponses.map(response => response.json()));
  
        // Set the recipe details
        setRecipes(recipeDetailsData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchRecipes();
  }, [selectedIngredient.join(",")]); 
  

  const content = (
    <div>
      {selectedIngredient.map(name => {
        // Check if the ingredient is from ingredientData or searchResults
        const ingredientFromData = ingredientData.find(item => item.id === name);
        const ingredientFromApi = searchResults.find(item => item.id === name);
  
        // Get the ingredient object
        const ingredient = ingredientFromData || ingredientFromApi;
  
        // Render the ingredient if found
        if (ingredient) {
          return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <span>{name}</span>
              <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => handleDelete(name)} />
            </div>
          );
        } else {
          return null; // Skip rendering if ingredient is not found
        }
      })}
    </div>
  );
  
  const popoverContent = (
    <div>
        {selectedIngredient.map(name => (
          <li key={name}>
            {name}
            <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => handleDelete(name)} />
          </li>
        ))}
    </div>
  );


  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={400}
      style={{
        borderRight: '4px solid #e8e8e8',
      }}
    >
      <div style={{ padding: '16px' }}>
        <Search
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: '16px' }}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onSearch={handleSearch}
        />
        <Popover placement="bottomRight" content={popoverContent} trigger="click" visible={popoverVisible} onVisibleChange={togglePopover}>
          <Button type="link" icon={<ShoppingCartOutlined />} />
        </Popover>
        {searchResults.length > 0 && (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
{searchResults.map((ingredient, index) => (
  <Button
    key={index}
    type="link"
    style={{
      padding: '10px',
      margin: '6px',
      backgroundColor: selectedIngredient.includes(ingredient.name) ? 'green' : 'transparent', 
      color: selectedIngredient.includes(ingredient.name) ? 'white' : 'black',
      display: 'inline-block',
      minWidth: '100px',
      width: `${ingredient?.name.length * 8}px`,
      textAlign: 'center',
      lineHeight: '1.5',
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    }}
    onClick={() => handleClick(ingredient?.name)} 
  >
    {ingredient?.name}
  </Button>
))}
  </div>
)}
      </div>
      <div className="logo" />
      <h3 style={{ marginLeft: '5rem', marginBottom: '1rem' }}>List of Ingredients</h3>
      <div style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
        {ingredientData.map((ingredient, index) => (
          <Button
            key={index}
            type="link"
            style={{
              padding: '10px',
              margin: '6px',
              backgroundColor: selectedIngredient.includes(ingredient.name) ? 'green' : 'transparent',
              color: selectedIngredient.includes(ingredient.name) ? 'white' : 'black',
              display: 'inline-block', // Set display to inline-block
              minWidth: '100px', // Set minimum width to ensure consistent button sizes
              width: `${ingredient.name.length * 8}px`, // Dynamic width based on name length
              textAlign: 'center', // Center align text
              lineHeight: '1.5', // Adjust line height to vertically center text
              boxShadow:'2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
            onClick={() => handleClick(ingredient.name)}
          >
            {ingredient.name}
          </Button>
        ))}
      </div>
    </Sider>
  );
}

export default Sidebar;
