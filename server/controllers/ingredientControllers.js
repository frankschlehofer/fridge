import { promises as fs } from 'fs';

import { pool } from '../../db/fridgedb.js'


// @desc Get all ingredients
// @route GET /api/ingredients
export const getIngredients = async (req, res) => {
    console.log(`Get request`);
    const user_id = req.params.user_id;
    const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [user_id]);
    res.status(200).json(results.rows);
};


// @desc Create new ingredient
// @route POST /api/users/:user_id/fridgepage
export const createIngredient = async (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }
    const user_id = req.params.user_id;
    console.log(user_id);
    await pool.query('INSERT INTO ingredients (user_id, name, quantity, expiration_date) VALUES ($1, $2, $3, $4)', 
                                    [user_id, req.body.name, parseInt(req.body.quantity), req.body.expiration_date]);
    const results = await pool.query('SELECT * FROM ingredients WHERE user_id = $1', [user_id]);
    res.status(201).json(results.rows);
};

// @desc Delete ingredient
// @route DELETE /api/users/:user_id/ingredients/:id
export const deleteIngredient = async (req, res) => {
    const ingredient_id = req.params.ingredient_id;
    const user_id = req.params.user_id;
    console.log(user_id, ingredient_id);
    try {
        await pool.query('DELETE FROM ingredients WHERE ingredients.ingredient_id = $1', [ingredient_id]);
        const results = await pool.query('SELECT * FROM ingredients WHERE user_id = $1', [user_id]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Delete failed');
    }
};