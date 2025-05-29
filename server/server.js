import express from 'express';
import cors from 'cors';

import auth from './routes/auth.js';
import fridgepage from './routes/fridgepage.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import imagescan from './routes/imagescan.js';

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(cors()); // Enable CORS for cross-origin requests

// Middleware to log requests to the console
app.use(logger);

// Route for authentication-related actions
app.use('/api/auth', auth);

// Route for handling user information, including ingredients and recipes
app.use('/api/users', fridgepage);

// Route for handling image parsing for ingredients
app.use('/api/parse-food-image', imagescan);

// Middleware for handling errors globally
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});