import { pool } from '../../db/fridgedb.js'

// @desc Get profile information for specified user
// @route POST /api/users/:user_id/profile
export const getProfile = async (req, res, next) => {
    try {
        const userId = req.params.user_id

        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        const user = result.rows[0];
        res.status(200).json( user );

    } catch (err) {
        console.error(err);
        res.status(500).send('Login Failed');
    }
}