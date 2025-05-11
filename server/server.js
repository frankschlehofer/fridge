import express from 'express';
import cors from 'cors';

import auth from './routes/auth.js'
import fridgepage from './routes/fridgepage.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Middleware to log requests to console
app.use(logger);

app.use('/api/auth', auth)

// Route for handling ingredients
app.use('/api/users', fridgepage);

// Middleware for handling any error type
app.use(errorHandler);

// Start server 
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});