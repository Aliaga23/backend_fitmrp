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
const authRoutes = require('./routes/authRoutes'); 
const rolPermisoRoute = require('./routes/rolPermisoRoutes');
const pool = require('./config/db');
const permisoRoutes = require('./routes/permisoRoutes');

const app = express();

// Configuración de CORS sin restricciones
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: '*',
  exposedHeaders: '*',
}));

app.use(express.json());
app.disable('x-powered-by');  // Deshabilita protección básica

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/quality-controls', qualityControlRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/rolpermiso', rolPermisoRoute); 
app.use('/api/permisos', permisoRoutes);

// Rutas adicionales para simular vulnerabilidades
app.get('/api/debug', (req, res) => {
  res.send('Debug info: sensitive data simulation');
});

app.get('/api/config', (req, res) => {
  res.sendFile(__dirname + '/config/db.js');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
