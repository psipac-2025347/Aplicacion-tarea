import express from 'express';
import cors from 'cors';
import process from 'process';
import clienteRoutes from './routes/clientes.routes';
 
const app = express();
const PUERTO = process.env.PORT || 3000;
 
app.use(cors());
app.use(express.json());
 
app.use('/api/clientes', clienteRoutes);
 
app.listen(PUERTO, () => {
  console.log(`Servidor backend escuchando en el puerto ${PUERTO}`);
});
 