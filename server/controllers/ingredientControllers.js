import { promises as fs } from 'fs';
import { loadIngredients, saveIngredients } from '../persistence/saving.js';
import path from 'path';

const filePath = path.join(process.cwd(), 'persistence', 'ingredients.json');

let ingredients = [];

// @desc Get all ingredients
// @route GET /api/ingredients
export const getIngredients = async (req, res) => {
    console.log(filePath);
    ingredients = await loadIngredients(filePath);
    res.status(200).json(ingredients);
};


// @desc Create new ingredient
// @route POST /api/ingredients
export const createIngredient = (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }
    const newIngredient = {
        id: ingredients.length + 1,
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        expiration: req.body.expiration
    };
    ingredients.push(newIngredient);
    saveIngredients(filePath, ingredients);
    res.status(201).json(ingredients);
};

// @desc Delete ingredient
// @route DELETE /api/ingredients/:id
export const deleteIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    ingredients = ingredients.filter((ingredient) => ingredient.id !== id);
    saveIngredients(filePath, ingredients);
    res.status(200).json(ingredients);
};