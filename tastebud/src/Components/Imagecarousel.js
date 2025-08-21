import React from 'react';
import '../css/Imagecarousel.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Mainnav from './Mainnav.js';
import { useEffect } from 'react';

const Imagecarousel = () => {
  const navigate = useNavigate();
  const boxRef = useRef(null);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);


  const diets = [
    { image:'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_756723_16926156462123419.jpg' ,title: 'Vegetarian',  id: 1 },
    { image:'https://media.post.rvohealth.io/wp-content/uploads/2020/09/gluten-free-diet-thumb-1.jpg' ,title: 'Gluten Free',  id: 2 },
    { image:'https://becomevegetarian.org/wp-content/uploads/2022/03/Lacto-vegetarian-diet-concept.jpg' ,title: 'Lacto-Vegetarian',  id: 3 },
    { image:'https://images.immediate.co.uk/production/volatile/sites/30/2023/11/Keto-plate-d091735.jpg?quality=90&resize=440,400' ,title: 'Ketogenic', id: 4 },
    { image:'https://images-prod.healthline.com/hlcmsresource/images/AN_images/ovo-vegetarian-diet-1296x728-feature.jpg' ,title: 'Ovo-Vegetarian',  id: 5 },
    { image:'https://media.post.rvohealth.io/wp-content/uploads/2021/08/tofu-salad-pineapple-quinoa-vegan-meal-1296x728-header-800x728.png' ,title: 'Vegan', id: 6 },
    { image:'https://media.womensweekly.com.sg/public/2023/01/123rf-17.jpg' ,title: 'Pescetarian', id: 7 },
    { image:'https://images.immediate.co.uk/production/volatile/sites/30/2023/09/Paleo-diet-foods-3eaa4b8.jpg?resize=768,574' ,title: 'Paleo', id: 8 },
    { image:'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/salmon-salad-1296x728-header.jpg?w=1155&h=1680' ,title: 'Primal', id: 9 },
    { image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnVh290OfPk-KsHqGxyJQF5Nr1KserUnMdQ&usqp=CAU' ,title: 'Low FODMAP', id: 10 },
    { image:'https://www.cnet.com/a/img/resize/35568bf9ec4dbb5f3cb1343b7035353244145ac9/hub/2019/09/20/a839c8c7-e55f-4c41-a91d-7778d91cb924/how-to-get-through-whole30.jpg?auto=webp&fit=crop&height=675&width=1200' ,title: 'Whole30', id: 11 }

  ];

  const handleRecipeButtonClick = (dietTitle) => {
    navigate(`/diet/${dietTitle.toLowerCase()}`);
  };

  return (
    <div className="product-carousel">
      <Mainnav />
      <div className="title_car">
        <h1>Choose a Diet Plan</h1>
      </div>


      <div className="product-container" ref={boxRef}>
        {diets.map((diet) => (
          <div className="card__body" key={diet.id}>
            <img src={diet.image} className="card__image" alt={diet.title} />
            <h2 className="card__title">{diet.title}</h2>
            <button
              className="card__btn"
              onClick={() => handleRecipeButtonClick(diet.title)}
            >
              Recipes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imagecarousel;
