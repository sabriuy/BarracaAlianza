import { createContext, useState, useEffect } from 'react';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        
      } finally {
        setCargando(false);
      }
    };

    traerProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, cargando }}>
      {children}
    </ProductosContext.Provider>
  );
};
