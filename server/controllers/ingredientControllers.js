import { promises as fs } from 'fs';

import { pool } from '../../db/fridgedb.js'


// @desc Get all ingredients
// @route GET /api/ingredients
export const getIngredients = async (req, res, sendResponse = true) => {
    console.log(`Get request for ingredients`);
    const user_id = req.params.user_id;
    try {
        const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [user_id]);
        if (sendResponse) {
            res.status(200).json(results.rows); // Send JSON response to the client
        }
        return results.rows; // Return the data for internal use
    } catch (error) {
        console.error('Error fetching ingredients from database:', error);
        if (sendResponse) {
            res.status(500).send('Failed to retrieve ingredients.');
        }
        throw new Error('Failed to retrieve ingredients.');
    }
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

    let expiration = req.body.expiration_date;
    if (!expiration) {
        expiration = '2025-12-31';
    }
    await pool.query('INSERT INTO ingredients (user_id, name, quantity, expiration_date) VALUES ($1, $2, $3, $4)', 
                                    [user_id, req.body.name, parseInt(req.body.quantity), expiration]);
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