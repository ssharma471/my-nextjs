// server.js
const express = require('express');
const next = require('next');
const { MongoClient } = require('mongodb');
const { connect, registerUser, checkUser } = require('./user-api/mongodb'); // Import mongodb.js functions

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Middleware to parse request bodies
  server.use(express.json());

  // Connect to MongoDB
  connect(); // Call connect function from mongodb.js

  // Handle user registration endpoint
  server.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Call registerUser function from mongodb.js to register user
      await registerUser({ name, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Handle user login endpoint
  server.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Call checkUser function from mongodb.js to check user credentials
      console.log(email, password)
      const user = await checkUser(email, password);
      if (user) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // For all other routes, let Next.js handle them
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
