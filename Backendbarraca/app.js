require('dotenv').config();       
const express = require('express');
const cors = require('cors');
const app = express();

// 1) Middlewares globales
app.use(cors());                  // Permite solicitudes cross-origin
app.use(express.json());          // Parseo automático de JSON

// 2) Importar middlewares y rutas
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const comprasRoutes = require('./routes/comprasRoutes');
const productosRoutes = require('./routes/productosRoutes');

// 3) Rutas de autenticación (públicas)
app.use('/api/auth', authRoutes);

// 4) Rutas de compras (protegidas)
app.use('/api/compras', authMiddleware, comprasRoutes);

// 5) Rutas de productos (públicas)
app.use('/api/productos', productosRoutes);

// 6) Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
