import { pool } from '../../db/fridgedb.js'
import { getIngredients } from './ingredientControllers.js'

const spoonacularAPIKey = process.env.SPOONACULAR_KEY;

export const recipesFromFridge = async (req, res, next) => {
    try {
        const ingredients = await getIngredients(req, res, false); // Pass false to avoid sending a response
        console.log(ingredients); // This will be an array of ingredient objects

        const baseUrl = 'https://api.spoonacular.com/recipes/findByIngredients'; 
        const queryParams = new URLSearchParams();
        queryParams.append('apiKey', spoonacularAPIKey);

        let nameString = ingredients.map(ingredient => ingredient.name).join(',+');
        queryParams.append('ingredients', nameString);
        queryParams.append('number', 5);

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