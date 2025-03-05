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

const cors = require('cors');

const allowedOrigins = [
    'https://natmarket.netlify.app',  // Producción
    'http://127.0.0.1:5502',         // Live Server
    'http://localhost:3000'          // Desarrollo local
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true
}));

// Permitir CORS en todas las respuestas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Permitir desde cualquier origen (¡Peligroso en producción!)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
