import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  nombre_cliente: { type: String, required: true },
  correo_cliente: { type: String, required: true },
  telefono_cliente: { type: String, required: true },
  cant_pers_res: { type: String, required: true },
  fecha_res: { type: Date, required: true },
  mensaje_res: { type: String },
  idSalonEvento: { type: mongoose.Schema.Types.ObjectId, ref: "SalonEvento",  required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("Reserva", reservaSchema);
