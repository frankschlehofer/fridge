import { pool } from '../../db/fridgedb.js'
import { getIngredients } from './ingredientControllers.js'

const spoonacularAPIKey = process.env.SPOONACULAR_KEY;

export const getRecipes = async (req, res, next) => {
    try {
        const ingredients = await getIngredients(req, res, false); // Pass false to avoid sending a response

        const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch'; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey);

        let nameString = ingredients.map(ingredient => ingredient.name).join(',');
        queryParams.append('includeIngredients', nameString);
        queryParams.append('number', 50);
        queryParams.append('sort', 'max-used-ingredients');
        queryParams.append('fillIngredients', 'true');
        queryParams.append('type', 'main course');

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log("Spoonacular request did not work");
            return;
        }

        const data = await response.json();

        console.log(data.results);

        res.status(200).json(data.results);

    } catch (err) {
        console.error(err);
        res.status(500).send('Recipes from fridge failed');
    }
};

export const getRecipeInfo = async (req, res, next) => {
    try {
        const recipe_id = req.params.recipe_id;
        console.log(recipe_id)
        const baseUrl = `https://api.spoonacular.com/recipes/${recipe_id}/information`; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey);
        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log("Spoonacular request did not work");
            return;
          }
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Get recipe info failed');
    }
    
}

// Body of request contains name, recipe_id, and user_id to save the recipe
export const saveRecipe = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const user_id = req.params.user_id;
        const { recipe_id, name, image_path } = req.body;

        await pool.query('INSERT INTO savedrecipes (recipe_id, user_id, name, image_path) VALUES ($1, $2, $3, $4)', 
                         [recipe_id, user_id, name, image_path]);
        res.status(201).send('Save recipe success');
    } catch (err) {
        console.error('Error saving recipe:', err);
        res.status(500).send('Save recipe failed');
    }
};

export const getSavedRecipes = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        console.log('Getting saved recipes for user: ', user_id);
        const result = await pool.query('SELECT * FROM savedrecipes WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log('Err', err);
        res.status(500).send('Get saved recipes failed');
    }
};

export const deleteSavedRecipe = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const recipe_id = req.params.recipe_id;
        console.log('Deleting saved recipes for user: ', user_id);
        await pool.query('DELETE FROM savedrecipes WHERE recipe_id = $1 AND user_id = $2', [recipe_id, user_id]);
        const results = await pool.query('SELECT * FROM savedrecipes WHERE user_id = $1', [user_id]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.log('Err', err);
        res.status(500).send('Get saved recipes failed');
    }
};