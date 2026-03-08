const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.get('/api/products', (req, res) => {
    const productsPath = path.join(__dirname, '..', 'products.json');
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading products data' });
        }
        res.json(JSON.parse(data));
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});