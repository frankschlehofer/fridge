import { pool } from '../../db/fridgedb.js';

const spoonacularAPIKey = process.env.SPOONACULAR_KEY;
const maxRecipesReturned = 20

// @desc Fetch recipes based on ingredients
// @route POST /api/recipes
export const getRecipes = async (req, res, next) => {
    try {
        const ingredients = req.body.ingredientNames; // Extract ingredient names from request body
        console.log('Ingredients:', ingredients);

        const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch'; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey); // Add API key for authentication

        // Build the query string with ingredient names
        let nameString = ingredients.map(ingredient => ingredient.name).join(',');
        queryParams.append('includeIngredients', nameString);
        queryParams.append('number', maxRecipesReturned); // Limit the number of recipes returned
        queryParams.append('sort', 'max-used-ingredients'); // Sort recipes by prioritizing maxing the number of used ingredients
        queryParams.append('fillIngredients', 'true'); // Include missing ingredients in the response
        queryParams.append('type', 'main course'); // Filter recipes by type

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        const response = await fetch(apiUrl); // Make the API request
        if (!response.ok) {
            console.log("Spoonacular request did not work"); // Log error if request fails
            return;
        }

        const data = await response.json(); // Parse the response JSON
        console.log(data.results); // Log the results for debugging

        res.status(200).json(data.results); // Send the recipes to the client
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('Recipes from fridge failed'); // Send error response to client
    }
};

// @desc Fetch detailed information about a recipe
// @route GET /api/recipes/:recipe_id
export const getRecipeInfo = async (req, res, next) => {
    try {
        const recipe_id = req.params.recipe_id; // Extract recipe ID from request parameters
        console.log(recipe_id);

        const baseUrl = `https://api.spoonacular.com/recipes/${recipe_id}/information`; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey); // Add API key for authentication

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        const response = await fetch(apiUrl); // Make the API request
        if (!response.ok) {
            console.log("Spoonacular request did not work"); // Log error if request fails
            return;
        }

        const data = await response.json(); // Parse the response JSON
        console.log(data); // Log the results for debugging

        res.status(200).json(data); // Send the recipe information to the client
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('Get recipe info failed'); // Send error response to client
    }
};

// @desc Save a recipe to the user's saved recipes
// @route POST /api/recipes/:user_id/save
export const saveRecipe = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const user_id = req.params.user_id; // Extract user ID from request parameters
        const { recipe_id, name, image_path } = req.body; // Extract recipe details from request body

        await pool.query('INSERT INTO savedrecipes (recipe_id, user_id, name, image_path) VALUES ($1, $2, $3, $4)', 
                         [recipe_id, user_id, name, image_path]); // Save the recipe to the database
        res.status(201).send('Save recipe success'); // Send success response to client
    } catch (err) {
        console.error('Error saving recipe:', err); // Log any errors
        res.status(500).send('Save recipe failed'); // Send error response to client
    }
};

// @desc Fetch all saved recipes for a user
// @route GET /api/recipes/:user_id/saved
export const getSavedRecipes = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // Extract user ID from request parameters
        console.log('Getting saved recipes for user: ', user_id);

        const result = await pool.query('SELECT * FROM savedrecipes WHERE user_id = $1', [user_id]); // Fetch saved recipes from the database
        res.status(200).json(result.rows); // Send the saved recipes to the client
    } catch (err) {
        console.log('Err', err); // Log any errors
        res.status(500).send('Get saved recipes failed'); // Send error response to client
    }
};

// @desc Delete a saved recipe for a user
// @route DELETE /api/recipes/:user_id/:recipe_id
export const deleteSavedRecipe = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // Extract user ID from request parameters
        const recipe_id = req.params.recipe_id; // Extract recipe ID from request parameters
        console.log('Deleting saved recipes for user: ', user_id);

        await pool.query('DELETE FROM savedrecipes WHERE recipe_id = $1 AND user_id = $2', [recipe_id, user_id]); // Delete the recipe from the database
        const results = await pool.query('SELECT * FROM savedrecipes WHERE user_id = $1', [user_id]); // Fetch remaining saved recipes
        res.status(200).json(results.rows); // Send the remaining saved recipes to the client
    } catch (err) {
        console.log('Err', err); // Log any errors
        res.status(500).send('Get saved recipes failed'); // Send error response to client
    }
};