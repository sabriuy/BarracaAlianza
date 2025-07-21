import React, { useState, useEffect, useContext } from 'react';
import styles from './productos.module.css';
import Swal from 'sweetalert2';
import { CarritoContext } from '../context/CarritoContext';

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const { agregarProducto } = useContext(CarritoContext);
  const [indicesCarrusel, setIndicesCarrusel] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
      })
      .catch(err => console.error(err));
  }, []);

  const guardar = (producto) => {
    agregarProducto(producto);
    Swal.fire({
      title: "Producto agregado al carrito!",
      icon: "success",
      draggable: true
    });
  };

  const cambiarImagen = (productoId, direccion, total) => {
    setIndicesCarrusel((prev) => {
      const actual = prev[productoId] || 0;
      const nuevoIndice = (actual + direccion + total) % total;
      return { ...prev, [productoId]: nuevoIndice };
    });
  };

  return (
    <div className='grid'>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className={styles.contenedorProductos}>
          {productos.map((producto) => {
            const imagenes = producto.imagen || [];
            const indiceActual = indicesCarrusel[producto.id] || 0;

            return (
              <li className={styles.producto} key={producto.id}>
                <div className={styles.carrusel}>
                  <button
                    className={styles.carruselBoton}
                    onClick={() => cambiarImagen(producto.id, -1, imagenes.length)}
                  >
                    ‹
                  </button>
                  <img
                    className={styles.productoImagen}
                    src={imagenes[indiceActual]}
                    alt={`${producto.nombre} ${indiceActual + 1}`}
                  />
                  <button
                    className={styles.carruselBoton}
                    onClick={() => cambiarImagen(producto.id, 1, imagenes.length)}
                  >
                    ›
                  </button>
                </div>
                <p className={styles.precio}>${producto.precio}</p>
                <h3 className={styles.productoDetalles}>{producto.nombre}</h3>
                <button className={styles.productoBoton} onClick={() => guardar(producto)}>
                  Agregar al carrito
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
