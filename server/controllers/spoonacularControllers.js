import { pool } from '../../db/fridgedb.js'
import { getIngredients } from './ingredientControllers.js'

const spoonacularAPIKey = process.env.SPOONACULAR_KEY;

export const getRecipes = async (req, res, next) => {
    try {
        const ingredients = await getIngredients(req, res, false); // Pass false to avoid sending a response
        console.log(ingredients); // This will be an array of ingredient objects

        const baseUrl = 'https://api.spoonacular.com/recipes/findByIngredients'; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey);

        let nameString = ingredients.map(ingredient => ingredient.name).join(',+');
        queryParams.append('ingredients', nameString);
        queryParams.append('number', 100);

        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        console.log(apiUrl);

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
        res.status(500).send('Recipes from fridge failed');
    }
};

// Body of request contains name, recipe_id, and user_id to save the recipe
export const saveRecipe = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const user_id = req.params.user_id;
        const { recipe_id, name } = req.body;

        await pool.query('INSERT INTO savedrecipes (recipe_id, user_id, name) VALUES ($1, $2, $3)', 
                         [recipe_id, user_id, name]);
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