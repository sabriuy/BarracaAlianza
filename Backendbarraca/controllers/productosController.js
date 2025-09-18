const db = require('../db');

// Obtener todos los productos
exports.getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('🛑 Error en la consulta:', err.message);
      return res.status(500).json({ error: err.message });
    }

    const productos = results.map(p => ({
      ...p,
      
      imagen: p.fotos || []
    }));

    res.json(productos);
  });
};


exports.getProducto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('🛑 Error en la consulta por ID:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const producto = {
      ...results[0],
      imagen: results[0].fotos || []
    };
    res.json(producto);
  });
};


exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, fotos } = req.body;
  const fotosJSON = JSON.stringify(fotos);

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, fotos) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, fotosJSON],
    (err, result) => {
      if (err) {
        console.error('🛑 Error al insertar producto:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Producto creado' });
    }
  );
};


exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, fotos } = req.body;
  const fotosJSON = JSON.stringify(fotos);

  db.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, fotos = ? WHERE id = ?',
    [nombre, descripcion, precio, fotosJSON, id],
    (err, result) => {
      if (err) {
        console.error('🛑 Error al actualizar producto:', err.message);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado' });
    }
  );
};


exports.deleteProducto = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('🛑 Error al eliminar producto:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  });
};
