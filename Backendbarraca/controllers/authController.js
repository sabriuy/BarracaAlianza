const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(401).json({ error: 'Credenciales inválidas' });

    const user = results[0];

    if (!user.password) {
      return res.status(500).json({ error: 'Contraseña no disponible en la base de datos' });
    }

    bcrypt.compare(password, user.password)
      .then(match => {
        if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '2h' }
        );
        res.json({ token });
      })
      .catch(err => {
        console.error('Error al comparar password:', err.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      });
  });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, nombre } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)',
      [email, hashedPassword, nombre || null],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email ya registrado' });
          }
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Usuario registrado' });
      }
    );
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
