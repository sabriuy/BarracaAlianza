import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState(null);
  const { login }                 = useContext(AuthContext);
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log('Login response:', res.status, data);

      if (!res.ok) {
        // express-validator envía errors[], tu controlador envía { error: '...' }
        const msg = data.error || data.errors?.[0]?.msg || 'Error desconocido';
        setError(msg);
        return;
      }

      // Guardar token en Context + localStorage
      login(data.token);
      navigate('/productos');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label><br/>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tenés cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};
