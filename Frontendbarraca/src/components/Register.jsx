import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre]     = useState('');
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre })
      });
      const data = await res.json();

      if (!res.ok) {
        // Puede venir { errors: [...] } de express-validator o { error: '...' }
        const msg = data.error || data.errors?.[0]?.msg || 'Error en el registro';
        setError(msg);
        return;
      }

      // Registro exitoso, redirigimos al login
      navigate('/login');
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br/>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label><br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tenés cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};
