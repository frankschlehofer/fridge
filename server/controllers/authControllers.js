import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pool } from '../../db/fridgedb.js'

const saltRounds = 10;

export const signUpController = async (req, res, next) => {
    try {

        // Extract user parameters from POST request body
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const plain_text_password = req.body.password;

        // Hash password using
        const hashed_password = await bcrypt.hash(plain_text_password, saltRounds);

        // Should verify signup body, see if username/email is unique, password is strong
        await pool.query('INSERT INTO users (name, email, username, password_hash) VALUES ($1, $2, $3, $4)', 
                                            [name, email, username, hashed_password]);
        res.status(201).send('Signup Success')

    } catch (err) {
        console.error(err);
        res.status(500).send('Signup Failed');
    }
}

export const loginController = async (req, res, next) => {
    try {
        // Extract login parameters
        const { username, password } = req.body;
        const plain_text_password = password;

        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        // Verify user existence
        if (!user) {
            throw new Error('No user by username: ', username);
        }

        // Verify password match
        const isPasswordMatch = await bcrypt.compare(plain_text_password, user.password_hash);
        if (!isPasswordMatch) {
            throw new Error('Incorrect password');
        }

        // Generate JWT response
        const payload = {
            sub: user.user_id
        };
        const secretKey = process.env.SECRET_KEY;
        const options = {
            expiresIn: '1h',  // Token expiration time (e.g., 1 hour)
        };

        const token = jwt.sign(payload, secretKey, options);
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Login Failed');
    }
}