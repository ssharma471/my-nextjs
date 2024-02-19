const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware to parse request bodies
  server.use(express.urlencoded({ extended: true }));

  // Login route
  server.post('/api/login', (req, res) => {
    // Here you can handle the login logic, for example, authentication with MongoDB
    // For simplicity, let's assume authentication is successful
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });

  // For all other routes, let Next.js handle them
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
