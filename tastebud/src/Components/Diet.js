import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/diet.css';
import RecipeCard from './RecipeCard';
import { useParams } from 'react-router-dom';
import Mainnav from './Mainnav.js';

const categoryImages = [
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

const shuffleArray = (array) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Diet = () => {
  const [recipes, setRecipes] = useState([]);
  const apiKey = 'ee062ce3dd3745c7816f7ef4f270655b';
  const { dietType } = useParams(); // Using useParams to get dietType from the URL

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${dietType}&number=10&addRecipeInformation=true`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        const shuffledRecipes = shuffleArray(data.results);
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [apiKey, dietType]);

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${dietType}&number=1&addRecipeInformation=true&type=${category.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes for ${category}`);
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching category recipes:', error);
    }
  };


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
  };

  return (
    <>
    <Mainnav/>
    <div className="diet-container">
      
      <h1 className="diet-heading">{dietType.toUpperCase()}</h1>
      <Slider {...carouselSettings}>
          {categoryImages.map((category, index) => (
            <div key={index} className="carousel-item" onClick={() => handleCategoryClick(category.name)}>
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </Slider>

      

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard
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

export default Diet;



