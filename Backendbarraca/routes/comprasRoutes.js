
const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.post('/', comprasController.createCompra);

module.exports = router;
