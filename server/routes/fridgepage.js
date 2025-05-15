import express from 'express';
import { getIngredients, createIngredient, deleteIngredient } from '../controllers/ingredientControllers.js';
import { recipesFromFridge } from '../controllers/spoonacularControllers.js';

const router = express.Router();


// Get all ingredients
router.get('/:user_id/fridgepage', getIngredients);

// Create new ingredient
router.post('/:user_id/fridgepage', createIngredient);

// Delete ingredient
router.delete('/:user_id/fridgepage/:ingredient_id', deleteIngredient);

router.get('/:user_id/recipesFromFridge', recipesFromFridge);

export default router;