import { promises as fs } from 'fs';
import { loadIngredients, saveIngredients } from '../persistence/saving.js';
import path from 'path';

import { pool } from '../../db/fridgedb.js'

const filePath = path.join(process.cwd(), 'persistence', 'ingredients.json');


// @desc Get all ingredients
// @route GET /api/ingredients
export const getIngredients = async (req, res) => {
    console.log(`Get request`);
    const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [1]);
    res.status(200).json(results.rows);
};


// @desc Create new ingredient
// @route POST /api/ingredients
export const createIngredient = async (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }
    await pool.query('INSERT INTO ingredients (user_id, name, quantity, expiration_date) VALUES ($1, $2, $3, $4)', 
                                    [1, req.body.name, parseInt(req.body.quantity), req.body.expiration_date]);
    const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [1]);
    res.status(201).json(results.rows);
};

// @desc Delete ingredient
// @route DELETE /api/ingredients/:id
export const deleteIngredient = async (req, res) => {
    const ingredient_id = req.params.id;
    try {
        await pool.query('DELETE FROM ingredients WHERE ingredients.ingredient_id = $1', [ingredient_id]);
        const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [1]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Delete failed');
    }
    
};