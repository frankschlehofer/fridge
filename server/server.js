import express from 'express';
import cors from 'cors';

import auth from './routes/auth.js';
import fridgepage from './routes/fridgepage.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import imagescan from './routes/imagescan.js';

import { testSupabaseConnection } from './fridgedb.js';

const port = process.env.PORT || 3000;

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

// Start server function
async function startServer() {
    // Test DB connection first
    const dbConnected = await testSupabaseConnection();
  
    if (dbConnected || process.env.NODE_ENV !== 'production') { // Allow startup in dev even if DB fails for easier debugging of other parts
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        if (!dbConnected && process.env.NODE_ENV === 'production') {
          console.warn('WARNING: Server started but database connection failed in production!');
        } else if (!dbConnected) {
          console.warn('Warning: Database connection failed. Check DB settings.');
        }
      });
    } else {
      console.error('CRITICAL: Database connection failed. Server will not start in production.');
      process.exit(1); // Exit if DB connection fails in production
    }
  }
  
  startServer();