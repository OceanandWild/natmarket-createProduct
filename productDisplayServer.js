const express = require('express');
const cors = require('cors');
const app = express();
const products = [];

app.use(cors());
app.use(express.json());

app.post('/addProduct', (req, res) => {
    const product = {
        ...req.body,
        id: Date.now(),
        date: new Date().toISOString()
    };
    products.push(product);
    res.status(201).json(product);
});

app.get('/products', (req, res) => {
    res.json(products.map(p => ({
        ...p,
        description: p.description.length > 100 ? p.description.substring(0,100) + '...' : p.description
    })));
});

app.listen(3001, () => console.log('Display server running on port 3001'));