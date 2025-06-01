import { pool } from '../fridgedb.js';

// @desc Get all ingredients for a specific user
// @route GET /api/ingredients
export const getIngredients = async (req, res, sendResponse = true) => {
    console.log(`Get request for ingredients`); // Log the request for debugging
    const user_id = req.params.user_id; // Extract user ID from request parameters
    try {
        const results = await pool.query('SELECT * FROM ingredients WHERE ingredients.user_id = $1', [user_id]);
        if (sendResponse) {
            res.status(200).json(results.rows); // Send the ingredients as a JSON response
        }
        return results.rows; // Return the ingredients for internal use
    } catch (error) {
        console.error('Error fetching ingredients from database:', error); // Log any errors
        if (sendResponse) {
            res.status(500).send('Failed to retrieve ingredients.'); // Send error response to client
        }
        throw new Error('Failed to retrieve ingredients.'); // Throw error for internal use
    }
};

// @desc Create a new ingredient for a user
// @route POST /api/users/:user_id/fridgepage
export const createIngredient = async (req, res, next) => {
    if (!req.body) {
        const error = new Error(`Please include a title`); // Validate request body
        error.status = 400;
        return next(error);
    }
    const user_id = req.params.user_id; // Extract user ID from request parameters
    console.log(user_id);

    // Set a default expiration date if none is provided
    let expiration = req.body.expiration_date || '2025-12-31';

    await pool.query('INSERT INTO ingredients (user_id, name, quantity, expiration_date) VALUES ($1, $2, $3, $4)', 
                                    [user_id, req.body.name, parseInt(req.body.quantity), expiration]);
    const results = await pool.query('SELECT * FROM ingredients WHERE user_id = $1', [user_id]);
    res.status(201).json(results.rows); // Send the updated list of ingredients
};

// @desc Delete an ingredient for a user
// @route DELETE /api/users/:user_id/ingredients/:id
export const deleteIngredient = async (req, res) => {
    const ingredient_id = req.params.ingredient_id; // Extract ingredient ID from request parameters
    const user_id = req.params.user_id; // Extract user ID from request parameters
    console.log(user_id, ingredient_id);
    try {
        await pool.query('DELETE FROM ingredients WHERE ingredients.ingredient_id = $1', [ingredient_id]); // Delete the ingredient
        const results = await pool.query('SELECT * FROM ingredients WHERE user_id = $1', [user_id]); // Fetch updated list
        res.status(200).json(results.rows); // Send the updated list of ingredients
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('Delete failed'); // Send error response to client
    }
};