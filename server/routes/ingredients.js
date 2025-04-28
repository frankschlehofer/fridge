import express from 'express';
import { getIngredients, createIngredient, deleteIngredient } from '../controllers/ingredientControllers.js';
const router = express.Router();


// Get all ingredients
router.get('/', getIngredients);

// Create new ingredient
router.post('/', createIngredient);

// Delete ingredient
router.delete('/:id', deleteIngredient);

export default router;