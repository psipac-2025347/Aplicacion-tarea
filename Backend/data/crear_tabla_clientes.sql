CREATE TABLE IF NOT EXISTS clientes (
  codigo_cliente     VARCHAR(50) PRIMARY KEY,
  nombre_cliente     VARCHAR(150) NOT NULL,
  direccion_cliente  VARCHAR(200) NOT NULL,
  telefono           VARCHAR(30) NOT NULL
);