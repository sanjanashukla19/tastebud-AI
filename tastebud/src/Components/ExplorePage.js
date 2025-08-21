
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/diet.css'; 
import RecipeCard from './RecipeCard';
import Mainnav from './Mainnav.js';
import { Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Search } = Input;

const categoryImages = [
  // Your category images data
    { name: 'Main Course', image: 'https://st2.depositphotos.com/3210553/9823/i/450/depositphotos_98232150-stock-photo-pan-fried-salmon-with-tender.jpg' },
  { name: 'Side Dish', image: 'https://www.acouplecooks.com/wp-content/uploads/2021/06/Vegetable-Kabobs-001.jpg' },
  { name: 'Dessert', image: 'https://www.foodandwine.com/thmb/ckc6L6xKox0WfpfO6dMkuVGPQOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Angel-Food-Cake-with-Three-Berry-Compote-FT-RECIPE0323-541a780b871441e0ab14383ee38acc44.jpg' },
  { name: 'Appetizer', image: 'https://www.eatingwell.com/thmb/VZOpYLlkdhow-YKvWLTlotmVRjY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/loaded-smashed-brussels-sprouts-4f5ab837d61d40c8a5bf27a398ca29eb.jpg' },
  { name: 'Salad', image: 'https://www.licious.in/blog/wp-content/uploads/2022/11/shutterstock_310087187.jpg' },
  { name: 'Bread', image: 'https://blog.naturesbasket.co.in/wp-content/uploads/2018/10/A-World-of-Breads.jpg' },
  { name: 'Breakfast', image: 'https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board27.jpg' },
  { name: 'Soup', image: 'https://sugarspunrun.com/wp-content/uploads/2021/09/Tomato-Soup-Recipe-7-of-8.jpg' },
  { name: 'Beverage', image: 'https://www.drinkpreneur.com/wp-content/uploads/2016/12/drinkpreneur_819_main.jpg' },
  { name: 'Finger Food', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Arancini-bites-hero-image-20583bc.jpg?quality=90&webp=true&resize=375,341' },
  { name: 'Snack', image: 'https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.webp' },
  { name: 'Drink', image: 'https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707609600&semt=sph' },
  // Add more categories as needed
];

const ExplorePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const apiKey = 'db230d5f237e44e0af4e0f54dee5a2e7';

  useEffect(() => {
    // Fetch random recipes on component mount
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10&addRecipeInformation=true`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch random recipes');
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=15&addRecipeInformation=true&type=${category.toLowerCase().replace(/\s+/g, '-')}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes for ${category}`);
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching category recipes:', error);
    }
  };

  const handleSearch = async (value) => {
    setQuery(value);
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${apiKey}&addRecipeInformation=true&number=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const carouselSettings = {
    // Your carousel settings
        dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
  };

  return (
    <>
      <Mainnav/>
      <br/>
      <div className="diet-container">
        <Slider {...carouselSettings}>
          {categoryImages.map((category, index) => (
            <div key={index} className="carousel-item" onClick={() => handleCategoryClick(category.name)}>
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </Slider>
        <div style={{ padding: '16px', width: '90rem', margin: '0 auto' }}>
          <Search
            placeholder="Search..."
            prefix={<SearchOutlined style={{ height: '2rem' }} />}
            style={{ marginBottom: '16px', height: '2rem' }}
            onSearch={handleSearch}
          />
        </div>
        <div className="recipe-container">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              heading={recipe.title}
              servings={recipe.servings}
              cuisines={recipe.cuisines}
              recipeURL={recipe.sourceUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
