import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState(() => {
    const guardados = localStorage.getItem('productosAgregados');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('productosAgregados', JSON.stringify(productosEnCarrito));
  }, [productosEnCarrito]);

  const agregarProducto = (producto) => {
    setProductosEnCarrito((prev) => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarProducto = (id) => {
    setProductosEnCarrito((prev) => prev.filter(p => p.id !== id));
  };

  const aumentarCantidad = (id) => {
    setProductosEnCarrito((prev) =>
      prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p)
    );
  };

  const disminuirCantidad = (id) => {
    setProductosEnCarrito((prev) =>
      prev
        .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setProductosEnCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      productosEnCarrito,
      agregarProducto,
      eliminarProducto,
      aumentarCantidad,
      disminuirCantidad,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
