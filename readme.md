## Backend
cd backendbarraca
npm install
npm run dev

## Frontend
cd frontendbarraca
npm install
npm run dev

## 📦 Base de Datos

El proyecto incluye las bases de datos `bdproductos_productos.sql` `bdproductos_usuarios.sql` (en la carpeta `/sql`).

### Restaurar la base

```bash
mysql -u root -p < sql/bdproductos_productos.sql
mysql -u root -p < sql/bdproductos_usuarios.sql
