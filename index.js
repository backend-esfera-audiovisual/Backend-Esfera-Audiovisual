import express from 'express';
import http from 'http';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import administrador from './routes/administrador.js';
import ambiente from './routes/ambiente_salon.js';
import ciudad_salon from './routes/ciudad_salon.js';
import contacto_salon from './routes/contacto_salon.js';
import departamento_salon from './routes/departamento_salon.js';
import espacio_salon from './routes/espacio_salon.js';
import regalomento_salon from './routes/reglamento_salon.js';
import reserva from './routes/reserva.js';
import salon_evento from './routes/salon_evento.js';
import servicio_salon from './routes/servicio_salon.js';
import tipo_salon from './routes/tipo_salon.js';
import ubicacion_salon from './routes/ubicacion_salon.js';


const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use("/api/administrador", administrador);
app.use("/api/ambiente", ambiente);
app.use("/api/ciudad", ciudad_salon);
app.use("/api/contacto", contacto_salon);
app.use("/api/departamento", departamento_salon);
app.use("/api/espacio", espacio_salon);
app.use("/api/reglamento", regalomento_salon);
app.use("/api/reserva", reserva);
app.use("/api/salon-evento", salon_evento);
app.use("/api/servicio", servicio_salon);
app.use("/api/tipo", tipo_salon);
app.use("/api/ubicacion", ubicacion_salon);


const server = http.createServer(app)

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Conexión a mongoDB exitosa!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});