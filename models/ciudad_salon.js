import mongoose from "mongoose";

const ciudadSalonEventoSchema = new mongoose.Schema({
    nombre_ciud: { type: String, required: true },
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    idDepart: { type: mongoose.Schema.Types.ObjectId, ref: "DepartamentoSalonEvento", required: true },
    createdAt: { type: Date, default: Date.now },
    estado: { type: Boolean, default: 1 }
});

export default mongoose.model("CiudadSalonEvento", ciudadSalonEventoSchema);
