// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const lotRoutes = require('./routes/lotRoutes');
const movementRoutes = require('./routes/movementRoutes');
const qualityControlRoutes = require('./routes/qualityControlRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación
const pool = require('./config/db');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/quality-controls', qualityControlRoutes);
app.use('/api/auth', authRoutes); // Rutas de autenticación

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});