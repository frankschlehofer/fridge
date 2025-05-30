import express from 'express';
import { getIngredients, createIngredient, deleteIngredient } from '../controllers/ingredientControllers.js';
import { getRecipes, getSavedRecipes, saveRecipe, deleteSavedRecipe, getRecipeInfo } from '../controllers/spoonacularControllers.js';
import { getProfile } from '../controllers/profileControllers.js'

const router = express.Router();


// Get all ingredients
router.get('/:user_id/fridgepage', getIngredients);

// Create new ingredient
router.post('/:user_id/fridgepage', createIngredient);

// Delete ingredient
router.delete('/:user_id/fridgepage/:ingredient_id', deleteIngredient);

// Get recipes
router.post('/:user_id/getrecipes', getRecipes);

router.get('/:user_id/getrecipeinfo/:recipe_id', getRecipeInfo);

// Save recipe
router.post('/:user_id/saverecipe', saveRecipe);

router.get('/:user_id/savedrecipes', getSavedRecipes);

router.delete('/:user_id/savedrecipes/:recipe_id', deleteSavedRecipe);

router.get('/:user_id/profile', getProfile);

export default router;