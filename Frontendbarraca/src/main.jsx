import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <AuthProvider>
    <ProductosProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ProductosProvider>
  </AuthProvider>
</BrowserRouter>
  </StrictMode>
);
