
const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

// Aquí puedes proteger con authMiddleware si ya lo importas en app.js
// router.use(require('../middleware/auth'));

router.post('/', comprasController.createCompra);
// más endpoints: GET, PUT, etc.

module.exports = router;
