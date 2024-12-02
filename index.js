const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const logger = require('./config/logger');  // Ajusta el path según tu estructura
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes')
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
const permisoRoutes = require('./routes/permisoRoutes');
const inventarioMateriaPrimaRoutes = require('./routes/inventarioMateriaPrimaRoutes');
const materiaPrimaRoutes = require('./routes/materiaPrimaRoutes');
const movementMateriaPrimaRoutes = require('./routes/movementMateriaPrimaRoutes');
const ordenCompraRoutes = require('./routes/ordenCompraRoutes');
const ordenCompraMateriaPrimaRoutes = require('./routes/ordenCompraMateriaPrimaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const qualityControlMateriaPrimaRoutes = require('./routes/qualityControlMateriaPrimaRoutes');
const evaluacionProveedorRoutes = require('./routes/evaluacionProveedorRoutes');
const archivoRoutes = require('./routes/archivoRoutes');
const productoArchivoRoutes = require('./routes/productoArchivoRoutes');
const ordenCompraProductoRoutes = require('./routes/ordenCompraProductoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const devolucionRoutes = require('./routes/devolucionRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes')


const pool = require('./config/db');
const pagoRoutes =require('./routes/pagoRoutes');
const app = express();

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(fileUpload());
// Middleware para JSON y parsing
app.use(express.json());
app.set('trust proxy', true); // Habilita el soporte para IPs detrás de proxies

// Rutas del API
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

app.use('/api/inventario-materiaprima', inventarioMateriaPrimaRoutes);
app.use('/api/materiaprima', materiaPrimaRoutes);
app.use('/api/movements-materiaprima', movementMateriaPrimaRoutes);
app.use('/api/orden-compra', ordenCompraRoutes);
app.use('/api/orden-compra-materiaprima', ordenCompraMateriaPrimaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/qualitycontrol-materiaprima', qualityControlMateriaPrimaRoutes);
app.use('/api/evaluaciones-proveedores', evaluacionProveedorRoutes);

app.use('/api/archivos', archivoRoutes);
app.use('/api/producto-archivo', productoArchivoRoutes);
app.use('/api/ordencompra-producto', ordenCompraProductoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pedido',pedidoRoutes);
app.use('/api/pago',pagoRoutes);
// Puerto en el que corre el servidor
const PORT = process.env.PORT || 3001;
app.use('/api', paymentRoutes);
app.use('/api/devoluciones', devolucionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  logger.info(`Servidor corriendo en el puerto ${PORT}`);

});



