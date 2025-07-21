import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Inicio } from './components/inicio';
import { Productos } from './components/Productos';
import { Carrito } from './components/Carrito';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ProductosContext } from './context/ProductosContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const { productos } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  const buscar = (e) => {
    const termino = e.target.value;
    setBusqueda(termino);
    if (!termino.trim()) {
      setResultados([]);
      return;
    }
    setResultados(
      productos.filter((item) =>
        item.nombre.toLowerCase().includes(termino.toLowerCase())
      )
    );
  };

  const seleccionarProducto = () => {
    setBusqueda('');
    setResultados([]);
    navigate('/productos');
  };

  return (
    <>
      <nav className="navbar-principal">
        <h1>
          <span id="barraca">Barraca</span>
          <span id="alianza"> Alianza</span>
        </h1>

        <div className="search">
          <input
            className="searchTerm"
            onChange={buscar}
            type="text"
            value={busqueda}
            placeholder="¿Qué estás buscando?"
          />
          <button className="searchButton" type="submit">
            <i className="bi bi-search"></i>
          </button>

          {busqueda && resultados.length > 0 && (
            <div className="dropdown">
              {resultados.map((item) => {
                const imgs = Array.isArray(item.imagen) ? item.imagen : [];
                const primera = imgs[0] || '';
                return (
                  <div
                    key={item.id}
                    className="dropdown-item"
                    onClick={seleccionarProducto}
                  >
                    <img src={primera} alt={item.nombre} width={40} height={40} />
                    <span>{item.nombre}</span>
                    <span>${item.precio}</span>
                    <button className="dropdown-btn">Ver</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className='usuarios'>
            <Link className='usuario' to="/login"><i class="bi bi-person-fill"></i></Link>
            <Link className='usuario' to="/register"><i class="bi bi-person-plus-fill"></i></Link>
            <Link className="usuario" to="/carrito"><i class="bi bi-cart3"></i></Link>
        </div>

        <div className="links">
          <Link className="link" to="/inicio">Inicio</Link>
          <Link className="link" to="/productos">Productos</Link>
          <Link className="linki" to="/carrito">Carrito</Link>
        
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          }
        />
        {/* Si quisieras proteger /productos, sería igual: */}
        {/* <Route path="/productos" element={<ProtectedRoute><Productos/></ProtectedRoute>} /> */}
      </Routes>
    </>
  );
}

export default App;
