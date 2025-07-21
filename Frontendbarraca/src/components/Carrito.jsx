import React, { useContext } from 'react';
import styles from './carrito.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

export const Carrito = () => {
  const {
    productosEnCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
  } = useContext(CarritoContext);

  const navigate = useNavigate();

  const volver = () => {
    navigate('/productos');
  };

  const precioTotal = productosEnCarrito.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);

  if (productosEnCarrito.length === 0) {
    return (
      <>
        <p>Continua explorando nuestra web</p>
        <button onClick={volver} className={styles.flecha}>
          <i className="bi bi-arrow-right-circle-fill"></i>
        </button>
      </>
    );
  }

  return (
    <>
      <div className={styles.carrito}>
        <ul className={styles.productosCarrito}>
          {productosEnCarrito.map((producto) => {
            const imagenes = producto.imagen;
            const primeraImagen = Array.isArray(imagenes) && imagenes.length > 0 ? imagenes[0] : '';

            return (
              <li className={styles.productoCarrito} key={producto.id}>
                <img className={styles.carritoImagen} src={primeraImagen} alt={producto.nombre} width="200" />
                <h3>{producto.nombre}</h3>
                <p>Precio unitario: ${producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                <button onClick={() => aumentarCantidad(producto.id)}>+</button>
                <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                <button onClick={() => eliminarProducto(producto.id)}>
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.carritoAcciones}>
        <div className={styles.carritoAccionesIzquierda}>
          <button className={styles.carritoAccionesVaciar} onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </div>

        <div className={styles.carritoAccionesDerecha}>
          <div className={styles.carritoAccionesTotal}>
            <p>Total:</p>
            <p id="precio-total">${precioTotal}</p>
          </div>
          <button className={styles.carritoAccionesComprar}>Comprar</button>
        </div>
      </div>
    </>
  );
};
