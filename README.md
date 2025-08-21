# TasteBud

## 1. Software Description

TasteBud is a comprehensive recipe generator and exploration tool designed to simplify the cooking experience for users. The software enables users to effortlessly discover and create recipes based on their available ingredients and dietary requirements. The application is built with ReactJS for the frontend, Flask for the backend, and MySQL for data storage, ensuring a seamless and efficient user experience.

## 2. Purpose

TasteBud serves the following purposes:

- **Generating Recipes:** Empowering users to generate personalized recipe recommendations by utilizing ingredients from their pantry.
  
- **Diet Plans:** Providing users with recipe options tailored to their dietary preferences, including keto, vegan, and non-vegan diets.
  
- **Exploration:** Encouraging culinary exploration by offering a diverse range of recipes from different categories.

## 3. Tech Stack

- Frontend: ReactJS
- Backend: Flask
- Database: MySQL
- API: Spoonacular

## 4. Software Setup

### Frontend

- **Node.js:** Make sure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).
- **Package Manager:** Choose either npm or yarn as your package manager. npm comes with Node.js, or you can install yarn by following the instructions [here](https://yarnpkg.com/getting-started/install).

### Backend

- **Python:** Ensure Python 3.x is installed on your system. You can download it from [here](https://www.python.org/).
- **Flask:** Install Flask using pip, Python's package installer. Run `pip install Flask` in your terminal.
- **MySQL:** Install MySQL server on your system. You can download it from [here](https://dev.mysql.com/downloads/mysql/).

## Database Setup

### MySQL

1. **Users Table:(Users)**
   - Create a table named `users` with the following columns:
     - `userid` INT PRIMARY KEY AUTO_INCREMENT
     - `username` VARCHAR(255) NOT NULL
     - `email` VARCHAR(255) NOT NULL
     - `password` VARCHAR(255) NOT NULL
     - `name` VARCHAR(255) NOT NULL

2. **User Favorites Table:(user_favourite)**
   - Create a table named `user_favorites` with the following columns:
     - `userid` INT
     - `recipeid` INT
     - Add a foreign key constraint on `user_id` referencing `users(user_id)`.

3. **Recipe History Table:(recipe_history)**
   - Create a table named `recipe_history` with the following columns:
     - `userid` INT
     - `recipeid` INT
     - `dateofaccess` DATE
     - Add a foreign key constraint on `user_id` referencing `users(user_id)`.

### Getting Started

1. **Database Setup:**
   - Create the necessary tables in your MySQL database as described above.
   - Import the provided SQL dump file into your MySQL database.

2. **Backend Setup:**
   - Navigate to the `backend` directory.
   - Install Python dependencies by running `pip install -r requirements.txt`.
   - Set up environment variables for Flask (database credentials, API keys, etc.).

3. **Frontend Setup:**
   - Navigate to the `frontend` directory.
   - Install frontend dependencies by running `npm install` or `yarn install`.

4. **Running the Application:**
   - Start the Flask backend server by running `python app.py` in the backend directory.
   - Start the React frontend server by running `npm start` or `yarn start` in the frontend directory.

5. **Accessing the Application:**
   - Once both servers are running, you can access the web application in your web browser at `http://localhost:3000`.


## 5. Usage

- Users can register an account and log in to access pantry feature.
- Enter available ingredients to generate recipe recommendations.
- Explore various recipes and save favorites for later.

