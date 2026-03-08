const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample product data
const products = [
    { id: 1, name: 'Infinity Cube', price: 5 },
    { id: 2, name: 'Spiral Fidget', price: 4.5 }
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});