import express from 'express';
import { getIngredients, createIngredient, deleteIngredient } from '../controllers/ingredientControllers.js';
import { getRecipes, getSavedRecipes, saveRecipe } from '../controllers/spoonacularControllers.js';

const router = express.Router();


// Get all ingredients
router.get('/:user_id/fridgepage', getIngredients);

// Create new ingredient
router.post('/:user_id/fridgepage', createIngredient);

// Delete ingredient
router.delete('/:user_id/fridgepage/:ingredient_id', deleteIngredient);

// Get recipes
router.get('/:user_id/getrecipes', getRecipes);

// Save recipe
router.post('/:user_id/saverecipe', saveRecipe);

router.get('/:user_id/savedrecipes', getSavedRecipes);

export default router;