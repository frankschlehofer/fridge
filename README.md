# Fridge

## Goal

* Reduce food waste by tracking expiration dates of items in your fridge.
* Recommend recipes using exclusively items within your fridge.
* Recommend recipes based on user preferences.
* Enable users to create an account, connect with friends, and view their friends' fridges.
* Provide easy input using image processing.
* Offer AI suggestions for expiration dates on hard-to-guess items.

## Tech Stack

* **Frontend:**
    * React
    * React Router
    * Vite
    * Tailwind CSS
* **Backend:**
    * Node.js
    * Express
    * PostgreSQL
* **Database:**
    * PostgreSQL

## Description

Fridge is a web application designed to help users efficiently manage their food inventory, discover recipes, and connect with friends. The primary goal is to minimize food waste by providing tools to track expiration dates, suggest recipes based on available ingredients, and facilitate sharing food information with friends.

## Features

* **Food Inventory Management:**
    * Track the expiration dates of items in your fridge.
    * View a comprehensive list of all food items.
    * Add, edit, and delete food items.
* **Recipe Recommendations:**
    * Get recipe suggestions based on the food items currently in your fridge.
    * Receive personalized recipe recommendations based on dietary preferences and restrictions.
* **Social Features:**
    * Create a user account.
    * Connect with friends.
    * View your friends' fridges.
* **Easy Input:**
    * Quickly add food items using image processing technology.
* **AI-Powered Assistance**
    * Get AI-powered suggestions for expiration dates for items where it's difficult to determine.

## API

The application utilizes a RESTful API for communication between the frontend and backend.  While the specific endpoints can be defined, here's an example of what they might look like:

**Users**
* `POST /api/users/signup` - Create a new user.
* `GET /api/users/:user_id` - Get a specific user.
* `PUT /api/users/:user_id` - Update a user.

**Food Items**
* `GET /api/users/:user_id/fridgepage` - Get all food items.
* `GET /api/users/:user_id/fridgepage/:ingredient_id` - Get a specific food item.
* `POST /api/users/:user_id/fridgepage` - Add a new food item.
* `PUT /api/users/:user_id/fridgepage/:ingredient_id` - Update a food item.
* `DELETE /api/users/:user_id/fridgepage/:ingredient_id` - Delete a food item.

## Future API

**Recipes**
* `GET /api/recipes` - Get all recipes.
* `GET /api/recipes/:id` - Get a specific recipe.
* `GET /api/recipes/fridge` - Get recipes based on the user's fridge contents.
* `GET /api/recipes/preferences` - Get recipes based on user preferences

**Friends**
* `POST /api/friends/request` - Send a friend request
* `POST /api/friends/accept` - Accept a friend request
* `GET /api/friends/:userId` - Get a user's friends
* `GET /api/friends/:userId/fridge` - Get a user's friend's fridge

## Resources

* Fonts: [https://www.1001fonts.com/fruit-fonts.html](https://www.1001fonts.com/fruit-fonts.html)
* Color Palette: [https://coolors.co/f7ebec-ddbdd5-ac9fbb-899878-1d1e2c](https://coolors.co/f7ebec-ddbdd5-ac9fbb-899878-1d1e2c)
* Image Editing: [https://www.photopea.com](https://www.photopea.com)

## Contributing

1.  Fork the repository.
2.  Create a new branch.
3.  Make your changes.
4.  Submit a pull request.

